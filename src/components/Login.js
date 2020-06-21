// package imports
import React from 'react'
import { connect } from 'react-redux'

// project imports
import { handleLoginUser, handleRegisterUser } from '../actions/auth'

function Login({ dispatch, history }) {

  // state for holding login credentials
  const [mode, setMode] = React.useState('LOGIN')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [registerPassword, setRegisterPassword] = React.useState('')

  const handleSubmit = (event) => {
    // prevent page from reloading
    event.preventDefault()

    // login if in LOGIN mode
    if(mode === 'LOGIN'){
      dispatch(handleLoginUser({
        username,
        password,
      }, history))
    } 

    // register if in REGISTER mode
    else if (mode === 'REGISTER'){
      dispatch(handleRegisterUser({
        username,
        password,
      }, history))
    }
    
  }

  // helper for checking if form submit button is enabled/disabled
  const disableCheck = () => {
    if(mode === 'LOGIN'){
      return username === '' || password === ''
    } else if (mode === 'REGISTER'){
      return username === '' || password === '' || password !== registerPassword
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="Password..."
          onChange={(event) => setPassword(event.target.value)}
        />
        {mode === 'REGISTER' &&
          <input
            type="text"
            name="register-password"
            value={registerPassword}
            placeholder="Re-enter password..."
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
        }
        <br />
        <button type="submit" disabled={disableCheck()}>{mode === "LOGIN" ? "Login" : "Register"}</button>
      </form>
      {mode === "LOGIN"
        ? <button onClick={() => setMode('REGISTER')}>Register...</button>
        : <button onClick={() => setMode('LOGIN')}>Login...</button>
      }
    </div>
  )
}

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(Login)