// package imports 
import React from 'react'
import { Typography, Link } from '@material-ui/core'

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

export default Copyright