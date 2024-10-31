import { useEffect } from "react";
import { Text, Heading, StackDivider, VStack, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { useStory } from '../context/StoryContext';

export default function Play() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { messages, sendMessage, isLoading, setCurrentStage } = useStory();
    console.log(messages[3]);
    const message = messages[messages.length - 1];
    const isUser = message.role === 'user';

    useEffect(() => {
        if (typeof message.content === 'string' && message.content === '/END') {
            setCurrentStage('gameover');
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
                    bg={useColorModeValue('gray.300', 'gray.500')}
                    _hover={{
                        bg: useColorModeValue('gray.400', 'gray.600')
                    }}
                    fontWeight={'bold'}
                >
                    {choice}
                </Button>
            ));
        }

        return null;
    }


    return (
        <Flex flexDirection={'column'}>
            <Center h='66vh' overflow='auto'>
                <VStack spacing={4} padding={16}>
                    <Heading as="h1" color={color} textAlign="center">{renderContent()}</Heading>
                </VStack>
            </Center>
            <Center>
                <VStack
                    divider={<StackDivider borderColor={color} />}
                    spacing={4}
                    align='stretch'
                >
                    {renderChoices()}
                </VStack>
            </Center>
        </Flex>
    )
}