import { Box, Container, VStack, ChakraProvider } from '@chakra-ui/react'
import ChatInterface from './components/ChatInterface'
import { StoryProvider } from './context/StoryContext'
import { TranslationProvider } from './context/TranslationContext';

import Fullscreen from './components/Fullscreen'
import Playground from './stages/Playground'

function App() {
  return (
    <ChakraProvider>
      <TranslationProvider>
        <StoryProvider>
          <Fullscreen>
            <Playground />
          </Fullscreen>
        </StoryProvider>
      </TranslationProvider>
    </ChakraProvider>
  )
}

export default App