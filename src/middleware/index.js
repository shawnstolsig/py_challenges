import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// this is used for Chrome's Redux Dev Tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Middleware:
// thunk: tells the store to execute a function if it's passed in as an argument to dispatch 
export default composeEnhancers(applyMiddleware(thunk))