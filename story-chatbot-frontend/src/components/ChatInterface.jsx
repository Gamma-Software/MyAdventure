import {
  VStack,
  Box,
  Input,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useStory } from '../context/StoryContext';
import MessageBubble from './MessageBubble';

function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useStory();
  const bg = useColorModeValue('gray.50', 'gray.700');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
    setInput('');
  };

  return (
    <VStack h="full" spacing={0}>
      <Box
        flex="1"
        w="full"
        overflowY="auto"
        p={4}
        bg={bg}
      >
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
        </VStack>
      </Box>

      <Box w="full" p={4} borderTopWidth="1px" bg="white">
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type /START to begin..."
              isDisabled={isLoading}
              size="md"
            />
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              size="md"
            >
              Send
            </Button>
          </HStack>
        </form>
      </Box>
    </VStack>
  );
}

export default ChatInterface;