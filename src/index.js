// package imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import 'typeface-roboto'
import { CssBaseline } from '@material-ui/core'

// project imports
import './index.css';
import App from './components/App';
import reducers from './reducers'
import middleware from './middleware'

// create store
const store = createStore(reducers, middleware)

const app = (
  // <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  //</React.StrictMode> 
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
