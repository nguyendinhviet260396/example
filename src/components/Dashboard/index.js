import React, { Component } from 'react';
import styles from './styles';
import { withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import * as uiActions from './../../actions/ui';
import classname from 'classnames';
import Footer from './Footer/index';
class Dashboard extends Component {
    handleToggleSidebar=(value)=>{
        const {uiActionCreators} = this.props;
        const {showSideBar,hideSideBar} = uiActionCreators;
         if (value) {
             showSideBar();
         }else{
             hideSideBar();
         }
    }
    render() {
        const {classes,children,name,openSideBar} =this.props;
        return (
            <div className={classes.dashboard}>
                <Header 
                name={name}
                openSideBar={openSideBar}
                onToggleSideBar={this.handleToggleSidebar}
                 />
                <div className={classes.wrapper}>
                    <Sidebar 
                    openSideBar={openSideBar}
                    onToggleSideBar={this.handleToggleSidebar} />
                    <div 
                    className={classname(classes.wrapperContent,
                    {[classes.shiftLeft]:openSideBar===false,})}>
                        {children}
                    </div>
                </div>
                <div className={classes.rapperFooter}>
                     <Footer/>
                </div>
            </div>
        );
    }
}
Dashboard.propTypes={
    children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  openSidebar: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    showSideBar: PropTypes.func,
    hideSideBar: PropTypes.func,
  }),
}
const mapStateToProps=(state) =>{
    return {
        openSideBar: state.ui.showSideBar,
    };
}

const mapDispatchToProps=(dispatch) =>{
    return {
        uiActionCreators: bindActionCreators(uiActions, dispatch),
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
export default compose(
    withStyles(styles),
    withConnect,
)(
    Dashboard
);


