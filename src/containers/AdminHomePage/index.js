import React, { Component } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
class AdminHomePage extends Component {
    render() {
        return (
            <div>
                <h1>Đây là trang quản trị</h1>
            </div>
        );
    }
}
export default withStyles(styles)(AdminHomePage);