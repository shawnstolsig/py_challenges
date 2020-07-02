// Reducer function related to user authentication actions.

import { 
  LOAD_CHALLENGE, 
  INIT_PYODIDE,
  CLEAR_LOGS,
  ADD_LOG
} from '../actions/challenge'

const initialState = {
  pyodideLoaded: false,
  logs: [],
}

export default function challengeReducer(state = initialState, action) {
  switch (action.type) {

    // when the editor loads, it will pull all information relative to that challenge from store.authedUser
    case LOAD_CHALLENGE:
      return {
        ...state,    // for logs and pyodideLoaded
        ...action.challenge,
      }

    case INIT_PYODIDE:
      return {
        ...state,
        pyodideLoaded: true
      }

    case CLEAR_LOGS:
      return {
        ...state,
        logs: []
      }

    case ADD_LOG:
      return {
        ...state,
        logs: state.logs.concat(action.log)
      }
      
    default:
      return state
  }
}