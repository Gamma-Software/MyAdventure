import {
    Text,
    Center,
    Flex,
    Heading,
    useColorModeValue,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    VStack,
    Box
} from "@chakra-ui/react";
import { useStory } from '../context/StoryContext';
import Feedback from "./Feedback";

export default function Gameover() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { currentStage, setCurrentStage, isLoading } = useStory();

    // If the current stage is not 'gameover', don't render the component
    if (currentStage !== 'gameover') return null;

    return (
        <Flex flexDirection={'column'}>
            <Center h='33vh'>
                <Heading as="h1" size='2xl' color={color} textAlign="center">The End</Heading>
            </Center>
            <Box pl={16} pr={16}>
                <Feedback setCurrentStage={setCurrentStage} isLoading={isLoading} />
            </Box>
        </Flex>
    );
}
