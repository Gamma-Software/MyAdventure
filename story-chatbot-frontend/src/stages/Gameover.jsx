import { Text, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

export default function Gameover() {
    const color = useColorModeValue('gray.500', 'gray.300');
    return (
        <Flex flexDirection={'column'}>
            <Center h='66vh'>
                <Heading as="h1" color={color} textAlign="center">Gameover</Heading>
            </Center>
        </Flex>
    );
}
