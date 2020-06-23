// package imports
import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github"
import {
    Typography,
    Button
} from '@material-ui/core'


// project imports
import { languagePluginLoader } from '../pyodide/pyodide'


function Editor({startingCode}) {
    // state 
    const [code, setCode] = React.useState(startingCode)
    const [output, setOutput] = React.useState('Loading pyodide...')
    const [pyodideLoaded, setPyodideLoaded] = React.useState(false)

    // load piodide on initial render
    React.useEffect(() => {
        languagePluginLoader.then(() => {
            setPyodideLoaded(true)
            setOutput(pyodide.runPython('import sys\nsys.version'));
        });
    }, [])

    // editor load function
    const onEditorLoad = () => console.log("Editor has loaded.")

    // run python code
    const runCode = () => {
        setOutput(output + '\n' + pyodide.runPython(code))
    }
    

    return (
        <React.Fragment>
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
                  tabSize: 2,
                  showPrintMargin: false
                }} />
            <Button onClick={runCode} disabled={!pyodideLoaded}>
                Run
            </Button>
            <Typography variant="body1">
                {output}
            </Typography>
        </React.Fragment>
    )
}

export default Editor