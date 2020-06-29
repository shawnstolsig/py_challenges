import { postCompletion, deleteCompletion } from '../util/api'

export const CREATE_COMPLETION = "CREATE_COMPLETION"
export const REMOVE_COMPLETION = "REMOVE_COMPLETION"

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