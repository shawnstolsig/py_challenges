// Reducer function related to user authentication actions.

import { LOGIN_USER, LOGOUT_USER } from '../actions/auth'
import { CREATE_COMPLETION, REMOVE_COMPLETION } from '../actions/challenge'

export default function authReducer(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        id: action.userId,
        username: action.username,
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        editorTheme: action.editorTheme,
        tabSize: action.tabSize,
        darkModeEnabled: action.darkModeEnabled,
        expiresAt: action.expiresAt,
        access: action.access,
        refresh: action.refresh,
        completedChallenges: action.completedChallenges,
        snippets: action.snippets
      }
    case LOGOUT_USER:
      return null
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