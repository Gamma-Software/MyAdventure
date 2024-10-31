
import { Container, VStack, Box, useColorModeValue } from '@chakra-ui/react';
import Nav from './Nav';
export default function Fullscreen({ children }) {
  return (
    <>
      <Nav />
      <Container maxW="container.xl" h="calc(100vh - 64px)" py={4}>
        <VStack h="full" spacing={4}>
          <Box
            w="full"
            h="full"
            borderRadius="lg"
            borderWidth="1px"
            // overflow="hidden"
            bg={useColorModeValue('gray.200', 'gray.700')}
          >
            {children}
          </Box>
        </VStack>
      </Container>
    </>
  );
}