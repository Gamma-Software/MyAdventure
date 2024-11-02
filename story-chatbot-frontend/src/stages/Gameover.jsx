import {
    Center,
    Flex,
    Heading,
    useColorModeValue,
    Box,
    Spacer
} from "@chakra-ui/react";
import { useStory } from '../context/StoryContext';
import Feedback from "./Feedback";

export default function Gameover() {
    const color = useColorModeValue('gray.500', 'gray.300');

    const { currentStage, setCurrentStage, isLoading, messages, llm } = useStory();

    // If the current stage is not 'gameover', don't render the component
    if (currentStage !== 'gameover') return null;

    return (
        <Flex flexDirection={'column'} justifyContent={'space-between'} h='100%'>
            <Center maxHeight='33vh' padding={{base: 16, md: 32}}>
                <Heading as="h1" size='2xl' color={color} textAlign="center">The End</Heading>
            </Center>
            <Spacer />
            <Box pl={{base: 4, md: 16}} pr={{base: 4, md: 16}} pb={{base: 4, md: 16}}>
                <Feedback setCurrentStage={setCurrentStage} isLoading={isLoading} messages={messages} llm={llm} />
            </Box>
        </Flex>
    );
}
