import AxiosService from '../services/axiosService';
import { API_ENDPOINT } from '../constants/index';

// api http://localhost:3000/task

const url = 'information';
export const getList = () => {
    return AxiosService.get(`${API_ENDPOINT}/${url}`)
}
