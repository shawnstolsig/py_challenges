// package imports 
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// project imports
import { handleLogoutUser } from '../actions/auth'

// some styles for active link
const styles = {
  active: {
    fontWeight: 'bold'
  },
  link: {
    margin: 6
  }
}

function Navbar({authedUser, dispatch}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <NavLink exact to="/" activeStyle={styles.active} style={styles.link}>Home</NavLink>
      </div>
      {authedUser && <div>Hello, {authedUser.username}</div>}
      <div>
        {authedUser 
        ? <button onClick={() => dispatch(handleLogoutUser())}>Logout</button>
        : <NavLink exact to="/login" activeStyle={styles.active}  style={styles.link}>Login</NavLink>}
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Navbar);
