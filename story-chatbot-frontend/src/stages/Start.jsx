import { Heading, VStack, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useStory } from '../context/StoryContext';

export default function Start() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { setCurrentStage, sendMessage, isLoading } = useStory();

    const startGame = () => {
        sendMessage("/START").then(() => {
            setCurrentStage('play');
        });
    }

    return (
        <Flex flexDirection={'column'}>
            <Center h='66vh'>
                <VStack spacing={4} padding={16}>
                    <Heading as="h1" color={color} textAlign="center">Tu incarne le personnage d’une histoire. Cette histoire est interactive et tu décides des actions à prendre parmi plusieurs  choix.</Heading>
                    <Heading as="h2" color={color} textAlign="center">Bonne chance !</Heading>
                </VStack>
            </Center>
            <Center>
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    size='lg'
                    colorScheme="green"
                    onClick={startGame}
                    isLoading={isLoading}
                    loadingText='Chargement...'
                >
                    Commencer
                </Button>
            </Center>
        </Flex>
    )
}
