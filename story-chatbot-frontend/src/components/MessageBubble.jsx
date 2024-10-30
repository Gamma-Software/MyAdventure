import { Box, Text, VStack, Button } from '@chakra-ui/react';
import { useStory } from '../context/StoryContext';

function MessageBubble({ message }) {
  const { sendMessage } = useStory();
  const isUser = message.role === 'user';

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

  return (
    <Box
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      w="full"
    >
      <Box
        maxW="80%"
        bg={isUser ? 'blue.500' : 'gray.200'}
        color={isUser ? 'white' : 'black'}
        p={3}
        borderRadius="lg"
      >
        {renderContent()}

        {message.choices && (
          <VStack mt={4} align="stretch" spacing={2}>
            {message.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => sendMessage((index + 1).toString())}
                variant="outline"
                bg={isUser ? 'whiteAlpha.200' : 'white'}
                _hover={{
                  bg: isUser ? 'whiteAlpha.300' : 'gray.100'
                }}
                size="sm"
              >
                {choice}
              </Button>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default MessageBubble;