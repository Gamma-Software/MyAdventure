import { Box, Container, VStack, ChakraProvider } from '@chakra-ui/react'
import ChatInterface from './components/ChatInterface'
import { StoryProvider } from './context/StoryContext'

import Fullscreen from './components/Fullscreen'
import Playground from './stages/Playground'

function App() {
  return (
    <ChakraProvider>
      <StoryProvider>
        <Fullscreen>
          <Playground />
          {/* <ChatInterface /> */}
        </Fullscreen>
      </StoryProvider>
    </ChakraProvider>
  )
}

export default App