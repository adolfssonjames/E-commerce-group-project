import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from 'react-use-cart'

ReactDOM.render(
  
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
 </CartProvider>,

  document.getElementById('root')
);
