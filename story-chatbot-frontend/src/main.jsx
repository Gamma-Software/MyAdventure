import React from 'react'
import ReactDOM from 'react-dom/client'
import '@smastrom/react-rating/style.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'
import './utils/i18n';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)