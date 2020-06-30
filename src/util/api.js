// This file houses asynchornus axios calls the Django backend.

// package imports
import axios from 'axios'

// get base API url from environment (either "http://localhost:8000/" for dev or "" for hosted)
const baseApiUrl = process.env.REACT_APP_API_URL

// function to login/get tokens
export function login({ username, password }) {

  // post to backend Djoser endpoint to create access and refresh tokens
  return axios({
    method: 'post',
    url: `${baseApiUrl}auth/jwt/create/`,
    data: {
      username,
      password
    },
  })
}

/// for getting extra user information/profile
export function getUserInfo(id, access){
    return axios({
      method: 'get',
      url: `${baseApiUrl}api/v1/user/${id}/`,
      headers: {
        authorization: `Bearer ${access}`
      },
    })
}

export function register({username, password}) {
    // post to backend Djoser endpoint to create access and refresh tokens
    return axios({
      method: 'post',
      url: `${baseApiUrl}auth/users/`,
      data: {
        username,
        password
      },
    })
}

// for autologin: get user information using access token
export function getUserFromToken(access) {
  return axios({
    method: 'get',
    url: `${baseApiUrl}auth/users/me/`,
    headers: {
      authorization: `Bearer ${access}`
    },
  })
}



// function for updating access token with provided refresh token 
export function refreshToken(refresh){
  return axios({
    method: 'post',
    url: `${baseApiUrl}auth/hwt/refresh/`,
    data: {
      refresh
    },
  })
}

// function for saving new user code to db
export function saveNewCode({code, title, user, challenge}, access){
  console.log("in saveNewCode")
  return axios({
    method: 'post',
    url: `${baseApiUrl}api/v1/code/`,
    headers: {
      authorization: `Bearer ${access}`
    },
    data: {
      code, 
      title,
      user,
      challenge
    }
  })
}

// function for saving/over-writing existing code attempt
export function saveCode({id, code}, access){
  return axios({
    method: 'patch',
    url: `${baseApiUrl}api/v1/code/${id}/`,
    headers: {
      authorization: `Bearer ${access}`
    },
    data: {
      code, 
    }
  })
}

// for marking a challenge as complete by posting to db
export function postCompletion({user, challenge}, access){
  return axios({
    method: 'post',
    url: `${baseApiUrl}api/v1/completions/`,
    headers: {
      authorization: `Bearer ${access}`
    },
    data: {
      user,
      challenge,
    }
  })
}

// for removing a challenge from db
export function deleteCompletion(completedId, access){
  return axios({
    method: 'delete',
    url: `${baseApiUrl}api/v1/completions/${completedId}/`,
    headers: {
      authorization: `Bearer ${access}`
    },
  })
}
// export function toggleCompleted({challengeId, completedId, user, markComplete}, access){

//   // if marking as completed, post to db
//   if(markComplete){
//     return axios({
//       method: 'post',
//       url: `${baseApiUrl}api/v1/completions/`,
//       headers: {
//         authorization: `Bearer ${access}`
//       },
//       data: {
//         user,
//         challenge: challengeId
//       }
//     })
//   }

//   // if not marked completed, delete completion from databae
//   return axios({
//     method: 'delete',
//     url: `${baseApiUrl}api/v1/completions/${completedId}/`,
//     headers: {
//       authorization: `Bearer ${access}`
//     },
//   })
// }