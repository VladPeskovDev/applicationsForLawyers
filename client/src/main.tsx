import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import App from './App';
import {store} from './redux/store';
import { injectStore } from './services/apiInstance';

injectStore(store);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
   <Provider store={store}>
  <App />
  </Provider>
</ChakraProvider>
);
