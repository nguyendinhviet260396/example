import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TaskItem from './../TaskItem/index';
import PropTypes from 'prop-types';
class TaskList extends Component {
    render() {
        const {classes,tasks,status,onClickEdit,onClickDelete} = this.props;
        return (
            <Grid item md={4} xs={12} key={status.value}>
                <Box ml={2} mt={2} mb={2}>
                    <div className={classes.status}>{status.lable}</div>
                </Box>
                <div className={classes.wrapperListTask}>
                    {
                        tasks.map((task, index) => {
                            return (
                                <TaskItem
                                key={task.id}
                                status={status}
                                task={task}
                                onClickEdit={()=>onClickEdit(task)}
                                onClickDelete={()=>onClickDelete(task)}
                                /> 
                            );
                        })
                    }
                </div>
            </Grid>  
        );
    }
};

TaskList.propTypes={
    classes:PropTypes.object,
    task:PropTypes.object,
    status:PropTypes.object,
    onClickEdit:PropTypes.func,
    onClickDelete:PropTypes.func,
}
export default withStyles(styles)(TaskList);
