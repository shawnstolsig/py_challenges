import {
    postCompletion,
    deleteCompletion,
    saveNewCode,
    saveCode,
    deleteCode
} from '../util/api'

export const CREATE_COMPLETION = "CREATE_COMPLETION"
export const REMOVE_COMPLETION = "REMOVE_COMPLETION"
export const LOAD_CHALLENGE = "LOAD_CHALLENGE"
export const CLOSE_CHALLENGE = "CLOSE_CHALLENGE"
export const INIT_PYODIDE = "INIT_PYODIDE"
export const CLEAR_LOGS = "CLEAR_LOGS"
export const ADD_LOG = 'ADD_LOG'
export const SAVE_AS = 'SAVE_AS'
export const SAVE = 'SAVE'
export const DELETE_SNIPPET = 'DELETE_SNIPPET'

function createCompletion(userId, challengeId, completionId) {
    return {
        type: CREATE_COMPLETION,
        userId,
        challengeId,
        completionId
    }
}

function removeCompletion(completionId) {
    return {
        type: REMOVE_COMPLETION,
        completionId
    }
}

function loadChallenge({ challenge, completion, snippets }) {
    return {
        type: LOAD_CHALLENGE,
        challenge,
        completion,
        snippets,
    }
}

function closeChallenge() {
    return {
        type: CLOSE_CHALLENGE
    }
}

function saveAs(payload) {
    return {
        type: SAVE_AS,
        ...payload
    }
}

function save(payload) {
    return {
        type: SAVE,
        ...payload
    }
}

function deleteSnippet(id){
    return {
        type: DELETE_SNIPPET,
        id
    }
}

export function initPyodide() {
    return {
        type: INIT_PYODIDE
    }
}

export function clearLogs() {
    return {
        type: CLEAR_LOGS
    }
}

export function addLog(log) {
    return {
        type: ADD_LOG,
        log
    }
}

export function handleCreateCompletion({ userId, challengeId }, access, setCompletionData) {
    return (dispatch) => {
        postCompletion({
            user: userId,
            challenge: challengeId
        }, access)
            .then((res) => {
                dispatch(createCompletion(userId, challengeId, res.data.id))
                setCompletionData({ id: res.data.id, user: userId, challenge: challengeId })
            })
            .catch((err) => {
                console.log("Error posting completion: ")
                console.log(err)
            })
    }
}

export function handleRemoveCompletion(completionId, access, setCompletionData) {
    return (dispatch) => {
        deleteCompletion(completionId, access)
            .then(() => {
                dispatch(removeCompletion(completionId))
                setCompletionData(undefined)
            })
            .catch((err) => {
                console.log("Error removing completion: ")
                console.log(err)
            })
    }
}

export function handleLoadChallenge({ challenge, completion, snippets }) {
    return (dispatch) => {
        dispatch(loadChallenge({ challenge, completion, snippets }))
    }
}

export function handleCloseChallenge() {
    return (dispatch) => {
        dispatch(closeChallenge())
    }
}

export function handleSaveAs({ code, title, user, challenge }, access, setLoadedSolution) {
    return (dispatch) => {

        // post to backend
        saveNewCode({
            code,
            title,
            user,
            challenge,
        }, access)
            // update state with response (this allows saving again, once we have code's id)
            .then((res) => {

                const payload = {
                    id: res.data.id,
                    code,
                    challenge,
                    title,
                    date_created: res.data.date_created,
                    date_updated: res.data.date_updated,
                    user
                }

                dispatch(saveAs(payload))
                setLoadedSolution({
                    id: res.data.id,
                    code,
                    title,
                })
                console.log(`Snippet "${title}" created!`)
                // need to create state to hold all challenge snippets in component, and update this when new snippet created
            })
            .catch((error) => {
                console.log('Error while trying to Save As: ')
                console.log(error)
            })
    }
}

export function handleSave({ loadedSolution, code }, access, setLoadedSolution) {
    return (dispatch) => {
        // post to backend
        saveCode({
            id: loadedSolution.id,
            code,
        }, access)
            .then(() => {
                console.log(`"${loadedSolution.title}" code saved.`)
                dispatch(save({
                    ...loadedSolution,
                    code
                }))
                setLoadedSolution({
                    ...loadedSolution,
                    code,
                })
            })
            .catch((error) => {
                console.log('Error while trying to Save: ')
                console.log(error)
            })
    }
}

export function handleDeleteCode(id, access){
    return (dispatch) => {
        deleteCode(id, access)
        .then(() => {
            dispatch(deleteSnippet(id))
        })
    }
}