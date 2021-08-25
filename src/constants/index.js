import AdminHomePage from '../containers/AdminHomePage';
import TaskBoard from '../containers/TaskBoards';
import LoginPage from './../containers/LoginPage/index';
import SignUpPage from './../containers/SignUpPage/index';

//export const API_ENDPOINT = 'http://localhost:3000';
export const API_ENDPOINT='https://5ed9beef4378690016c6b2f5.mockapi.io/api';

export const STATUSES= [
    {
        value:0,
        lable:'READY'
    },
    {
        value: 1,
        lable: 'INPROGESS'
    },
    {
        value: 2,
        lable: 'COMPLETED'
    }
];

export const STATUS_CODE={
    SUCCESS:200,
    CREATED:201,
    UPDATED:202,
    ERROR :404,
}

export const ADMIN_ROUTES=[
    {
        path:'/admin',
        name:'Trang quản trị',
        exact:true,
        component:AdminHomePage,
    },
    {
        path:'/admin/task-board',
        name:'Trang quản lý công việc',
        exact:false,
        component:TaskBoard,

    }
]

export const ROUTES =[
    {
        path:'/login',
        exact:false,
        name:'đăng nhập',
        component:LoginPage
        
    },
    {
        path:'/signup',
        exact:false,
        name:'đăng kí',
        component:SignUpPage
        
    }
]