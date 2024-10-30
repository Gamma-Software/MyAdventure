import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";

class StoryTeller {
    constructor() {
        this.chat = new ChatOpenAI({
            modelName: "gpt-3.5-turbo",
            temperature: 0.7,
        });
        this.isStoryActive = false;
        this.messageHistory = [];
    }

    async initialize() {
        // Set up the initial system prompt
        const systemPrompt = `You are an interactive storyteller. You tell stories where the player makes choices to progress.
        Format your responses exactly like this:
        [STORY] {current story segment}
        [CHOICES]
        1. {first choice}
        2. {second choice}
        3. {third choice}

        Only respond with /END when the story reaches a natural conclusion.
        Wait for the player to send /START to begin the story.
        Only accept inputs of "1", "2", or "3" for choices.`;

        this.messageHistory.push(new SystemMessage(systemPrompt));
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

    async startStory() {
        const response = await this.chat.call(this.messageHistory);
        this.messageHistory.push(response);
        return this.parseResponse(response.content);
    }

    async continueStory(choice) {
        this.messageHistory.push(new HumanMessage(choice));
        const response = await this.chat.call(this.messageHistory);
        this.messageHistory.push(response);

        if (response.content.includes("/END")) {
            this.isStoryActive = false;
            return "Story has ended. Send /START to begin a new story.";
        }

        return this.parseResponse(response.content);
    }

    parseResponse(content) {
        const storyMatch = content.match(/\[STORY\](.*?)\[CHOICES\]/s);
        const choicesMatch = content.match(/\[CHOICES\](.*?)$/s);

        return {
            story: storyMatch ? storyMatch[1].trim() : "",
            choices: choicesMatch ? choicesMatch[1].trim().split('\n') : []
        };
    }
}

export default StoryTeller;