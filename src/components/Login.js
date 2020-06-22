// package imports
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { 
  LockOutlined as LockOutlinedIcon
} from '@material-ui/icons';


// project imports
import { handleLoginUser, handleRegisterUser } from '../actions/auth'

// Material-UI's style hook
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// component: copyright
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        CS Challenges
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Login({ dispatch, history }) {
  const classes = useStyles();

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
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus 
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {mode === 'REGISTER' &&
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="register-password"
              label="Re-enter Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={registerPassword}
              onChange={(event) => setRegisterPassword(event.target.value)}
            /> 
          }
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disableCheck()}
            >{mode === "LOGIN" ? "Sign in" : "Register"}
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              {mode === "LOGIN"
                ? <Button 
                    onClick={() => setMode('REGISTER')} 
                    size="small"
                    color="primary"
                    >Click here to register...
                  </Button>
                : <Button 
                    onClick={() => setMode('LOGIN')} 
                    size="small"
                    color="primary"
                    >Back to Login...
                  </Button>
              }
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function mapStateToProps() {
  return {

  }
}

export default connect(mapStateToProps)(Login)
