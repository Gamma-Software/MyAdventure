import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { getEnvVar } from "../utils/env";

class StoryTeller {
    constructor() {
        this.chat = new ChatOpenAI({
            openAIApiKey: getEnvVar('VITE_OPENAI_API_KEY'),
            modelName: "gpt-4o-mini",
            temperature: 0.7,
            verbose: true,
        });
        this.isStoryActive = false;
        this.messageHistory = [];

        // Initialize with system prompt
        this.systemPrompt = new SystemMessage({
            content: `You are an interactive storyteller. You tell stories where the player makes choices to progress.
            The story is not limited to nature adventures but can be anything. You can think of discovering a city or a new friend.
            You can also think of a story where the player is a detective trying to solve a mystery. Talk to NPCs to get clues.
            Format your responses exactly like this:
            [STORY] {current story segment}
            [CHOICES]
            1. {first choice}
            2. {second choice}
            3. {third choice}

            DO NOT forget the [STORY] and [CHOICES] tags.
            Wait for the player to send /START to begin the story.
            Only respond with /END when the story reaches a natural conclusion.
            Only accept inputs of "1", "2", or "3" for choices.`
        });
        this.messageHistory.push(this.systemPrompt);
    }

    async processMessage(userInput) {
        if (userInput === "/START" && !this.isStoryActive) {
            this.isStoryActive = true;
            return this.startStory();
        }

        if (!this.isStoryActive) {
            return "Please send /START to begin the story.";
        }

        if (["1", "2", "3"].includes(userInput)) {
            return this.continueStory(userInput);
        }

        return "Please choose 1, 2, or 3 to continue the story.";
    }

    async endStory() {
        this.isStoryActive = false;
        this.messageHistory = [this.systemPrompt];
    }

    async startStory() {
        const userMessage = new HumanMessage("/START");
        this.messageHistory.push(userMessage);
        const response = await this.chat.invoke(this.messageHistory);
        console.log(response);
        this.messageHistory.push(response);
        return this.parseResponse(response.content);
    }

    async continueStory(choice) {
        const userMessage = new HumanMessage(choice);
        this.messageHistory.push(userMessage);

        const response = await this.chat.invoke(this.messageHistory);
        console.log(response);
        this.messageHistory.push(response);

        return this.parseResponse(response.content);
    }

    parseResponse(content) {
        const storyMatch = content.match(/\[STORY\](.*?)\[CHOICES\]/s);
        const choicesMatch = content.match(/\[CHOICES\](.*?)$/s);

        if (!storyMatch || !choicesMatch) {
            // Remove the last message from the history and RETRY to invoke the LLM
            this.messageHistory.pop();
            let userInput = this.messageHistory[this.messageHistory.length - 1].content;
            return this.continueStory(userInput);
        }

        return {
            story: storyMatch ? storyMatch[1].trim() : "",
            choices: choicesMatch ?
                choicesMatch[1].trim().split('\n')
                    .map(choice => choice.trim())
                    .filter(choice => choice.length > 0) : []
        };
    }
}

export default StoryTeller;