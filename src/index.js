import StoryTeller from './storyteller.js';
import dotenv from 'dotenv';
import { createInterface } from 'readline/promises';

dotenv.config();

async function main() {
    const storyteller = new StoryTeller();
    await storyteller.initialize();

    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        try {
            const input = await readline.question('Your choice: ');
            const response = await storyteller.processMessage(input);

            if (typeof response === 'object') {
                console.log('\nStory:', response.story);
                console.log('\nChoices:');
                response.choices.forEach(choice => console.log(choice));
            } else {
                console.log(response);
                if (response === "Story has ended. Send /START to begin a new story.") {
                    readline.close();
                    break;
                }
            }
        } catch (error) {
            console.error('Error:', error);
            readline.close();
            break;
        }
    }
}

main().catch(console.error);