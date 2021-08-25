import * as authTypes from './../constants/auths';


export const authLogin =(email,password)=>({
    type:authTypes.AUTH_LOGIN,
    payload:{
        email,
        password,
    }
});

export const authLoginSuccess = (data) => ({
    type: authTypes.AUTH_LOGIN_SUCCESS,
    payload:{
        data,
    }
});

export const authLoginFaild =(error)=>({
    type:authTypes.AUTH_LOGIN_FAILD,
    payload:{
        error,
    }
});

export const authSignup = (email,password) => ({
    type: authTypes.AUTH_SIGNUP,
    payload:{
        email,
        password,
    }
});
export const authSignupSuccess = (data) => ({
    type: authTypes.AUTH_SIGNUP_SUCCESS,
    payload:{
        data,
    }
});

export const authSignupFaild = (error) => ({
    type: authTypes.AUTH_SIGNUP_FAILD,
    payload:{
        error,
    }
});

export const onButtonSubmit =()=>({
    type:authTypes.ON_BUTTON_SUBMIT,
});
export const offButtonSubmit =()=>({
    type:authTypes.OFF_BUTTON_SUBMIT,
});
export const checkAuthSuccess =()=>({
    type:authTypes.CHECK_AUTH_SUCCESS,
});
export const checkAuthFaild =()=>({
    type:authTypes.CHECK_AUTH_FAILD,
});