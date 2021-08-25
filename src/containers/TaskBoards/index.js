import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Addicon from'@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { STATUSES } from './../../constants';
import TaskList from './../../components/TaskList/index';
import TaskForm from './../TaskForm/index';
import PropTypes from 'prop-types';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as inforActions from './../../actions/information';
import * as productsActions from './../../actions/products';
import * as taskActions from './../../actions/task';
import SearchBox from './../../components/SearchBox/index';
import * as modalActions from './../../actions/modal';
import {Box} from '@material-ui/core';
class TaskBoard extends Component {

    componentDidMount(){
        const { taskActionCreators,inforActionsCreators,productsActionsCreators}=this.props;
        const { fetchListTask } = taskActionCreators;
        const { fetchListInfor } = inforActionsCreators;
        const { fetchListProducts } = productsActionsCreators;
        fetchListTask();
        fetchListInfor();
        fetchListProducts();
    };
    handleEditTask=(task)=>{
        const {taskActionCreators,modalActionCreators}=this.props;
        const {setTaskEditing}=taskActionCreators;
        setTaskEditing(task);
        const {showModal,changeModalTitle,changeModalContent}=modalActionCreators;
        showModal();
        changeModalTitle('CẬP NHẬT CÔNG VIỆC !');
        changeModalContent(<TaskForm />);

    };
    refeshTask=(e)=>{
        console.log(e)
        const {taskActionCreators} = this.props;
        const { refeshTask } = taskActionCreators;
        refeshTask();

        }
    
    loadData=()=>{
        const{taskActionCreators} = this.props;
        const { fetchListTask } = taskActionCreators;
        fetchListTask();
    }
    
    handleFilter=(e)=>{
        const {value}= e.target;
        const{taskActionCreators} = this.props;
        const { filterTask} = taskActionCreators;
        filterTask(value);
    }
    openForm=()=>{
        const {modalActionCreators,taskActionCreators}=this.props;
        const {setTaskEditing}=taskActionCreators;
        setTaskEditing(null);
        const {showModal,changeModalTitle,changeModalContent}=modalActionCreators;
        showModal();
        changeModalTitle('THÊM MỚI CÔNG VIỆC !');
        changeModalContent(<TaskForm />);
    }
    showModalDeleteTask=(task)=>{
        
        const {modalActionCreators,classes}=this.props;
        const {hideModal,showModal,changeModalTitle,changeModalContent}=modalActionCreators;
        showModal();
        changeModalTitle(' XÓA CÔNG VIỆC!');
        changeModalContent(
                            <div className={classes.modalDelete}>
                                <div className={classes.modalConfimText}>
                                    Bạn chắc chắn muốn xóa {''}
                                    <span className={classes.modalConfimTextBold}>{task.title} ? </span>
                                </div>
                                <Box className={classes.box} mt={2}>
                                    <Box ml={1}>
                                        <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className={classes.button}
                                        onClick={hideModal}>
                                            Hủy Bỏ
                                        </Button>
                                    </Box>
                                    <Box >
                                        <Button 
                                        variant="contained"
                                        color="primary" 
                                        className={classes.button}
                                        onClick={()=>this.handleDeleteTask(task)}>
                                            Đồng Ý
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
             );
    }
    handleDeleteTask(task){
        const {id}=task;
        const {taskActionCreators}=this.props;
        const {setTaskDelete} = taskActionCreators;
        setTaskDelete(id);
    }
    renderBoard(){
        const {listTask}= this.props;
        let xhtml = null;
        xhtml= (
            <Grid container spacing={2}>
                {STATUSES.map((status,index)=>{
                    const taskFiltered = listTask.filter(task =>task.status === status.value);
                    return(
                        <TaskList
                        key={index}
                        tasks={taskFiltered}
                        status={status}
                        onClickEdit={this.handleEditTask}
                        onClickDelete={this.showModalDeleteTask}
                       />
                    );
                 })} 
            </Grid>  
        );
        return xhtml;
    };
    renderSearchBox(){
        let xhtml =null;
        xhtml=(
            <SearchBox
            handleChange={this.handleFilter}
            />
        );
        return xhtml;
    }
    render() {
        const {classes}=this.props;
        return (
            <div className={classes.taskBoard} id='1'>
                 <input type="checkbox" onClick={this.refeshTask}/>
                 <label > auto refesh</label><br/>
                <Button 
                    variant="contained"
                    color="primary" 
                    size ="small"
                    className={classes.button} 
                    onClick={this.loadData}>
                    <Addicon />Loading Data...   
                </Button>
                <Button 
                    variant="contained"
                    color="primary"
                    size ="small"
                    className={classes.button}
                    onClick={this.openForm}>
                    <Addicon />Thêm công việc...
                </Button>
                {this.renderSearchBox()}
                {this.renderBoard()}
                {/* {this.refeshTask()} */}
            </div>
        );
    }
}

TaskBoard.propTypes={
    classes:PropTypes.object,
    taskActionCreators:PropTypes.shape({
        fetchListTask:PropTypes.func,
        setTaskEditing:PropTypes.func,
        setTaskDelete:PropTypes.func,
        refeshTask:PropTypes.func,
    }),
    inforActionsCreators: PropTypes.shape({
        fetchListInfor: PropTypes.func,
    }),
    productsActionsCreators: PropTypes.shape({
        fetchListProducts: PropTypes.func,
    }),
    modalActionCreators:PropTypes.shape({
        showModal:PropTypes.func,
        hideModal:PropTypes.func,
        changeModalTitle:PropTypes.func,
        changeModalContent:PropTypes.func,

    }),
    listTask:PropTypes.array,
    filterTask:PropTypes.func,

}

const mapStateToProps=(state)=>{
    return{
        ...state,
        listTask:state.task.listTask,
    }
};

const mapDispatchToProps =(dispatch,props)=>{
    return{
        taskActionCreators:bindActionCreators(taskActions,dispatch),
        inforActionsCreators:bindActionCreators(inforActions,dispatch),
        productsActionsCreators: bindActionCreators(productsActions, dispatch),
        modalActionCreators:bindActionCreators(modalActions,dispatch)
    }
}
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(TaskBoard));
