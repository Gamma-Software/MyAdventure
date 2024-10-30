import { createContext, useContext, useState, useEffect } from 'react';
import StoryTeller from '../storyteller';

const StoryContext = createContext();

export function StoryProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storyteller] = useState(() => new StoryTeller());

  useEffect(() => {
    storyteller.initialize?.();
  }, [storyteller]);

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await storyteller.processMessage(message);

      const newMessage = {
        role: 'user',
        content: message,
      };

      let aiResponse;
      if (typeof response === 'string') {
        aiResponse = {
          role: 'assistant',
          content: response,
        };
      } else {
        aiResponse = {
          role: 'assistant',
          content: response.story,
          choices: response.choices,
        };
      }

      setMessages(prev => [...prev, newMessage, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
      }]);
    }
    setIsLoading(false);
  };

  return (
    <StoryContext.Provider value={{ messages, isLoading, sendMessage }}>
      {children}
    </StoryContext.Provider>
  );
}

export const useStory = () => useContext(StoryContext);