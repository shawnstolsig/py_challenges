// Reducer function related to user authentication actions.

import { LOGIN_USER, LOGOUT_USER } from '../actions/auth'
import { 
  LOAD_CHALLENGE, 
  CLOSE_CHALLENGE, 
  CREATE_COMPLETION, 
  REMOVE_COMPLETION,
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
        snippets: action.snippets,
        completion: action.completion,
        challenge: action.challenge,
      }
    // preserve status of pyodide and logs when editor is closed
    case CLOSE_CHALLENGE:
      return {
        pyodideLoaded: state.pyodideLoaded,
        logs: state.logs
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
    // case CREATE_COMPLETION:
    //   let withAddedCompletion = state.completedChallenges.concat([{
    //     user: action.userId,
    //     challenge: action.challengeId,
    //     id: action.completionId
    //   }])
    //   return {
    //     ...state,
    //     completedChallenges: withAddedCompletion
    //   }
    // case REMOVE_COMPLETION:
    //   let withRemovedCompletion = state.completedChallenges.filter((c) => c.id !== action.completionId)
    //   return {
    //     ...state,
    //     completedChallenges: withRemovedCompletion
    //   }
    default:
      return state
  }
}