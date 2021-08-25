import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <footer className={classes.Footer}>
                <span className={classes.itemContent}>Developed by VietNguyen @</span>
                <span className={classes.itemContent}><a href="mailto:vietnguyen940@gmail.com">vietnguyen940@gmail.com</a></span>
            </footer>
        );
    }
}
export default withStyles(styles)(Footer);