// This component is the workhorse of this app.  
// It houses the code editor (using react-ace) and a copy of the console
// (using console-feed).  It also render all of the control button that are 
// used by the editor and the console.  Last but not least, it sets up pyodide
// for running Python code.  


// package imports
import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github"
import { makeStyles } from '@material-ui/core/styles'
import {
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
import EditorControlButton from './EditorControlButton'

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
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false) // indicates when pyodide is ready
    const [isCodeValid, setIsCodeValid] = React.useState(false)     // check user's code for before allowing tests
    const [testsPassed, setTestsPassed] = React.useState(false)     // tests pass

    // load piodide and hook into browser console on initial render
    React.useEffect(() => {
        loadPython()
        Hook(window.console, (log) => setLogs((logs) => [...logs, Decode(log)]))
    }, [])

    // create a memoized version of clearPythonHistory so that it persists across renders 
    // this will prevent any re-renders, as it is a dependency of the useEffect below
    const clearPythonHistory = React.useCallback(() => {
        console.log("trying to clear python history")
        console.log("pyodideLoaded", pyodideLoaded)

        // only clear python history if it's already been loaded
        if (pyodideLoaded) {
            console.log("pyodide is loaded, clearing history")
            // clear user-created pyodide objects (every except for the starting/default pyodide_dir)
            pyodide.runPython(`
                            for key in dir():
                                if key not in pyodide_dir and key != 'pyodide_dir':
                                    del globals()[key]`)
            
            // print message
            console.log("Python history cleared.")
        }
    },[])

    // update state whenever challenge changes
    React.useEffect(() => {
        console.log("in useEffect, going to clear python history")
        setCode(startingCode)
        setIsCodeValid(false)
        setTestsPassed(false)
        clearPythonHistory()

    }, [startingCode, clearPythonHistory])

    // editor load function (maybe do something else here with the UI?)
    const onEditorLoad = () => console.log("Text editor has loaded.")

    // filter console logs.  ommited: 'warn'
    const visibleLogTypes = ['log', 'error', 'info', 'debug', 'command', 'result']

    // load python interpreter. re-loaded after each code execution to clear history
    const loadPython = () => {

        // load new python instance
        languagePluginLoader.then(() => {

            // enable the Run Code
            setPyodideLoaded(true)

            // print out the current version
            console.log(pyodide.runPython('import sys\nsys.version'));

            // store the default objects for later use
            pyodide.runPython('pyodide_dir = dir()')
        });
    }

    // command for clearing console
    const clearConsole = () => {
        setLogs([])
        console.log("Console cleared.")
    }

    // resets python variables and user's code
    const resetCode = () => {
        setCode(startingCode)       // re-insert staring code
        setIsCodeValid(false)       // reset code validation
        setTestsPassed(false)       // reset tests
        clearPythonHistory()        // clear python terminal history
        console.log("Code reset.")
    }

    // run python code
    const runCode = () => {

        // check that eval() is not used (required?)
        if (code.includes('eval')) {
            alert("Use of eval() is not allowed.")
            return
        }
        // run code to make sure it builds (any error messages will print to console)
        pyodide.runPython(code)

        // validate the correctly named function exists for the challenge
        if (pyodide.globals[id] === undefined) {
            console.log(`Missing ${id}() function.`)
            return
        }

        // print message
        console.log("Code successfully validated.")

        // enable test button
        setIsCodeValid(true)

    }

    // run tests (which are contained in the challenge's js object)
    const runTests = () => {

        // flag for checking test results
        let combinedTestsPassed = true

        // get tests object.  this will have each test as a separate key
        let tests = testsProp(pyodide.globals[id])

        // iterate through all tests and print passed/failed message
        Object.keys(tests).forEach((x) => {

            // get result of running test (true/false)
            let result = tests[x].result()

            // if a test fails, set flag to false
            if (!result) {
                combinedTestsPassed = false
            }
            
            // print result of test to console
            console.log(`Test: ${tests[x].name} - ${result ? "Passed" : "Failed"}`)
        })

        // print message regarding completion/failure of challenge
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
                        <EditorControlButton 
                            onClick={runCode}
                            disabled={!pyodideLoaded}
                            icon={<PlayArrowIcon />}
                            text="Run Code"
                        />
                    </Grid>
                    <Grid item>
                        <EditorControlButton 
                            onClick={runTests}
                            disabled={!isCodeValid}
                            icon={<AssignmentTurnedInIcon />}
                            text="Run Tests"
                        />
                    </Grid>
                    <Grid item>
                        {testsPassed 
                            ?   <EditorControlButton 
                                    onClick={() => alert('implement save function')}
                                    disabled={false}
                                    color={'inherit'}
                                    icon={<CheckBoxIcon />}
                                    style={{ color: 'white', background: green[500]}}
                                    text="Completed!  Save?"
                                />
                            :   <EditorControlButton 
                                    onClick={() => alert('implement save function')}
                                    disabled={true}
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    text="Incomplete"
                                /> 
                        }
                    </Grid>
                </Grid>
            </Grid>

             {/* Ride side controls: editor/console settings */}
            <Grid item xs={6}>
                <Grid container justify="flex-end" spacing={1}>
                    <Grid item>
                        <EditorControlButton 
                            onClick={clearConsole}
                            disabled={!pyodideLoaded}
                            icon={<ClearAllIcon />}
                            text="Clear Console"
                        />
                    </Grid>
                    <Grid item>
                        <EditorControlButton 
                            onClick={resetCode}
                            disabled={!pyodideLoaded}
                            icon={<RotateLeftIcon />}
                            text="Reset Code"
                        />
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