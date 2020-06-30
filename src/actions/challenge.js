import { postCompletion, deleteCompletion } from '../util/api'

export const CREATE_COMPLETION = "CREATE_COMPLETION"
export const REMOVE_COMPLETION = "REMOVE_COMPLETION"
export const LOAD_CHALLENGE = "LOAD_CHALLENGE"
export const CLOSE_CHALLENGE = "CLOSE_CHALLENGE"
export const INIT_PYODIDE = "INIT_PYODIDE"
export const CLEAR_LOGS = "CLEAR_LOGS"
export const ADD_LOG = 'ADD_LOG'

function createCompletion(userId, challengeId, completionId){
    return {
        type: CREATE_COMPLETION,
        userId,
        challengeId,
        completionId
    }
}

function removeCompletion(completionId){
    return {
        type: REMOVE_COMPLETION,
        completionId
    }
}

function loadChallenge({ challenge, completion, snippets }){
    return {
        type: LOAD_CHALLENGE,
        challenge,
        completion,
        snippets,
    }
}

function closeChallenge(){
    return {
        type: CLOSE_CHALLENGE
    }
}

export function initPyodide(){
    return {
        type: INIT_PYODIDE
    }
}

export function clearLogs(){
    return {
        type: CLEAR_LOGS
    }
}

export function addLog(log){
    return {
        type: ADD_LOG,
        log
    }
}

export function handleCreateCompletion({userId, challengeId}, access, setCompletionData){
    return (dispatch) => {
        postCompletion({
            user: userId,
            challenge: challengeId
        }, access)
        .then((res) => {
            dispatch(createCompletion(userId, challengeId, res.data.id))
            setCompletionData({id: res.data.id, user: userId, challenge: challengeId})
        })
        .catch((err) => {
            console.log("Error posting completion: ")
            console.log(err)
        })
    }
}

export function handleRemoveCompletion(completionId, access, setCompletionData){
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

export function handleLoadChallenge({ challenge, completion, snippets }){
    return (dispatch) => {
        dispatch(loadChallenge({ challenge, completion, snippets }))
    }
}

export function handleCloseChallenge(){
    return (dispatch) => {
        dispatch(closeChallenge())
    }
}