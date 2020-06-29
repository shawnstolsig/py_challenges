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
    Save as SaveIcon,
} from '@material-ui/icons'
import { red, green } from '@material-ui/core/colors'
import { Hook, Console, Decode } from 'console-feed'
import { connect } from 'react-redux'

// project imports
import { languagePluginLoader } from '../pyodide/pyodide'
import EditorControlButton from './EditorControlButton'
import { saveNewCode, saveCode, toggleCompleted } from '../util/api'

// material UI classes for style
const useStyles = makeStyles((theme) => ({
    console: {
        background: 'black',
        height: 500,
        overflow: 'auto'
    }
}))

function Editor(props) {
    const classes = useStyles()
    const { 
        startingCode, 
        testsProp, 
        challengeId, 
        authedUserId, 
        access, 
        userCompletedChallenge,
        completionId,
        dispatch
    } = props

    // state 
    const [code, setCode] = React.useState(startingCode)                    // user's code
    const [logs, setLogs] = React.useState([])                              // console for print statements
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false)         // indicates when pyodide is ready
    const [isCodeValid, setIsCodeValid] = React.useState(false)             // check user's code for before allowing tests
    const [testsPassed, setTestsPassed] = React.useState(false)             // tests pass
    const [loadedSolution, setLoadedSolution] = React.useState(null)        // state for loaded solution
    const [challengeCompleted, setChallengeCompleted] = React.useState(false)

    // load piodide and hook into browser console on initial render
    React.useEffect(() => {
        loadPython()
        Hook(window.console, (log) => setLogs((logs) => [...logs, Decode(log)]))
    }, [])

    // create a memoized version of clearPythonHistory so that it persists across renders 
    // this will prevent any re-renders, as it is a dependency of the useEffect below
    const clearPythonHistory = React.useCallback(() => {

        // only clear python history if pyodide is already loaded 
        // (this does trigger an extra clear on initial loading or pyodide)
        if (pyodideLoaded) {
            // clear user-created pyodide objects (every except for the starting/default pyodide_dir)
            pyodide.runPython(`
                            for key in dir():
                                if key not in pyodide_dir and key != 'pyodide_dir':
                                    del globals()[key]`)
        }
    }, [pyodideLoaded])

    // update state whenever challenge changes
    React.useEffect(() => {
        setCode(startingCode)
        setIsCodeValid(false)
        setTestsPassed(false)
        clearPythonHistory()
    }, [startingCode, clearPythonHistory])

    // set flag if user has completed this challenge or not
    React.useEffect(() => {
        console.log("in useEffect, setting completedChallenge to ", userCompletedChallenge)
        setChallengeCompleted(userCompletedChallenge)
    }, [challengeId, userCompletedChallenge])

    // editor load function (maybe do something else here with the UI?)
    const onEditorLoad = () => console.log("Text editor has loaded.")

    // filter console logs.  ommited: 'warn'
    const visibleLogTypes = [
        'log',
        'error',
        'info',
        'debug',
        'command',
        'result'
    ]

    // load python interpreter. re-loaded after each code execution to clear history
    const loadPython = () => {

        // load new python instance
        languagePluginLoader.then(() => {

            // print out the current version
            console.log(pyodide.runPython('import sys\nsys.version'));

            // store the default objects for later use
            pyodide.runPython('pyodide_dir = dir()')

            // enable the Run Code
            setPyodideLoaded(true)
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
        if (pyodide.globals[challengeId] === undefined) {
            console.log(`Missing ${challengeId}() function.`)
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
        let tests = testsProp(pyodide.globals[challengeId])

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

    // save new code
    const saveAs = () => {
        // post to backend
        saveNewCode({
            code,
            title: 'hardcoded title',
            user: authedUserId,
            challenge: challengeId
        }, access)
            // update state with response (this allows saving again, once we have code's id)
            .then((res) => {
                setLoadedSolution({
                    id: res.data.id,
                    code,
                    title: 'hardcoded title',
                })
            })
            .catch((error) => {
                console.log('unable to saveNew, error: ')
                console.log(error)
            })
    }

    // save existing code
    const save = () => {
        // post to backend
        saveCode({
            id: loadedSolution.id,
            code,
        }, access)
            .then(() => {
                console.log(`"${loadedSolution.title}" code saved.`)
                setLoadedSolution({
                    ...loadedSolution,
                    code,
                })
            })
            .catch((error) => {
                console.log('unable to save, error: ')
                console.log(error)
            })
    }

    // mark challenge as complete
    const toggleCompletion = () => {
        console.log("toggling")

        // if challenge is completed, then delete completion entry
        if(challengeCompleted){
            toggleCompleted({
                completedId: completionId,
                markComplete: false
            }, access)
            .then(()=>{
                setChallengeCompleted(false)
                // also post to store?
            })
            .catch(()=>alert("error toggling"))
        } 
        // if challenge is not completed, then post completion
        else {
            toggleCompleted({
                challengeId,
                user: authedUserId,
                markComplete: true
            }, access)
            .then((res)=>{
                setChallengeCompleted(true)
                // also post to store?  with res.data.id    
                // the current issue is that even that the backend has the new completion, the store does not
                // so when a completion is created, must also add to store.  do this optimistically? 
            })
            .catch(()=>alert("error toggling"))
        }
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
                    {/* Only show save and "mark completed" buttons if logged in */}
                    {authedUserId &&
                        <React.Fragment>
                            <Grid item>
                                <EditorControlButton
                                    onClick={saveAs}
                                    icon={<SaveIcon />}
                                    text="Save As..."
                                />
                            </Grid>
                            <Grid item>
                                <EditorControlButton
                                    onClick={save}
                                    icon={<SaveIcon />}
                                    disabled={!loadedSolution}
                                    text="Save"
                                />
                            </Grid>
                            <Grid item>
                                {challengeCompleted
                                    ? <EditorControlButton
                                        onClick={toggleCompletion}
                                        icon={<CheckBoxIcon />}
                                        style={{ color: 'white', background: green[500] }}
                                        text="Completed"
                                    />
                                    : <EditorControlButton
                                        onClick={toggleCompletion}
                                        style={{ color: 'white', background: red[500] }}
                                        icon={<CheckBoxOutlineBlankIcon />}
                                        text="Not completed"
                                    />
                                }
                            </Grid>
                        </React.Fragment>
                    }

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

function mapStateToProps(state, {challengeId}) {
    if (state.authedUser) {
        let completedChallenges = state.authedUser.completedChallenges
        let completionId = null
        let userCompletedChallenge = false
        completedChallenges.forEach((c)=> {
            if(c.challenge === challengeId){
                completionId = c.id
                userCompletedChallenge = true
            }
        })
        console.log("userCompletedChallenge is", completedChallenges.includes(challengeId))
        return {
            authedUserId: state.authedUser.id,
            access: state.authedUser.access,
            userCompletedChallenge,
            completionId 
        }
    }
    return {
        userCompletedChallenges: []
    }
}

export default connect(mapStateToProps)(Editor)