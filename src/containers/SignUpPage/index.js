
import React, { Component } from 'react';
import { withStyles, Card, CardContent, Typography, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose,bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderTextField from './../../components/FormHelper/TextField/index';
import validate from './../../commons/Validation/index';
import * as authActions from './../../actions/auths';
import styles from './styles';

class SignUpPage extends Component {
    handleChecked=(e)=>{
        const {checked}=e.target;
        const {authActionCreators,invalid,submitting}=this.props;
        const {onButtonSubmit,offButtonSubmit}=authActionCreators;
        if(checked && !invalid && !submitting ){
            onButtonSubmit()
        }else{
            offButtonSubmit()
        }
    }
    handleCloseForm=()=>{
        const {authActionCreators}=this.props;
        const {checkAuthFaild}=authActionCreators;
        checkAuthFaild();
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
            onButton,
            infAuth,
            submitting}=this.props;
        return (
            <div className={classes.background}>
                <div className={classes.signup}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                                <div className={classes.label}>
                                    <Typography variant="caption" className={classes.typography}>
                                         Đăng kí tài khoản 
                                    </Typography><br/>
                                    <span styles="fontSize: 10 textAlign:center">{infAuth}</span>
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
                                <Field
                                id="cPassWord"
                                label="ConfirmPassword"
                                type="password"
                                name="cPassword"
                                className={classes.textField}
                                fullWidth
                                margin="normal"
                                component={renderTextField}
                                />
                                <FormControlLabel
                                control={ <Checkbox value="agree" />}
                                label="Tôi đã đọc chính sách và đồng ý với điều khoản !"
                                onChange={this.handleChecked}
                                className={classes.Checkbox}
                                />
                                <Button
                                className={classes.button}
                                color = "primary"
                                variant="contained"
                                type="submit"
                                disabled={onButton||submitting || invalid }
                                >
                                    đăng kí
                                </Button>
                                <Button
                                className={classes.button}
                                color = "secondary"
                                variant="contained"
                                type="submit"
                                onClick={this.handleCloseForm}
                                >
                                     quay lại 
                                </Button>
                                <div className="pt-1 text-md-center">
                                    <Link to ="/login">
                                        <Button onClick={this.handleCloseForm} >có tài khoản, có thể đăng nhập !</Button>
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

SignUpPage.propTypes={
    classes:PropTypes.object,
    handleSubmit:PropTypes.func,
    invalid:PropTypes.bool,
    submitting:PropTypes.bool,
    onButton:PropTypes.bool,
    infauth:PropTypes.string,
    authActionCreators:PropTypes.shape({
        onButtonSubmit:PropTypes.func,
        authSignup:PropTypes.func,
        offButtonSubmit:PropTypes.func,
        
    }),
}

const FORM_USER ="TASK_USER";
const withReduxForm = reduxForm({
    form: FORM_USER,
    validate:validate,
});
const mapStateToProps=state=>{
    console.log(state.auth.infAuth,)
    return{
        onButton:state.auth.onButton,
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
)(SignUpPage);


