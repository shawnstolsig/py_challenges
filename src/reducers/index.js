import { combineReducers } from 'redux'

// import topicReducer from '../reducers/topic'
import authReducer from './auth'
import challengeReducer from './challenge'

export default combineReducers({
  // topic: topicReducer, 
  authedUser: authReducer,
  challenge: challengeReducer,
})