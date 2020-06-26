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
import { assertEquals } from '../tests'

// material UI classes for style
const useStyles = makeStyles((theme) => ({
    console: {
        background: 'black',
        height: 500,
        overflow: 'auto'
    }
}))



function Editor({ startingCode, testsProp, id }) {
    const classes = useStyles()

    // state 
    const [code, setCode] = React.useState(startingCode)            // user's code
    const [logs, setLogs] = React.useState([])                      // console for print statements
    const [output, setOutput] = React.useState({})                  // output of user's code
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false) // indicates when pyodide is ready
    const [isCodeValid, setIsCodeValid] = React.useState(false)     // check user's code for eval() before executing

    // load piodide on initial render
    React.useEffect(() => {
        loadPython()
    }, [])

    // hook into browser console on initial render
    React.useEffect(() => {
        Hook(window.console, (log) => setLogs((logs) => [...logs, Decode(log)]))
    }, [])

    // update state whenever challenge changes
    React.useEffect(() => {
        setCode(startingCode)
        setIsCodeValid(false)

        // clear python history, only if pyodide has already been loaded
        if(pyodideLoaded){
            clearPythonHistory()
            console.log("Python history cleared.")
        }
        
    }, [startingCode, testsProp])

    // editor load function (maybe do something else here with the UI?)
    const onEditorLoad = () => console.log("Editor has loaded.")

    // filter console logs.  ommited: 'warn'
    const visibleLogTypes = ['log', 'error', 'info', 'debug', 'command', 'result']

    // load python interpreter. re-loaded after each code execution to clear history
    const loadPython = () => {
        // load new python instance
        languagePluginLoader.then(() => {
            // enable the button for running code
            setPyodideLoaded(true)
            
            // print out the current version
            console.log(pyodide.runPython('import sys\nsys.version'));
            
            // store the default objects for later use
            pyodide.runPython('pyodide_dir = dir()')
        });
    }

    // clears all previously created python variables/functions
    const clearPythonHistory = () => {
        // clear non-stock pyodide objects (except for the starting/default pyodide_dir)
        pyodide.runPython(`
                        for key in dir():
                            if key not in pyodide_dir and key != 'pyodide_dir':
                                del globals()[key]`)
    }

    // command for clearing console
    const clearConsole = () => {
        // clear console
        setLogs([])
        console.log("Console cleared.")
    }

    // resets code to starting code
    const resetCode = () => {
        setCode(startingCode)
        setIsCodeValid(false)
        clearPythonHistory()
        console.log("Code reset.")
    }

    // run python code.  returns output of user code, and prints to console
    const runCode = () => {

        // verify eval() is not used
        if(code.includes('eval')){
            alert("Use of eval() is not allowed.")
            return 
        }
        // run code to make sure it builds
        const result = pyodide.runPython(code)

        // validate the correctly named function exists
        if(pyodide.globals[id] === undefined){
            alert(`Missing ${id}() function.`)
            return
        }
        
        // print message
        console.log("Code successfully validated.")
        
        // enable test button
        setIsCodeValid(true)

    }

    // run tests: combines user's code with testing code and runs altogether
    const runTests = () => {

        // get tests object.  this will have each test as a separate key
        let tests = testsProp(pyodide.globals[id])

        // iterate through all tests and print passed/failed message
        Object.keys(tests).forEach((x) => {
            console.log(`Test: ${tests[x].name} - ${tests[x].result() ? "Passed" : "Failed"}`)
        })

        // reset code validation button
        setIsCodeValid(false)
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={3} lg={2}>
                <Button
                    onClick={runCode}
                    disabled={!pyodideLoaded}
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Validate and Run
                </Button>
            </Grid>
            <Grid item xs={3} lg={2}>
                <Button
                    onClick={clearConsole}
                    disabled={!pyodideLoaded}
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Clear Console
                </Button>
            </Grid>
            <Grid item xs={3} lg={2}>
                <Button
                    onClick={resetCode}
                    disabled={!pyodideLoaded}
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Reset Code
                </Button>
            </Grid>
            <Grid item xs={3} lg={2}>
                <Button
                    onClick={runTests}
                    disabled={!isCodeValid}
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Run Tests
                </Button>
            </Grid>
            <Grid item lg={4} />

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

            {/* Console feed */}
            <Grid item xs={12} lg={6}>
                <Box className={classes.console}>
                    <Console logs={logs} variant="dark" filter={visibleLogTypes} />
                </Box>
            </Grid>


        </Grid>
    )
}

export default Editor