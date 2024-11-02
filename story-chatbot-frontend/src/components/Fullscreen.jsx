
import { Container, VStack, Box, useColorModeValue } from '@chakra-ui/react';
import Nav from './Nav';
import Footer from './Footer';

export default function Fullscreen({ children }) {
  const bgBox = useColorModeValue('gray.100', 'gray.700');

  return (
    <>
      <Nav />
      <Container maxW="container.xl" h="calc(100vh - 64px - 32px)" py={4}>
        <VStack h="full" spacing={4}>
          <Box
            w="full"
            h="full"
            borderRadius="lg"
            borderWidth="1px"
            // overflow="hidden"
            bg={bgBox}
          >
            {children}
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
}