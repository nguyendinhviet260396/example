import * as types from './../constants/auths';
import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
    onButton:true,
    listAuths:[],
    infAuth:'',
}
const authReducer = (state=initialState,action) =>{
    switch(action.type){
        case types.AUTH_LOGIN:{
            return{
                ...state,
            }
        }
        case types.AUTH_LOGIN_SUCCESS:{
            //const {data}=action.payload;
            toastSuccess(' Đăng nhập thành công !');
            return {
                ...state,
            }
        }
        case types.AUTH_LOGIN_FAILD:{
            const {error}=action.payload;
            toastError(error);
            return {
                ...state,
            }
        }
        case types.AUTH_SIGNUP:{
            return{
                ...state,
            }
        }
        case types.AUTH_SIGNUP_SUCCESS:{
            const {data}= action.payload;
            toastSuccess(' Thêm tài khoản thành công !');
            return {
                ...state,
                listAuths:[data].concat(state.listAuths),
            }
        }
        case types.AUTH_SIGNUP_FAILD:{
            const {error}=action.payload;
            toastError(error);
            return {
                ...state,
            }
        }
        case types.ON_BUTTON_SUBMIT:{
            return{
                ...state,
                onButton:false,
            }
        }
        case types.OFF_BUTTON_SUBMIT:{
            return{
                ...state,
                onButton:true,
            }
        }
        case types.CHECK_AUTH_SUCCESS:{
            return{
                ...state,
                infAuth:'Thành công !'
            }
        }
        case types.CHECK_AUTH_FAILD:{
            return{
                ...state,
                infAuth:'Tài khoản đã tồn tại !'
            }
        }
        default:
            return state;
    }
};
export  default authReducer;