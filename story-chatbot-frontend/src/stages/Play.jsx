import { useEffect, useState } from "react";
import { Text, Spinner, Spacer, Heading, StackDivider, VStack, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { useStory } from '../context/StoryContext';

export default function Play() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { messages, currentStage, sendMessage, isLoading, setCurrentStage, endStoryCallback } = useStory();
    const [willEnd, setWillEnd] = useState(false);
    const message = messages[messages.length - 1];
    const bgButton = useColorModeValue('gray.300', 'gray.500');
    const bgButtonHover = useColorModeValue('gray.400', 'gray.600');

    useEffect(() => {
        if (!message) return;
        console.log(message);
        if (message.content.includes('/END') || message.choices[message.choices.length - 1].includes('/END')) {
            setWillEnd(true);
        }
    }, [message]);

    const handleEndStory = () => {
        if (!willEnd) return;
        setCurrentStage('gameover');
        endStoryCallback();
        setWillEnd(false);
    }

    // Helper function to render content
    const renderContent = () => {
        if (typeof message.content === 'string') {
            return <Text>{message.content}</Text>;
        }

        if (message.content?.story) {
            return <Text>{message.content.story}</Text>;
        }

        return null;
    };

    const renderChoices = () => {
        if (message.choices && message.choices.length > 0 && !isLoading) {
            return message.choices.map((choice, index) => (
                <Button
                    key={index}
                    onClick={() => sendMessage((index + 1).toString())}
                    width={{base: '80vw', md: 'auto'}}
                    height={[`${choice.length > 30 ? "60px" : "40px"}`, "40px"]}
                    style={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                    }}
                    bg={bgButton}
                    _hover={{
                        bg: bgButtonHover
                    }}
                    fontWeight={'bold'}
                >
                    {choice}
                </Button>
            ));
        }
        return null;
    }

    // If the current stage is not 'play', don't render the component
    if (currentStage !== 'play') return null;

    return (
        <Flex flexDirection={'column'} justifyContent={'space-between'} h='100%'>
            {isLoading ? <Center h='100%'><Spinner size='xl'/></Center> : (
                <>
                <VStack spacing={4} padding={{base: 4, md: 16}}>
                    <Text fontSize={{base: "xl", md: "2xl"}} color={color} textAlign="center" >{renderContent()}</Text>
                </VStack>
                <Spacer />
                <Center p={{base: 4, md: 16}}>
                    <VStack
                        divider={<StackDivider borderColor={color} />}
                        spacing={4}
                        align='stretch'
                    >
                        {!willEnd ? renderChoices() : <Button onClick={handleEndStory}>End Story</Button>}
                    </VStack>
                </Center>
            </>
            )}
        </Flex>
    )
}
