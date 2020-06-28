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

// set up classes for styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },
  content: {
    // margin: theme.spacing(4),
  },
}));


function Challenge({ match }) {
  // hooks and state
  const classes = useStyles()

  // get challenge info, using url parameter for id
  const { id, name, description, prompt, startingCode, tests } = challengeData[match.params.id]

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
          <Editor startingCode={startingCode} testsProp={tests} id={id} />
        </Grid>
      </Grid>

    </div>
  )
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Challenge)