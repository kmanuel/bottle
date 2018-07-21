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
    const lat = 48.223973;
    const lng = 16.365172;
    const markers = [
        {lat: 48.223973, lng: 16.365172},
        {lat: 48.223404, lng: 16.367238}
    ];
    return (
        <div className="overview">
            <span className="overview-text">2 Bottles nearby!</span>
            <div className="map">
            <Map lat={lat} lng={lng} zoom={15} markers={markers} />
            </div>
            <Button
                id="leave-bottle-btn"
                className={classes.button}
                variant="contained" color="primary">
                Leave a bottle
            </Button>
        </div>
    );
};

export default withStyles(styles)(Overview);