// package imports
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  Divider,
  Grid
} from '@material-ui/core'
import { Description } from '@material-ui/icons'

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

  // get information about the challenge
  const { id, name, description, prompt } = challengeData[match.params.id]


  return (
    <div>
      <Typography variant="h2">
        {name}
      </Typography>
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
          <Editor startingCode={'print("Hello world")' } />
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