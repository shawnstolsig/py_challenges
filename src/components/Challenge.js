// This component displays a given coding challenge.  It gets the id of the   
// coding challenge via URL paramater, and then retrieves the challenge data
// from content/challenges.js.  It renders the Editor component that the 
// user will interact with.

// package imports
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Divider,
  Grid
} from '@material-ui/core'
import {
} from '@material-ui/icons'

// project imports
import challengeData from '../content/challenges'
import Editor from './Editor'
import { handleLoadChallenge, handleCloseChallenge } from '../actions/challenge'

// set up classes for styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));


function Challenge({ dispatch, challenge, completion, snippets }) {
  // hooks and state
  const classes = useStyles()

  // get challenge info, using url parameter for id
  const { id, name, description, prompt, startingCode, tests } = challenge

  // push all challenge info to store
  React.useEffect(() => {
    dispatch(handleLoadChallenge({ challenge, completion, snippets }))
  }, [challenge])

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h2">
            {name}
          </Typography>
        </Grid>
      </Grid>

      <Divider />
      {/* Main grid for all challenge content */}
      <Grid container spacing={2} className={classes.content}>

        {/* Row: description */}
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={4} align="right">
            <Typography variant="h6">
              Description:
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {description}
            </Typography>
          </Grid>
        </Grid>


        <Grid item md={6} />

        {/* Row: prompt */}
        <Grid item xs={12} md={6} container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" align="right">
              Prompt:
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1">
              {prompt}
            </Typography>
          </Grid>
        </Grid>

      </Grid>

      {/* Seperate grid for Ace Editor and pypy.js output */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Editor />
        </Grid>
      </Grid>

    </div>
  )
}

function mapStateToProps(state, { match }) {

  // grab challenge data itself
  const challenge = challengeData[match.params.id]
  
  // check if authedUser
  if (state.authedUser) {

    // grab user's data, which has been loaded by auth modules
    const allCompletedChallenges = state.authedUser.completedChallenges
    const allUserSnippets = state.authedUser.snippets

    // filter down to only those applicable to current challenge
    const completion = allCompletedChallenges.filter((c) => c.challenge === match.params.id)[0]

    return {
      challenge,
      completion,
    }

  }
  
  // if not logged in
  return {
    challenge, 
    completion: null,
    snippets: []
  }
}

export default connect(mapStateToProps)(Challenge)