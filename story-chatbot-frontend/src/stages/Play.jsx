import { useEffect, useState } from "react";
import { Text, Image, Stack, Card, CardBody, Spinner, Spacer, Heading, StackDivider, VStack, Button, Center, Flex, useColorModeValue } from "@chakra-ui/react"
import { useStory } from '../context/StoryContext';
import { useBreakpoint } from '@chakra-ui/react';
import { generateImage, openJpgFile } from '../utils/generateImage';

function Choice({image, text}) {
    return(
    <>
        <Card
        direction={'column'}
        overflow='hidden'
        variant='outline'
        >
            <Stack direction={"column"}>
                <img
                    objectFit="fill"
                    src={image}
                    alt='choice'
                    hidden={true}
                />
                <CardBody>
                <Heading size='md'>{text}</Heading>
                </CardBody>
            </Stack>
        </Card>
    </>)
}


export default function Play() {
    const color = useColorModeValue('gray.500', 'gray.300');
    const { messages, currentStage, sendMessage, isLoading, setCurrentStage, endStoryCallback } = useStory();
    const [willEnd, setWillEnd] = useState(false);
    let message = messages[messages.length - 1];
    if (messages.length === 0) message = {content: "This is a story about a cat and a dog. The cat is a good friend of the dog. They are playing together. The end.", choices: ["1. This is a goorsutiernstauinrestuairnestauirnseturnaisetrnuiastenrauistd story", "2. This is a bad story", "3. This is a boring story"]};
    const { breakpoint } = useBreakpoint();
    const bgButton = useColorModeValue('gray.300', 'gray.500');
    const bgButtonHover = useColorModeValue('gray.400', 'gray.600');
    const [images, setImages] = useState([]);

    // We render the images only on desktop (in parallel)
    useEffect(() => {
        //if (breakpoint !== "base") {
            // Promise.all(message.choices.map(choice =>
        //     generateImage(choice)
        // )).then(results => {
        //     setImages(results);
        // });
        Promise.all(message.choices.map(choice => openJpgFile(`output.jpg`)))
            .then(results => {
                console.log(results);
                setImages(results.map(result => URL.createObjectURL(result)));
            });
        //}
    }, []);

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
                <Choice image={images[index]} text={choice} breakpoint={breakpoint} />
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
                    <Stack
                        divider={<StackDivider borderColor={color} />}
                        spacing={4}
                        align='stretch'
                        direction={{base: 'column', sm: 'row'}}
                    >
                        {!willEnd ? renderChoices() : <Button onClick={handleEndStory}>End Story</Button>}
                    </Stack>
                </Center>
            </>
            )}
        </Flex>
    )
}
