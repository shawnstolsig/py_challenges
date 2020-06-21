// package imports 
import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link
} from '@material-ui/core'
import {
  Menu as MenuIcon,
} from '@material-ui/icons'

// project imports
import { handleLogoutUser } from '../actions/auth'

// Material-UI's style hook
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function Navbar({ authedUser, dispatch }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              CS Challenges
            </Link>
          </Typography>
          {authedUser
            ? 
              <React.Fragment>
                <Typography variant="h6" className={classes.title}>
                  {`Hello, ${authedUser.username}!`}
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => dispatch(handleLogoutUser())}
                  >Logout
                </Button>
              </React.Fragment>
            : <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
                >Login
              </Button>
              
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  }
}

export default connect(mapStateToProps)(Navbar);