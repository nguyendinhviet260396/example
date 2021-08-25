import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import PropTypes from 'prop-types';

class SearchBox extends Component {
    render() {
        const {classes,handleChange} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                autoComplete="off"
                label="Search"
                margin="normal"
                className={classes.inputSearch}
                onChange={handleChange}
                placeholder="Nhập từ khóa..."
                />
            </form>
            
        );
    }
}

SearchBox.propTypes={
    classes:PropTypes.object,
    handleChange:PropTypes.func,
}

export default withStyles(styles)(SearchBox);