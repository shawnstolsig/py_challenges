// A visual component to represent progress on a given challenge, for the home 
// component.

// package imports
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
    Box,
    Link
} from '@material-ui/core'
import {
    Link as RouterLink
} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    item: {
        borderRadius: 6,
        padding: theme.spacing(1)
    },
}))

function ProgressItem({ challenge, status }) {
    const classes = useStyles()
    return (
        <Link component={RouterLink} to={challenge.path} underline="none">
            <Box 
                bgcolor={status ? "success.main" : "error.main"} 
                color={status ? "success.contrastText" : "error.contrastText"}
                className={classes.item}>
                    <Typography variant="h6" align="center">
                        {challenge.name}
                    </Typography>
            </Box>
        </Link>
    )
}

export default ProgressItem;