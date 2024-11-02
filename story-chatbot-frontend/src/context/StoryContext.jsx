import { createContext, useContext, useState, useEffect } from 'react';
import StoryTeller from '../llm/Storyteller';
import { useTranslationContext } from './TranslationContext';
const StoryContext = createContext();

export function StoryProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentLanguage } = useTranslationContext();
  const [storyteller, setStoryteller] = useState(() => new StoryTeller(currentLanguage));
  const [currentStage, setCurrentStage] = useState('start');

  const updateLanguage = (language) => {
    setStoryteller(new StoryTeller(language));
  }

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

  const endStoryCallback = async () => {
    await storyteller.endStory();
  }


  useEffect(() => {
    storyteller.initialize?.();
  }, [storyteller]);

  return (
    <StoryContext.Provider value={{ messages, isLoading, currentStage, sendMessage, setCurrentStage, endStoryCallback, updateLanguage }}>
      {children}
    </StoryContext.Provider>
  );
}

export const useStory = () => useContext(StoryContext);