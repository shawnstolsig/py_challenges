// project imports
import { login, register, getUserFromToken, getUserInfo } from '../util/api'
import jwt_decode from 'jwt-decode'

// action types
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

// action creator: login user
function loginUser(payload) {
  return {
    type: LOGIN_USER,
    ...payload
  }
}

// action creator: logout user
function logoutUser() {
  return {
    type: LOGOUT_USER
  }
}

// helper: decoding JSON Web Tokens
function helperJWT(access, refresh) {
  const decoded = jwt_decode(access)
  return {
    userId: decoded.user_id,
    expiresAt: decoded.exp
  }
}

// handle login (get tokens from backend, decode, put in localStorage and store)
export function handleLoginUser({ username, password }, history) {
  return (dispatch) => {

    // login() will return promise for access token and refresh token if resolved
    login({ username, password })
      .then(({ data }) => {

        // get tokens
        const { access, refresh } = data

        // decode access token to get username, expiration, id
        const { userId, expiresAt } = helperJWT(access, refresh)

        getUserInfo(userId, access)
        .then((res)=> {         

          // login payload
          const payload = {
            userId, 
            username,
            firstName: res.data.first_name,
            lastName: res.data.last_name,
            email: res.data.email,
            editorTheme: res.data.profile.editor_theme,
            tabSize: res.data.profile.tab_size,
            darkModeEnabled: res.data.profile.dark_mode_enabled,
            expiresAt,
            access,
            refresh,
            completedChallenges: res.data.completed_challenges,
            snippets: res.data.snippets,
          }

          // dispatch action to store values in state, indicating user is logged in successfully
          dispatch(loginUser(payload))

        })
        .catch((error) => {
          console.log("Error retrieving user info: ")
          console.log(error)
          console.log(error.response)
        })

        // store tokens in localStorage for autologin
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)

        // redirect to previous page
        history.goBack()
      })
      .catch((error) => {
        console.log("Error logging in: ")
        console.log(error.response)
        alert(error.response.data.detail)  
      })
  }
}

// handle logout (dispatch logout action, remove tokens from localStorage)
export function handleLogoutUser() {
  return (dispatch) => {
    // set authedUser to null
    dispatch(logoutUser())

    // delete tokens from local storage
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}

// handle auto login (check for non-expired tokens in local storage, then get user information)
export function handleAutoLogin() {
  return (dispatch) => {
    // get tokens from local storage
    let access = localStorage.getItem('access')
    let refresh = localStorage.getItem('refresh')

    if (access && refresh) {
      // decode tokens
      const { userId, expiresAt } = helperJWT(access, refresh)

      // if token hasn't expired, or won't expire in specified buffer time, then login
      const bufferTimeInMin = 10
      if (expiresAt - Date.now() / 1000 > bufferTimeInMin * 60) {

        // maybe update the access token with the refresh token?

        // get username from backend
        getUserFromToken(access)
          .then(({ data }) => {

            // extract username from API response
            const { username } = data

            // get user info
            getUserInfo(userId, access)
            .then((res)=> {         
   
              // login payload
              const payload = {
                userId, 
                username,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                email: res.data.email,
                editorTheme: res.data.profile.editor_theme,
                tabSize: res.data.profile.tab_size,
                darkModeEnabled: res.data.profile.dark_mode_enabled,
                expiresAt,
                access,
                refresh,
                completedChallenges: res.data.completed_challenges,
                snippets: res.data.snippets,
              }
    
              // dispatch action to store values in state, indicating user is logged in successfully
              dispatch(loginUser(payload))
    
            })
            .catch((error) => {
              console.log("Error retrieving user info: ")
              console.log(error.response)
            })


          })
          .catch(() => {
            alert("Error getting user details for autologin.  Please login manually.")
          })
      }

      // remove tokens from localStorage since they have expired
      else {
        // delete tokens from local storage
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      }
    }
  }
}

// handle user registration (given validated username and password, create a user and login)
export function handleRegisterUser({username, password}, history){
  return (dispatch) => {
    register({username, password})
    .then(() => {
      // login user if successfully registered
      dispatch(handleLoginUser({username, password}, history))
    })
    .catch((error) => {
      console.log("Error registering: ")
      console.log(error.response)
      const errorType = Object.keys(error.response.data)[0]
      let message = 'Error with registration: \n'
      error.response.data[errorType].forEach((x) => message += x + '\n')
      alert(message)
    })
  }
}