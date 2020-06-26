import { TrainRounded } from "@material-ui/icons"

export function assertEquals(a,b){
    return a === b
}

export function assertArrayEquals(a,b){
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]){
            return false
        }
    }
    return true
}

export function assertFalse(a){
    if(a){
        return false
    }
    return true
}

export function assertTrue(a){
    if(a){
        return true
    }
    return false
}