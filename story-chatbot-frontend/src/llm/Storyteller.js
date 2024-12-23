import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { getEnvVar } from "../utils/env";
import { SEXES, CHARACTERS, THEMES, TIME_TAKEN_THRESHOLD } from "./constants";

function randomize(values) {
    return values[Math.floor(Math.random() * values.length)];
}

class StoryTeller {
    constructor(language) {
        this.chat = new ChatOpenAI({
            openAIApiKey: getEnvVar('VITE_OPENAI_API_KEY'),
            modelName: "gpt-4o-mini",
            temperature: 0.7,
            verbose: false,
        });
        this.isStoryActive = false;
        this.messageHistory = [];

        // Initialize with system prompt
        this.systemPrompt = new SystemMessage({
            content: `You are an interactive storyteller. You tell stories where the player makes choices to progress. The player embodies the main character.

            This is the description of the game:
            Dive into a world of mysteries and adventures with our narrative exploration game, where you are the hero! By making choices at each stage, you’ll
            be guided through puzzles, trials, and captivating quests. Every adventure is a unique story. Along the way,
            you’ll face dilemmas, encounter enigmatic objects, and navigate multiple paths. It’s up to you to choose among various options to progress,
            uncovering unexpected twists and ancient secrets. With an ending shaped by your decisions, you’ll never know where your choices will lead you!

            Create a story with the following theme: {theme}
            The player is a {sex} {character}.

            Format your responses exactly like this:
            [STORY] {current story segment}
            [CHOICES]
            1. {first choice}
            2. {second choice}
            3. {third choice}

            If the story reaches a natural conclusion, append "/END" in the story section like this:
            [STORY] {current story segment}
            [CHOICES]
            /END

            The user input will be in the following format:
            [CHOICE]
            {user_choice}
            [INSTRUCTIONS]
            {instructions for the storyteller to follow}

            Tell the story in the following language: {language}
            DO NOT forget the [STORY] and [CHOICES] tags.
            Limit the current story segment to 3 or 4 sentences.
            Make it engaging and interesting. Don't make it too long and beat around the bush.
            The user input will contain instructions for you to follow.
            Wait for the player to send "/START" to begin the story.`
        });

        // Apply random values to the system prompt for the theme, sex, and character
        // and the current language
        this.systemPrompt.content = this.systemPrompt.content.replace("{theme}", randomize(THEMES))
            .replace("{sex}", randomize(SEXES))
            .replace("{character}", randomize(CHARACTERS))
            .replace("{language}", language);

        this.messageHistory.push(this.systemPrompt);
    }

    async processMessage(userInput, timeTaken) {
        if (userInput === "/START" && !this.isStoryActive) {
            this.isStoryActive = true;
            return this.startStory();
        }

        if (!this.isStoryActive) {
            return "Please send /START to begin the story.";
        }

        if (["1", "2", "3"].includes(userInput)) {
            return this.continueStory(userInput, timeTaken);
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
        this.messageHistory.push(response);
        return this.parseResponse(response.content);
    }

    async continueStory(choice, timeTaken) {
        // Current segment is the number of messages in the history minus 1 (system prompt doesn't count) divided by 2 and rounded down
        //const currentSegment = Math.floor((this.messageHistory.length - 1) / 2);
        let nextInstruction = "Continue the story";
        const nbInteraction = Math.floor((this.messageHistory.length - 1) / 2);
        if (nbInteraction === 3) {
            nextInstruction = "The story is in the middle. Make sure to orient the story towards a natural conclusion.";
        }
        if (nbInteraction === 6) {
            nextInstruction = "End the story in a natural way.";
        }

        if (timeTaken < TIME_TAKEN_THRESHOLD) {
            // if the user has responded in less than a second, tell the llm to speed up the story and end it.
            nextInstruction = nextInstruction + "\nThe user is not engaged. Speed up the story and make it end naturally.";
        }

        const userMessage = new HumanMessage(`[CHOICE]\n${choice}\n[INSTRUCTIONS]\n${nextInstruction}`);
        this.messageHistory.push(userMessage);

        const response = await this.chat.invoke(this.messageHistory);
        this.messageHistory.push(response);

        const parsedResponse = this.parseResponse(response.content);
        console.log(this.messageHistory);
        return parsedResponse;
    }

    parseResponse(content) {
        const storyMatch = content.match(/\[STORY\](.*?)\[CHOICES\]/s);
        const choicesMatch = content.match(/\[CHOICES\](.*?)$/s);

        if (!storyMatch || !choicesMatch) {
            // Remove the last message from the history and RETRY to invoke the LLM
            this.messageHistory.pop();
            let lastUserInput = this.messageHistory[this.messageHistory.length - 1].content;
            return this.continueStory(lastUserInput);
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