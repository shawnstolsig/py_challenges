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
import challengeData from '../challenges'
import Editor from './Editor'
import { loadChallenge } from '../actions/challenge'

// set up classes for styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  titleAlign: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    },

  }
}));


function Challenge({ dispatch, challenge }) {
  // hooks and state
  const classes = useStyles()

  // get challenge info, using url parameter for id
  const { name, description, prompt } = challenge

  // push all challenge info to store
  React.useEffect(() => {
    dispatch(loadChallenge(challenge))
  }, [dispatch, challenge])

  return (
    <Grid container spacing={2}>
      {/* Challenge title */}
      <Grid item xs={12}>
        <Typography variant="h2">
          {name}
        </Typography>
      </Grid>

      {/* A horizontal divider */}
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* Challenge description */}
      <Grid item xs={12} sm={3} className={classes.titleAlign}>
        <Typography variant="h6">
          Description:
      </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1">
          {description}
        </Typography>
      </Grid>
      <Grid item sm={6} />

      {/* Challenge prompt */}
      <Grid item xs={12} sm={3} className={classes.titleAlign}>
        <Typography variant="h6">
          Prompt:
      </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="body1">
          {prompt}
        </Typography>
      </Grid>
      <Grid item sm={6} />

      {/* The code editor/console component */}
      <Grid item xs={12}>
          <Editor />
        </Grid>
    </Grid>

  )



  // return (
  //   <div>
  //     <Grid container spacing={4}>
  //       <Grid item xs={12}>
  //         <Typography variant="h2">
  //           {name}
  //         </Typography>
  //       </Grid>
  //     </Grid>

  //     <Divider />

  //     {/* Main grid for all challenge content */}
  //     <Grid container spacing={2} className={classes.content}>

  //       {/* Row: description */}
  //       <Grid item xs={12} md={6} container spacing={2}>
  //         <Grid item xs={12} sm={4} className={classes.titleAlign}>
  //           <Typography variant="h6">
  //             Description:
  //         </Typography>
  //         </Grid>
  //         <Grid item xs={12} sm={8}>
  //           <Typography variant="body1">
  //             {description}
  //           </Typography>
  //         </Grid>
  //       </Grid>


  //       <Grid item md={6} />

  //       {/* Row: prompt */}
  //       <Grid item xs={12} md={6} container spacing={2}>
  //         <Grid item xs={12} sm={4} className={classes.titleAlign}>
  //           <Typography variant="h6" align="right">
  //             Prompt:
  //         </Typography>
  //         </Grid>
  //         <Grid item xs={12} sm={8}>
  //           <Typography variant="body1">
  //             {prompt}
  //           </Typography>
  //         </Grid>
  //       </Grid>


  //       <Grid item md={6} />

  //     </Grid>

  //     {/* Seperate grid for Ace Editor and pypy.js output */}
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //         <Editor />
  //       </Grid>
  //     </Grid>

  //   </div>
  // )
}

function mapStateToProps(state, { match }) {

  const challenge = challengeData[match.params.id]

  return {
    challenge,
  }
}

export default connect(mapStateToProps)(Challenge)