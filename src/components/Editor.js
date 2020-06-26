// package imports
import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github"
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
    Button,
    Box,
    Grid
} from '@material-ui/core'
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
    ClearAll as ClearAllIcon,
    RotateLeft as RotateLeftIcon,
    AssignmentTurnedIn as AssignmentTurnedInIcon,
    PlayArrow as PlayArrowIcon,
} from '@material-ui/icons'
import { green } from '@material-ui/core/colors'
import { Hook, Console, Decode } from 'console-feed'

// project imports
import { languagePluginLoader } from '../pyodide/pyodide'

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
    const theme = useTheme();
    const lgScreen = useMediaQuery(theme.breakpoints.up('lg'));

    // state 
    const [code, setCode] = React.useState(startingCode)            // user's code
    const [logs, setLogs] = React.useState([])                      // console for print statements
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false) // indicates when pyodide is ready
    const [isCodeValid, setIsCodeValid] = React.useState(false)     // check user's code for before allowing tests
    const [testsPassed, setTestsPassed] = React.useState(false)     // tests pass

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
        setTestsPassed(false)

        // clear python history, only if pyodide has already been loaded
        if (pyodideLoaded) {
            clearPythonHistory()
            console.log("Python history cleared.")
        }

    }, [startingCode])

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
        setCode(startingCode)       // re-insert staring code
        setIsCodeValid(false)       // reset code validation
        setTestsPassed(false)       // reset tests
        clearPythonHistory()        // clear python terminal history
        console.log("Code reset.")
    }

    // run python code
    const runCode = () => {

        // verify eval() is not used
        if (code.includes('eval')) {
            alert("Use of eval() is not allowed.")
            return
        }
        // run code to make sure it builds
        pyodide.runPython(code)

        // validate the correctly named function exists
        if (pyodide.globals[id] === undefined) {
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

        // flag for checking test results
        let combinedTestsPassed = true

        // get tests object.  this will have each test as a separate key
        let tests = testsProp(pyodide.globals[id])

        // iterate through all tests and print passed/failed message
        Object.keys(tests).forEach((x) => {
            let result = tests[x].result()
            if (!result) {
                combinedTestsPassed = false
            }
            console.log(`Test: ${tests[x].name} - ${result ? "Passed" : "Failed"}`)
        })

        // print message if challenge completed
        if (combinedTestsPassed) {
            console.log("~~~~~   Challenge completed!  ~~~~~")
        } else {
            console.log(">>> Your code does not solve the challenge.  Please try again.")
        }

        // record results to state
        setTestsPassed(combinedTestsPassed)

        // reset code validation button
        setIsCodeValid(false)

    }

    return (
        <Grid container spacing={1}>

            {/* Left side controls: for running/testing code */}
            <Grid item xs={6}>
                <Grid container justify="flex-start" spacing={1}>
                    <Grid item>
                        <Button
                            onClick={runCode}
                            disabled={!pyodideLoaded}
                            color="primary"
                            variant="contained"
                            startIcon={<PlayArrowIcon />}
                        >
                            {lgScreen && 'Check and Run Code'}
                </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={runTests}
                            disabled={!isCodeValid}
                            color="primary"
                            variant="contained"
                            startIcon={<AssignmentTurnedInIcon />}
                        >
                            {lgScreen && 'Run Tests'}
                </Button>
                    </Grid>
                    <Grid item>
                        {testsPassed 
                            ? <Button
                                onClick={() => alert('implement save function')}
                                style={{ background: green[500]}}
                                color="primary"
                                variant="contained"
                                startIcon={<CheckBoxIcon />}
                                >
                                {lgScreen && 'Completed!  Save?'}
                            </Button>
                            : <Button
                                disabled
                                onClick={() => alert('implement save function')}
                                variant="contained"
                                startIcon={<CheckBoxOutlineBlankIcon />}
                                >
                                {lgScreen && 'Incomplete'}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>

             {/* Ride side controls: editor/console settings */}
            <Grid item xs={6}>
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item>
                        <Button
                            onClick={clearConsole}
                            disabled={!pyodideLoaded}
                            color="primary"
                            variant="contained"
                            startIcon={<ClearAllIcon />}
                        >
                            {lgScreen && 'Clear Console'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={resetCode}
                            disabled={!pyodideLoaded}
                            color="primary"
                            variant="contained"
                            startIcon={<RotateLeftIcon />}
                        >
                            {lgScreen && 'Reset Code'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

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