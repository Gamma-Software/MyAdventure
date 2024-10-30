import { Box, Container, VStack } from '@chakra-ui/react'
import ChatInterface from './components/ChatInterface'
import { StoryProvider } from './context/StoryContext'

function App() {
  return (
    <StoryProvider>
      <Container maxW="container.md" h="100vh" py={4}>
        <VStack h="full" spacing={4}>
          <Box
            w="full"
            h="full"
            borderRadius="lg"
            borderWidth="1px"
            overflow="hidden"
            bg="white"
          >
            <ChatInterface />
          </Box>
        </VStack>
      </Container>
    </StoryProvider>
  )
}

export default App