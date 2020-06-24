// package imports
import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github"
import { makeStyles } from '@material-ui/core/styles'
import {
    Button,
    Box,
    Grid
} from '@material-ui/core'
import { Hook, Console, Decode } from 'console-feed'

// project imports
import { languagePluginLoader } from '../pyodide/pyodide'

const useStyles = makeStyles((theme) => ({
    console: {
        background: 'black',
        height: 500,
        overflow: 'auto'
    }
}))

function Editor({ startingCode, testsProp }) {
    const classes = useStyles()

    // state 
    const [code, setCode] = React.useState(startingCode)
    const [output, setOutput] = React.useState({})
    const [logs, setLogs] = React.useState([])
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false)
    const [tests, setTests] = React.useState([])

    // load piodide on initial render
    React.useEffect(() => {
        languagePluginLoader.then(() => {
            setPyodideLoaded(true)
            console.log(pyodide.runPython('import sys\nsys.version'));
        });
    }, [])

    // hook into console on initial render
    React.useEffect(() => {
        Hook(window.console, (log) => setLogs((logs) => [...logs, Decode(log)]))
    }, [])

    // update code whenever startingCode changes 
    React.useEffect(() => {
        setCode(startingCode)
        setTests(testsProp)
    }, [startingCode, testsProp])

    // editor load function (maybe do something else here with the UI?)
    const onEditorLoad = () => console.log("Editor has loaded.")

    // filter console logs.  ommited: 'warn'
    const visibleLogTypes = ['log', 'error', 'info', 'debug', 'command', 'result']

    // run python code.  pyodide outputs to browser console, and will be captured by Console element
    const runCode = (clearFlag) => {
        if (clearFlag) {
            setLogs([])
            console.log("Console cleared.")
        }
        const result = pyodide.runPython(code)
        console.log("Your script returned: ", result)
        setOutput(result)
    }

    // run tests
    const runTests = () => {
        console.log("Output: ", output)
        console.log("Tests: ", tests)
    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={4} lg={2}>
                <Button 
                    onClick={() => runCode(false)} 
                    disabled={!pyodideLoaded} 
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Run
                </Button>
            </Grid>
            <Grid item xs={4} lg={2}>
                <Button 
                    onClick={() => runCode(true)} 
                    disabled={!pyodideLoaded} 
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Clear and Run
                </Button>
            </Grid>
            <Grid item xs={4} lg={2}>
                <Button 
                    onClick={runTests} 
                    disabled={!pyodideLoaded} 
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Run Tests
                </Button>
            </Grid>
            <Grid item lg={6}/>

            {/* Code editor (using react-ace wrapper of Ace Editor) */}
            <Grid item xs={12} lg={6}>
                <AceEditor
                    placeholder="Placeholder Text"
                    width="100%"
                    mode="python"
                    theme="github"
                    name="editor"
                    onLoad={onEditorLoad}
                    onChange={(value) => setCode(value)}
                    fontSize={14}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: false,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                        showPrintMargin: false
                    }} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <Box className={classes.console}>
                    <Console logs={logs} variant="dark" filter={visibleLogTypes}/>
                </Box>
            </Grid>


        </Grid>
    )
}

export default Editor