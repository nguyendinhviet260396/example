
import React, { Component } from 'react';
import { withStyles, Card, CardContent, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose,bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from './../../components/FormHelper/TextField/index';
import validate from './../../commons/Validation/index';
import * as authActions from './../../actions/auths';
import styles from './styles';

class LoginPage extends Component {
    handleCloseForm=()=>{
        const {history}= this.props;
        history.push('/login');
    }
    handleSubmitForm=(data)=>{
        const {email,password}= data;
        const {authActionCreators}=this.props;
        const {authSignup}=authActionCreators;
        authSignup(email,password);
    }
    render() {
        const {classes,
            handleSubmit,
            invalid,
            //infAuth,
            submitting}=this.props;
        return (
            <div className={classes.background}>
                <div className={classes.signup}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                                <div className={classes.label}>
                                    <Typography variant="caption" className={classes.typography}>
                                         Đăng nhập
                                    </Typography><br/>
                                    {/* <span styles="fontSize: 10 textAlign:center">{infAuth}</span> */}
                                </div>
                                <Field
                                id="email"
                                label="Email"
                                name="email"
                                className={classes.textField}
                                type="text"
                                fullWidth
                                margin="normal"
                                component={renderTextField}
                                />
                                 <Field
                                id="password"
                                label="Password"
                                type="password"
                                name="password"
                                className={classes.textField}
                                fullWidth
                                margin="normal"
                                component={renderTextField}
                                />
                                <Button
                                className={classes.button}
                                color = "primary"
                                variant="contained"
                                type="submit"
                                disabled={submitting || invalid }
                                >
                                    đăng nhập
                                </Button>
                                <Button
                                className={classes.button}
                                color = "secondary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleCloseForm}
                                >
                                     hủy bỏ 
                                </Button>
                                <div className="pt-1 text-md-center">
                                    <Link to ="/signup">
                                        <Button styles="fontSize:15 ">đăng kí tài khoản !</Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes={
    classes:PropTypes.object,
    handleSubmit:PropTypes.func,
    invalid:PropTypes.bool,
    submitting:PropTypes.bool,
   // history:PropTypes.object,
    authActionCreators:PropTypes.shape({
        onButtonSubmit:PropTypes.func,
        authSignup:PropTypes.func,
        offButtonSubmit:PropTypes.func,
    }),
}

const FORM_USER_LOGIN ="TASK_USER_LOGIN";
const withReduxForm = reduxForm({
    form: FORM_USER_LOGIN,
    validate:validate,
});
const mapStateToProps=state=>{
    return{
        infAuth:state.auth.infAuth,
    }
};
const mapDispatchToProps=(dispatch,props)=>{
    return{
        authActionCreators:bindActionCreators(authActions,dispatch),
    }
};
const withConnect=connect(mapStateToProps,mapDispatchToProps);
export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm,
)(LoginPage);

