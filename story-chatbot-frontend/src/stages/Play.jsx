import { useEffect } from "react";
import { Text, Spinner, Spacer, Heading, StackDivider, VStack, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { useStory } from '../context/StoryContext';

export default function Play() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { messages, currentStage, sendMessage, isLoading, setCurrentStage, endStoryCallback } = useStory();
    const message = messages[messages.length - 1];
    const bgButton = useColorModeValue('gray.300', 'gray.500');
    const bgButtonHover = useColorModeValue('gray.400', 'gray.600');

    useEffect(() => {
        if (!message) return;

        if (typeof message.content === 'string' && message.content === '/END') {
            setCurrentStage('gameover');
            // TODO: Maybe save the story for the user to read later
            endStoryCallback();
        }
    }, [message]);

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
                    size='sm'
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
        <Flex flexDirection={'column'} justifyContent={'space-between'} h='100%' overflow='scroll'>
            {isLoading ? <Center h='100%'><Spinner size='xl'/></Center> : (
                <>
                <VStack spacing={4} padding={16}>
                    <Heading as="h1" color={color} textAlign="center" >{renderContent()}</Heading>
                </VStack>
                <Spacer />
                <Center p={16}>
                    <VStack
                        divider={<StackDivider borderColor={color} />}
                        spacing={4}
                        align='stretch'
                    >
                        {renderChoices()}
                    </VStack>
                </Center>
            </>
            )}
        </Flex>
    )
}
