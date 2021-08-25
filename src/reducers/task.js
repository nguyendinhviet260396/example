import * as types from './../constants/task';
import { toastError, toastSuccess } from '../helpers/toastHelper';
 const inittialState ={
     listTask:[],
     taskEditing:null
 };


 const reducer = (state=inittialState,action)=>{
     switch (action.type) {
        case types.FETCH_TASK:{
             return {
                 ...state,
                 listTask:[],
             };
        }
        case types.FETCH_TASK_SUCCESS: {
             const {data} =action.payload;
             return {
                 ...state,
                 listTask:data,
             };
        }
        case types.FETCH_TASK_FAILED: {
             return {
                 ...state,
                 listTask: [],
             };
        }
        case types.FILTER_TASK_SUCCESS:{
             const {data}=action.payload;
             return {
                 ...state,
                 listTask:data,
             }
        }
        case types.ADD_TASK:{
             return{
                 ...state,
             }
        }
        case types.ADD_TASK_SUCCESS:{
            const {data}=action.payload;
            toastSuccess(' Thêm công việc thành công !');
            return{
                ...state,
                listTask:[data].concat(state.listTask),
            }
        }  
        case types.ADD_TASK_FAILD:{
            const {error}= action.payload;
            toastError(error);
            return{
                ...state,
            }
        }  
        case types.SET_TASK_EDITING:{
            const {task}=action.payload;
            return{
                ...state,
                taskEditing:task,
            }
        }
        case types.SET_TASK_DELETE:{
            return{
                ...state,
            }
        }
            
        case types.SET_TASK_DELETE_SUCCESS:{
            const {data}= action.payload;// data id
            toastSuccess(' Xóa công việc thành công !');
            return{
                ...state,
                listTask:state.listTask.filter(item=>item.id !== data),
            }
        }
        case types.SET_TASK_DELETE_FAILD:{
            const {error}= action.payload;
            toastError(error);
            return{
                ...state,
            }
        }
        case types.SET_TASK_UPDATE:{
            return{
                ...state,
            }
        }  
        case types.SET_TASK_UPDATE_SUCCESS:{// lay task tu listTask sau do cat phan tu do ra va chen data da sua vao
            const {data}= action.payload;
            const listTask = state.listTask;
            toastSuccess(' Cập nhật công việc thành công !')
            const index = listTask.findIndex(item => item.id === data.id);
            if(index !== -1){
                const newList=[
                    ...listTask.slice(0,index),
                    data,
                    ...listTask.slice(index+1)
                ];
                return{
                    ...state,
                    listTask:newList,
                }
            }
            return{
                ...state,   
            }
        }
        case types.SET_TASK_UPDATE_FAILD:{
            const {error}= action.payload;
            toastError(error);
            return{
                ...state,
            }
        }
        case types.REFESH_TASK:{
            return {
                ...state,
                listTask:[],
            };
       }
       case types.REFESH_TASK_SUCCESS: {
            const {data} =action.payload;
            return {
                ...state,
                listTask:data,
            };
       }
       case types.REFESH_TASK_FAILED: {
            return {
                ...state,
                listTask: [],
            };
       } 
         default:
             return state;
     }
 }
 export default reducer;