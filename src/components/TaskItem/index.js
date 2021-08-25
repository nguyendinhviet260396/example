import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

class TaskItem extends Component {
    render() {
        const{classes,task,status,onClickEdit,onClickDelete}=this.props;
        const{id,description,title}=task;
        return (
            <Box mt={2} mb={2}>
                <Card key={id} className={classes.card}>
                    <CardContent>
                        <Grid container justify='space-between' >
                            <Grid item md={8}>
                                <Typography component="h2">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item md={4}>
                                {status.label}
                            </Grid>
                        </Grid >
                        <span>
                            {description}
                        </span>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={onClickDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={onClickEdit}
                        > 
                            Detail
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        )
    }
}

TaskItem.propTypes={
    classes:PropTypes.object,
    task:PropTypes.object,
    status:PropTypes.object,
    onClickEdit:PropTypes.func,
    onClickDelete:PropTypes.func,

}

export default withStyles(styles)(TaskItem);
