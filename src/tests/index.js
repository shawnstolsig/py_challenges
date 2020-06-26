export function assertEquals(userResult, b){
    return userResult === b
}

export function assertArrayEquals(userResult,b){
    if(userResult.length !== b.length){
        return false
    }
    for(let i = 0; i < userResult.length; i++){
        if(userResult[i] !== b[i]){
            return false
        }
    }
    return true
}

export function assertFalse(userResult){
    if(userResult){
        return false
    }
    return true
}

export function assertTrue(userResult){
    if(userResult){
        return true
    }
    return false
}

export function assertIsNotUndefined(userResult){
    if(userResult === undefined){
        return false
    }
    return true
}