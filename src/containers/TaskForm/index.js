import React, { Component } from 'react';
import { withStyles, Grid, Box } from '@material-ui/core';
import styles from './styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators,compose} from 'redux';
import validate from './../../commons/Validation/index';
import * as modalActions from './../../actions/modal';
import * as taskActions from './../../actions/task';
import { Field, reduxForm } from 'redux-form';
import renderTextField from './../../components/FormHelper/TextField/index';


class TaskForm extends Component {
     handleSubmitForm = data => {
        const {taskActionCretors,taskEditing} = this.props;
        const {addTask,setTaskUpdate} = taskActionCretors;
        const {title,description,status}=data;
        if(taskEditing && taskEditing.id){
            setTaskUpdate(title,description,status);
        }else{
            addTask(title,description);
        }
        
    };
    render() { 
        const {classes,
            modalActionCreators,
            handleSubmit,
            invalid,
            submitting,
            initialValues,
        }=this.props;
        const {hideModal}=modalActionCreators;
        const taskEditing = initialValues;
        return (
            <form  className={classes.form}  onSubmit={handleSubmit(this.handleSubmitForm)}>
                    <Grid container spacing={2} >
                         <Grid item md={12} >
                             <Field
                                id="title"
                                label="Tiêu đề"
                                className={classes.Field}
                                multiple
                                margin="normal"
                                //placeholder="Nhập tên công viêc...."
                                name="title"
                                component={renderTextField}
                                value={taskEditing ? taskEditing.title :''}
                            />
                        </Grid>
                        <Grid item md={12} >
                            <Field 
                                id="description"
                                label="mô tả"
                                multiple
                                className={classes.Field}
                                margin="normal"
                                //placeholder="nhập mô tả cho công việc...."
                                name="description"
                                component={renderTextField}
                                value={taskEditing ? taskEditing.description :''}
                            />
                        </Grid> 
                        <Grid item md={12}>
                            <Box className={classes.itemBox} >
                            <Button 
                                color="secondary"
                                variant="contained" 
                                size="small"
                                onClick={hideModal}
                                className={classes.itemButton}>
                                    cancel
                                </Button>
                                <Button 
                                disabled={invalid ||submitting}
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.itemButton}
                                type="submit">
                                    submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
            </form> 
        );
    }
}
TaskForm.propTypes={
    classes:PropTypes.object,
    odalActionCreators:PropTypes.shape({
        hideModal:PropTypes.func,
    }),
    taskActionCretors:PropTypes.shape({
        addTask:PropTypes.func,
    }),
    handleSubmit: PropTypes.func,
    invalid:PropTypes.bool,
    submitting:PropTypes.bool,
    initialValues:PropTypes.object,
};
const mapStateToProps = state =>{
    return{
        taskEditing:state.task.taskEditing,
        initialValues:state.task.taskEditing,
        
    };
};
const mapDispatchToProps=(dispatch,props)=>{
    return{
        modalActionCreators:bindActionCreators(modalActions,dispatch),
        taskActionCretors:bindActionCreators(taskActions,dispatch)
    }
};

const withConnect = connect(mapStateToProps,mapDispatchToProps);

const FORM_NAME ="TASK_MANAGEMENT";
const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate:validate,
});

export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm,
)(
    TaskForm,
);
