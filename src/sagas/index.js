import {fork,take,call,put,delay,takeLatest, takeEvery, select} from 'redux-saga/effects';//select to listTask from store
import * as taskTypes from './../constants/task';
import * as authTypes from './../constants/auths';
import {
    getList,
    addTask,
    deteleTask,     
    updateTask
    } from './../apis/task';
    import {
        getListUser,
        addUser,
        //deteleUser,     
        //updateUser
        } from './../apis/auth';
import {STATUS_CODE, STATUSES} from './../constants/index';
import {showLoading,hideLoading} from './../actions/ui';
import {hideModal} from './../actions/modal';
import {
    fetchListTaskSuccess,
    fetchListTaskFailed,
    addTaskSucces, 
    addTaskFaild, 
    fetchListTask,
    setTaskDeleteFaild,
    setTaskDeleteSucces,
    setTaskUpdateSucces,
    setTaskUpdateFaild,
    refeshTaskSuccess,
    refeshTaskFailed
    } from './../actions/task';
import {
    authSignupSuccess,
    authSignupFaild,
    checkAuthFaild,
    checkAuthSuccess
    } from './../actions/auths';
/**
 * B1: dispatch action fetchTask
 * B2:Call animationPlayState: 
 * B3:Kiểm tra status_code
 * Nếu thành công thì thực thi ...
 * Nếu thất bại thì thực thi gì đó....button-big
 * B4:Tắt Loadding
 * B5:thực thi công việc tiếp theo...
 */
function* watchFetchListTaskAction(){
    while (true){
        const action = yield take(taskTypes.FETCH_TASK);// khi FETCH_TASK duoc dispatch thi code tu day tro xuong moi chay
        yield put(showLoading());
        const {params}=action.payload;
        console.log(params);
        const resp = yield call(getList,params);
        const {status,data}= resp;
        if(status === STATUS_CODE.SUCCESS){
            yield put(fetchListTaskSuccess(data));  
        }else{
            yield put(fetchListTaskFailed(data));
        }
        yield delay(1000);
        yield put(hideLoading());
    } 
}

function* filterTaskSaga({payload}){
    yield delay(500);
    const {keyword} = payload;
    /**
     * 
     * call api/
     * /const resp= yield call(getList)
    //const {data}=resp;
    //const filteredTask = data.filter(task =>
     */
    yield put(fetchListTask({
        filter:keyword.charAt(0).toUpperCase() + keyword.slice(1),// mockAPI
        //q:keyword, //json-server
        }),
    );
    // const list = yield select (state => state.task.listTask);  
    // const filteredTask = list.filter(task =>
    //     task.title
    //     .trim()
    //     .toLowerCase()
    //     .includes(keyword
    //         .toString()
    //         .trim()
    //         .toLowerCase()),
    //       );
    // yield put(filterTaskSucces(filteredTask));
}
function* addTaskSaga({payload}){
    const{title,description}= payload;
    yield put(showLoading());
    const reps = yield call(addTask,
        {
            title:title,
            description:description,
            status: STATUSES[0].value,
        }
        );
    const {data,status}=reps;
    if(status === STATUS_CODE.CREATED){
        yield put(addTaskSucces(data));
        yield put(hideModal());

    }else {
        yield put(addTaskFaild(data));

    }
    yield delay(500);
    yield put(hideLoading());
    
}
function* updateSaga({payload}){
    const {title,description,status}=payload;
    const taskEditing = yield select(state => state.task.taskEditing);
    yield put(showLoading());
    const reps = yield call(
        updateTask,
        {title,
        description,
        status},
        taskEditing.id,
    );
    const {data,status:statusCode}=reps;
    if(statusCode === STATUS_CODE.SUCCESS){
        yield put(setTaskUpdateSucces(data));
        yield put(hideModal());
    }else{
        yield put(setTaskUpdateFaild(data));
    }
    yield delay(1000);
    yield put(hideLoading());

}

function* deleteSaga({payload}){
    const {id}= payload;
    yield put(showLoading());
    const reps= yield call(deteleTask,id);
    const {data,status}=reps;
    if(status === STATUS_CODE.SUCCESS){
        yield put(setTaskDeleteSucces(id));
        yield put(hideModal());
    } else {
        yield put(setTaskDeleteFaild(data));
    }
    yield delay(500);
    yield put(hideLoading());


}
function* refeshSaga({payload}){
    yield put(showLoading());
    const {params}=payload;
    const resp = yield call(getList,params);
    const {status,data}= resp;
    if(status === STATUS_CODE.SUCCESS){
        yield put(refeshTaskSuccess(data));  
    }else{
        yield put(refeshTaskFailed(data));
    }
    yield delay(100);
    yield put(hideLoading());
}
function* loginSaga({payload}){
    //const {email,password}= payload;
    //const params = {q:email}
    //const list = yield select (state => state);
   // console.log(list)
    //console.log(state);
    // yield put(showLoading());
    // const resp =yield call(getListUser,params);
    // const{data,status}=resp;
    // if(status === STATUS_CODE.SUCCESS && data.length !== 0){
    //     const resp1 = yield call(addUser,{
    //         email:email,
    //         password:password,
    //     });
    //     const {data,status}= resp1;
    //     if(status === STATUS_CODE.CREATED){
    //         yield put(authSignupSuccess(data));
    //         yield put(checkAuthSuccess());
    //     }else{
    //         yield put(authSignupFaild(data));
    //     }
    // }else{
    //     yield put(checkAuthFaild());
    // }
    yield delay(500);
    yield put(hideLoading());

}
function* signupSaga({payload}){
    const {email,password}= payload;
    const params = {q:email}
    yield put(showLoading());
    const resp =yield call(getListUser,params);
    const{data,status}=resp;
    if(status === STATUS_CODE.SUCCESS && data.length === 0){
        const resp1 = yield call(addUser,{
            email:email,
            password:password,
        });
        const {data,status}= resp1;
        if(status === STATUS_CODE.CREATED){
            yield put(authSignupSuccess(data));
            yield put(checkAuthSuccess());
        }else{
            yield put(authSignupFaild(data));
        }
    }else{
        yield put(checkAuthFaild());
    }
    yield delay(500);
    yield put(hideLoading());
}

function* rootSaga() {
    yield fork(watchFetchListTaskAction);
    yield takeLatest(taskTypes.FILTER_TASK,filterTaskSaga);
    yield takeEvery(taskTypes.ADD_TASK,addTaskSaga);
    yield takeLatest(taskTypes.SET_TASK_DELETE,deleteSaga);
    yield takeLatest(taskTypes.SET_TASK_UPDATE,updateSaga);
    yield takeLatest(taskTypes.REFESH_TASK,refeshSaga);
    yield takeLatest(authTypes.AUTH_LOGIN,loginSaga);
    yield takeLatest(authTypes.AUTH_SIGNUP,signupSaga)
    
}
export default rootSaga;