import { postCompletion, deleteCompletion } from '../util/api'

export const CREATE_COMPLETION = "CREATE_COMPLETION"
export const REMOVE_COMPLETION = "REMOVE_COMPLETION"
export const LOAD_CHALLENGE = "LOAD_CHALLENGE"
export const CLOSE_CHALLENGE = "CLOSE_CHALLENGE"
export const INIT_PYODIDE = "INIT_PYODIDE"

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
    console.log(`action has been dispatched, challenge is: `, challenge)
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

export function handleCreateCompletion({userId, challengeId}, access){
    return (dispatch) => {
        postCompletion({
            user: userId,
            challenge: challengeId
        }, access)
        .then((res) => {
            dispatch(createCompletion(userId, challengeId, res.data.id))
        })
        .catch((err) => {
            console.log("Error posting completion: ")
            console.log(err)
        })
    }
}

export function handleRemoveCompletion({completionId}, access){
    return (dispatch) => {
        deleteCompletion({
            completionId
        }, access)
        .then((res) => {
            dispatch(removeCompletion(completionId))
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