import React, {Component} from 'react';
import Map from '../../components/map/Map';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import './Overview.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Overview extends Component {
    constructor(props) {
        super(props);

        this.showPosition = this.showPosition.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.state = {
            lat: 0,
            lng: 0
        };
    }

    showPosition(position) {
        const {latitude, longitude} = position.coords;

        this.setState({
            lat: latitude,
            lng: longitude
        });
    }

    positionError(position) {
        console.log(`positionError: `, position);
    }

    getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.showPosition, this.positionError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }


    render() {
        const classes = this.props;

        const {lat, lng} = this.state;

        const markers = [
            {lat: 48.223973, lng: 16.365172},
            {lat: 48.223404, lng: 16.367238}
        ];


        return (
            <div className="overview">
                <span className="overview-text">{markers.length} Bottles nearby!</span>
                <div className="map">
                    <Map lat={lat} lng={lng} zoom={15} markers={markers}/>
                </div>
                <Button
                    id="leave-bottle-btn"
                    className={classes.button}
                    variant="contained" color="primary">
                    Leave a bottle
                </Button>
                <Button onClick={this.getPosition}>
                    Position
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Overview);