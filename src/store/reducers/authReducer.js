import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    firstname: null,
    lastname: null,
    username: null,
    loading: false,
    error: null
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true})
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        firstname: null,
        lastname: null,
        username: null,
        loading: false,
        error: null
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.data.token,
        userId: action.data.userId,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        username: action.data.username,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const authRegister = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const clearError = (state, action) => {
    return updateObject(state, {error: null})
}
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.AUTH_REGISTER: return authRegister(state, action);
        case actionType.CLEAR_ERROR: return clearError(state, action);
        default: return state;
    }
}


export default reducer;