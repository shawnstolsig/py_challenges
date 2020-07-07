// package imports
import React from 'react'
import {
    CircularProgress,
    Backdrop,
    Typography,
    Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// project imports

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
  
function Loading({open, text=""}) {
    const classes = useStyles()
    return (
        <Backdrop className={classes.backdrop} open={open}>
            <Grid container>
                <Grid item xs={12} align="center">
                    <CircularProgress color="inherit" />
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography variant="h6">{text}</Typography>
                </Grid>
            </Grid>
        </Backdrop>
    )
}

export default Loading