import React from 'react';
import Map from '../../components/map/Map';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import './Overview.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

const Overview = (props) => {
    const classes = props;
    return (
        <div className="overview">
            <span>2 Bottles nearby!</span>
            <Map />
            Overview
            <Button
                className={'login-form-button ' + classes.button}
                variant="contained" color="primary">
                Leave a bottle
            </Button>
        </div>
    );
};

export default withStyles(styles)(Overview);