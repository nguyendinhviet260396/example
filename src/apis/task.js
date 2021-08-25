import  AxiosService from './../services/axiosService';
import {API_ENDPOINT} from './../constants/index';
import qs from 'query-string';

// api http://localhost:3000/task/?q:params METHOD : GET

const url = 'tasks';
export const getList =(params={})=>{
    let queryParams='';
    if(Object.keys(params).length >0){
        queryParams=`?${qs.stringify(params)}`;
    }
    return AxiosService.get(`${API_ENDPOINT}/${url}${queryParams}`)
}

// api http://localhost:3000/task METHOD: POST
export const addTask=(data)=>{
    return AxiosService.post(`${API_ENDPOINT}/${url}`,data)
}

// api http://localhost:3000/task/:id METHOD: PUT// truyen vao url va data
export const updateTask=(data,id)=>{
    return AxiosService.put(`${API_ENDPOINT}/${url}/${id}`,data)
}

// api http://localhost:3000/task/:id METHOD: DELETE

export const deteleTask =(id)=>{
    return AxiosService.delete(`${API_ENDPOINT}/${url}/${id}`)
}