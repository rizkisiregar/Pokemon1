import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import ContextProvider from 'context';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache(),
});

const theme = extendTheme({
  colors: {
    dark: {
      bg: '#262626',
      text: '#e3e3e3',
    },
    light: {
      bg: '#fff',
      text: '#27201a',
    },
    primary: {
      green: '#23CBA7',
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <ContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ContextProvider>
      </ChakraProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorkerRegistration.register();
reportWebVitals();
