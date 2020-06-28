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
  return axios({
    method: 'post',
    url: `${baseApiUrl}/api/v1/code/`,
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
    url: `${baseApiUrl}/api/v1/code/${id}/`,
    headers: {
      authorization: `Bearer ${access}`
    },
    data: {
      code, 
    }
  })
}