import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function authCheck(){
    return {
        type:ActionTypes.AUTH_CHECK
    }
}

export function getLang(){
    return {
        type:ActionTypes.GET_LANG
    }
}

export function setLang(payload){
    return {
        type:ActionTypes.SET_LANG,
        payload
    }
}