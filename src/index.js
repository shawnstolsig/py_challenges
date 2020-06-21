// package imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

// project imports
import './index.css';
import App from './components/App';
import reducers from './reducers'
import middleware from './middleware'

// create store
const store = createStore(reducers, middleware)

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
