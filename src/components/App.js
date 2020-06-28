// The base App component.  Mainly responsible for housing the router/routes.
// Code is dynamically loaded by component to improve performance.

// package imports
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  Typography,
  Container
} from '@material-ui/core'

// project imports
import Nav from './Nav'
import { handleAutoLogin } from '../actions/auth'

// code splitting/performance: only load components when required
const Home = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))
const Challenge = React.lazy(() => import('./Challenge'))

// style classes
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function App({ dispatch }) {
  const classes = useStyles()
  // check for token to autologin
  React.useEffect(() => {
    dispatch(handleAutoLogin())
  }, [dispatch])

  return (
    <Router>
      <div className={classes.root}>
        <Nav />
        <Container className={classes.content}>
          <div className={classes.toolbar} />
          <React.Suspense fallback={<Typography variant="h5">Loading...</Typography>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/:id" component={Challenge} />
              <Route render={() => <h1>404: Page Not Found</h1>} />
            </Switch>
          </React.Suspense>
        </Container>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(App)
