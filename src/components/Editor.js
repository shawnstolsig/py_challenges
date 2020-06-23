// package imports
import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github"
import {
    Typography
} from '@material-ui/core'


// project imports


function Editor({startingCode}) {
    // state 
    const [code, setCode] = React.useState(startingCode)
    const [output, setOutput] = React.useState('')

    // editor load function
    const onEditorLoad = () => console.log("Editor has loaded.")

    return (
        <React.Fragment>
            <AceEditor
                placeholder="Placeholder Text"
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
                }} />
            <Typography variant="body1">
                {output}
            </Typography>
        </React.Fragment>
    )
}

export default Editor