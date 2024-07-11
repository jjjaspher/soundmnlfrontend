import * as actionTypes from './actionTypes';
import axios from 'axios'; 
import {isEmpty} from '../utility';

// const serverURL = 'http://localhost:3030/api';
const serverURL = 'https://soundmnlbackend.onrender.com/api';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (oData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: oData

    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const clearError = () => {
    return {
        type: actionTypes.CLEAR_ERROR,       
    }
}

export const authTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {username: username, password: password}
        axios.post(serverURL + '/login', authData)
        .then(oResponse => {
            dispatch(setData(oResponse))
            const oData =buildAuthSuccessData(oResponse);
            dispatch(authSuccess(oData));
        })
        .catch(err => {           
            const error = isEmpty(err.response.data.message) ? 'Something went wrong...' : err.response.data.message;
            dispatch(authFail(error))
        })
    }
}

const setData = (oData) => {
    return dispatch => {
        const expirationDate = new Date(new Date().getTime() + (oData.data.expiresIn * 1000))
        localStorage.setItem('token', oData.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', oData.data.data.id);
    }
}

export const authRegister = (oData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(serverURL + '/user/create', oData)
        .then(oResponse => {
            dispatch(setData(oResponse));
            const oData = buildAuthSuccessData(oResponse);
            dispatch(authSuccess(oData));
        })
        .catch(err => {
            const error = isEmpty(err.response.data.message) ? 'Something went wrong...' : err.response.data.message;
            dispatch(authFail(error))
        })
    }
}

const buildAuthSuccessData = (oResponse) => {
    return {
        token: oResponse.data.token,
        userId: oResponse.data.data.id,
        firstname: oResponse.data.data.firstname,
        lastname: oResponse.data.data.lastname,
        username: oResponse.data.data.username   
    }                 
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(getUserById(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export const getUserById = (token, userId) => {
    
    return dispatch => {
        const headers = {
            Authorization : `Bearer ${token}`
        }
        axios.get(serverURL + '/user/get/id?id=' + userId, {headers: headers})
        .then(oResponse => {
            const oData = {
                token: token,
                userId: userId,
                firstname: oResponse.data.firstname,
                lastname: oResponse.data.lastname,
                username: oResponse.data.username
            }
            if (isEmpty(oResponse.data)) {
                dispatch(logout())
                return;
            }
            dispatch(authSuccess(oData))
        }).catch(err => {
            dispatch(logout())
        }) 
    }
}
    