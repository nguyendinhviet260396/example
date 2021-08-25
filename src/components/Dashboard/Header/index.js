import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileMoreAnchorEl:null,
            anchorEl:null,
            number:Math.floor((Math.random() * 10) + 1),
        }
    }
    handleProfileMenuOpen=(e)=>{
        this.setState({
            mobileMoreAnchorEl:e.currentTarget,
        });    
    }
    handleMobileMenuOpen=(e)=>{
        console.log('handleMobileMenuOpen');
        this.setState({
            anchorEl:e.currentTarget,
        }); 
    }
    handleMobileMenuClose=()=>{
        console.log('handleMobileMenuClose');
        this.setState({
            mobileMoreAnchorEl:null,
        }); 
    }
    handleMenuClose=(e)=>{
        console.log('handleMenuClose');
        this.setState({
            anchorEl:null,
        }); 
    }
    handleLogout=()=>{
        console.log(this.props);
        const {history}=this.props;
        if (history){
            history.push('/login');
        }
        
    }
    renderMobileMenu =()=> {
        const {mobileMoreAnchorEl}=this.state;
        const isMobileMenuOpen=Boolean(mobileMoreAnchorEl);
        return(
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
                >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
                <MenuItem onClick={this.handleLogout} >
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        >
                        <AccountCircle />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </Menu>
        );
    };
    renderMenu =()=>{
        const {anchorEl}=this.state;
        const isMenuOpen= Boolean(anchorEl);
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
                >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );
    };
    
    handleToggleSideBar=()=>{
        const {onToggleSideBar,openSideBar} = this.props;
        if (onToggleSideBar){
            onToggleSideBar(!openSideBar);
        }
    }
    render() {
        let {number} =this.state;
        const {classes,name}=this.props;
        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleToggleSideBar}
                            >
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <Typography className={classes.title} variant="h6" noWrap>
                            {name}
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={number} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={number} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                                >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                    {this.renderMobileMenu()}
                    {this.renderMenu()}
            </div>
        );
    }
}

Header.propTypes={
    mobileMoreAnchorEl:PropTypes.bool,
    anchorEl:PropTypes.bool,
    name:PropTypes.string,
    classes:PropTypes.object,
}
const mapStateToProps=null;
const mapDispatchToProps=null;
const withConnect=connect(mapDispatchToProps,mapStateToProps);
export default compose(
    withStyles(styles),
    withConnect,
    withRouter,
)(Header);
