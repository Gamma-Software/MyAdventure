import { Heading, VStack, Spacer, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useStory } from '../context/StoryContext';
import { useTranslationContext } from '../context/TranslationContext';

export default function Start() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { currentStage, setCurrentStage, sendMessage, isLoading } = useStory();
    const { t } = useTranslationContext();

    const startGame = () => {
        sendMessage("/START").then(() => {
            setCurrentStage('play');
        });
    }

    // If the current stage is not 'start', don't render the component
    if (currentStage !== 'start') return null;

    return (
        <Center h='100%'>
        <Flex flexDirection={'column'}>
            <VStack spacing={4} padding={16}>
                <Heading as="h1" color={color} textAlign="center">{t('stage_start_title')}</Heading>
                <Heading as="h2" color={color} textAlign="center">{t('stage_start_subtitle')}</Heading>
            </VStack>
            <Center>
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    size='lg'
                    colorScheme="green"
                    onClick={startGame}
                    isLoading={isLoading}
                    loadingText='Loading...'
                >
                    {t('stage_start_button')}
                </Button>
            </Center>
        </Flex>
        </Center>
    )
}
