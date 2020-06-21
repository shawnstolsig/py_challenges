// package imports
import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

// project imports
import Navbar from './Navbar'
import { handleAutoLogin } from '../actions/auth'

// code splitting/performance: only load components when required
const Home = React.lazy(() => import('./Home'))
const Login = React.lazy(() => import('./Login'))

function App({dispatch}) {

  // check for token to autologin
  React.useEffect(() => {
    dispatch(handleAutoLogin())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route render={()=><h1>404: Page Not Found</h1>} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps)(App)
