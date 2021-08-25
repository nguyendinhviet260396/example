import React, { Component } from 'react';
import styles from './styles';
import { withStyles} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import {ADMIN_ROUTES} from './../../../constants/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types'; 
import {NavLink} from 'react-router-dom';

class Sidebar extends Component {
    toggleDrawer=(value)=>{
        const {onToggleSideBar} = this.props;
        if (onToggleSideBar) {
            onToggleSideBar(value);
        }
    };
    renderList(){
        let xhtml = null;
        const {classes}=this.props;
        xhtml = (
            <div className={classes.list}>
                <List component="div">
                    {ADMIN_ROUTES.map(item=>{
                        return(
                            <NavLink to={item.path} exact={item.exact} className={classes.itemLink}  key={item.path}>
                                <ListItem  className={classes.menuItem} button >
                                {item.name}
                                </ListItem>
                            </NavLink>
                        );
                    })}
                </List>
            </div>
        )
        return xhtml;
    }
    render() {
        const {openSideBar}=this.props;
        const {classes}=this.props;
        return (
            <Drawer
                open={openSideBar}
                onClose={()=>this.toggleDrawer(false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent">
                    {this.renderList()}
          </Drawer>
        );
    }
}
Sidebar.propTypes={
    classes:PropTypes.object,
}

export default withStyles(styles)(Sidebar);