//import * as taskApis from './../apis/task';
import * as taskConstants from './../constants/task';
import { STATUSES } from './../constants';

/** task Fetch List api */
export const fetchListTask = (params={}) => {
    return {
        type: taskConstants.FETCH_TASK,
        payload:{
            params,
        }
    };
};
export const fetchListTaskFailed = error => {
    return {
        type: taskConstants.FETCH_TASK_FAILED,
        payload: {
            error,
        }
    };
};
export const fetchListTaskSuccess = data => {
    //console.log(data)
    return {
        type: taskConstants.FETCH_TASK_SUCCESS,
        payload: {
            data,
        }
    };
};

// task filter action***************************************

export const filterTask = keyword =>{
    return {
        type: taskConstants.FILTER_TASK,
        payload:{
        keyword,
        }
    }
};

export const filterTaskSucces = data=>{
    return{
        type : taskConstants.FILTER_TASK_SUCCESS,
        payload:{
            data,
        }
    }
};

/**add task to api */

export const addTaskFaild = error=>{
    return{
        type : taskConstants.ADD_TASK_FAILD,
        payload:{
            error,
        }
    }
};
export const addTask =(title,description)=>{
    return{
        type : taskConstants.ADD_TASK,
        payload:{
            title,
            description
        }
    }
};
export const addTaskSucces = data =>{
    return{
        type : taskConstants.ADD_TASK_SUCCESS,
        payload:{
            data,
        }
    }
};


/**edit task */
export const setTaskEditing = task =>{
    return{
        type : taskConstants.SET_TASK_EDITING,
        payload:{
            task,
        }
    }
};

/**delete task */
export const setTaskDelete = id =>{
    return{
        type : taskConstants.SET_TASK_DELETE,
        payload:{
            id,
        }
    }
};
export const setTaskDeleteSucces = data=>{
    return{
        type : taskConstants.SET_TASK_DELETE_SUCCESS,
        payload:{
            data,
        }
    }
};
export const setTaskDeleteFaild =error=>{
    return{
        type : taskConstants.SET_TASK_DELETE_FAILD,
        payload:{
            error,
        }
    }
};
/** UPDATE  TASK */
export const setTaskUpdate =(title,description,status = STATUSES[0].value)=>{
    return{
        type : taskConstants.SET_TASK_UPDATE,
        payload:{
            title,
            description,
            status,
        }
    }
};
export const setTaskUpdateSucces = data =>{
    return{
        type : taskConstants.SET_TASK_UPDATE_SUCCESS,
        payload:{
            data,
        }
    }
};
export const setTaskUpdateFaild =error=>{
    return{
        type : taskConstants.SET_TASK_UPDATE_FAILD,
        payload:{
            error,
        }
    }
};
/**refesh page */
export const refeshTask = (params={}) => {
    return {
        type: taskConstants.REFESH_TASK,
        payload:{
            params,
        }
    };
};
export const refeshTaskFailed = error => {
    return {
        type: taskConstants.REFESH_TASK_FAILED,
        payload: {
            error,
        }
    };
};
export const refeshTaskSuccess = data => {
    //console.log(data)
    return {
        type: taskConstants.REFESH_TASK_SUCCESS,
        payload: {
            data,
        }
    };
};
/**
 * b1: fetchListtaskRequest()
 * b2: Reset state.task=[]
 * b3: dispatch fetchListTaskSuccess(data reponse)
 */
// export const fetchListTaskRequest =()=>{
//     return dispatch =>{
//         dispatch(fetchListTask());
//         taskApis
//         .getList()
//         .then(resp =>{
//             const {data}=resp;
//             dispatch(fetchListTaskSuccess(data));
//             //console.log('data:',data);
//         })
//         .catch(error =>{
//             dispatch(fetchListTaskFailed(error));
//             //console.log(error);
//         });
//     };
// };

