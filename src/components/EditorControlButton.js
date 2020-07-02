// A component for each button that controls the editor/console.   
// At >=lg screen sizes, it will be a full size button with descriptive text.
// At <lg screen size, it will be a floating action button with a tooltip


// package imports
import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
    Button,
    Fab,
    Tooltip
} from '@material-ui/core'

// project imports

function EditorControlButton({ text, icon, color="primary", style={}, onClick, disabled }) {
    const theme = useTheme();                                       // access to material ui's theme object
    const lgScreen = useMediaQuery(theme.breakpoints.up('lg'));     // true whenever screen is lg and up

    return (
        <React.Fragment>
            {lgScreen
                ? <Button
                    variant="contained"
                    onClick={onClick}
                    disabled={disabled}
                    startIcon={icon}
                    color={color}
                    style={style}
                    size="small"
                    >{text}
                </Button>
                :  <Tooltip title={text}>
                    <span>
                        <Fab
                        size="small"
                        onClick={onClick} 
                        aria-label={text} 
                        disabled={disabled}
                        color={color}
                        style={style}
                        >{icon}
                    </Fab>
                    </span>
                    
                </Tooltip> 
            }
        </React.Fragment>
    )
}

export default EditorControlButton
