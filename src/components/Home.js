// A landing page for the user.  Shows a list of the available coding challenges, 
// which is updated with an authedUser's actual progress as retrieved from the 
// backend.

// package imports
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Link
} from '@material-ui/core'
import {
  Link as RouterLink
} from 'react-router-dom'

// project imports
import ProgressItem from './ProgressItem'
import challengeData from '../content/challenges'
import { handleRemoveCompletion } from '../actions/challenge'

const useStyles = makeStyles( (theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}))

function Home({ authedUser, challenges, completedIds, dispatch, access }) {
  const classes = useStyles()
  const resetProgress = () => {
    if(window.confirm("All challenges will be marked as incomplete.  Your previous code solutions will still be saved.  Continue?")){
      authedUser.completedChallenges.forEach((c) => dispatch(handleRemoveCompletion(c.id, access)))
    }
  }
  return (
    <Box>
      <Typography variant="h3" align="center">Welcome to PyChallenges!</Typography>
      <Typography variant="body1" align="center">A place to practice some common coding challenges, in Python.</Typography>
      <Divider />
      <Container>
      <Grid container spacing={1} className={classes.root} >
        {authedUser
          ?
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant="h4" align="center">Your progress: {completedIds.length}/{Object.keys(challenges).length}</Typography>
            </Grid>
            {Object.keys(challenges).map((c) => (
              <Grid item xs={12} key={c} >
                <ProgressItem 
                  challenge={challenges[c]} 
                  status={completedIds.includes(c)}
                  />
              </Grid>
            ))}
            <Grid xs={5} item/>
            <Grid xs={2} align="center" item>
              <Button onClick={resetProgress} >
                Reset? 
              </Button>
            </Grid>
            <Grid xs={5} item/>
          </React.Fragment>
          :
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">Please <Link component={RouterLink} to="/login">
            login </Link> to see your current progress. <br /> Or select a challenge to the left and 
            jump straight into coding!</Typography>
          </Grid>
        }
      </Grid>

      </Container>

    </Box>
  )
}

function mapStateToProps(state) {
  let completedIds = []
  let access = null
  if(state.authedUser){
    completedIds = state.authedUser.completedChallenges.map((c) => c.challenge)
    access = state.authedUser.access
  } 
  return {
    authedUser: state.authedUser,
    challenges: challengeData,
    completedIds,
    access
  }
}

export default connect(mapStateToProps)(Home);