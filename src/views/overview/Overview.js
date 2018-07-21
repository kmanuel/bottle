import React, {Component} from 'react';
import Map from '../../components/map/Map';
import Button from '@material-ui/core/Button';
import getDistanceBetweenInMeters from '../../utils/distanceCalculator';
import {withStyles} from '@material-ui/core/styles';
import './Overview.css';

const METERS_10 = 10;

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Overview extends Component {
    constructor(props) {
        super(props);

        this.updatePosition = this.updatePosition.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.state = {
            lat: 0,
            lng: 0,
            bottlePositions: [
                {lat: 48.223973, lng: 16.365172},
                {lat: 48.223404, lng: 16.367238}
            ],
            onBottle: undefined
        };
    }

    checkDistanceToBottles(coords) {
        this.state.bottlePositions.map(bottlePosition => {
            const distance = getDistanceBetweenInMeters(coords, bottlePosition);
            if (distance < METERS_10) {
                if (!this.state.onBottle) {
                    this.setState({
                        onBottle: bottlePosition
                    })
                } else {
                    this.setState({
                        onBottle: undefined
                    })
                }
            }
            console.log('distance to bottle: ', distance);
        })
    }

    updatePosition(position) {
        const {latitude, longitude} = position.coords;

        this.checkDistanceToBottles({lat: latitude, lng: longitude});

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
            navigator.geolocation.watchPosition(this.updatePosition, this.positionError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }


    bottle() {
        if (this.state.onBottle) {
            return <div className="on-bottle bottle-image">
                ON BOTTLE
            </div>
        }
    }

    leaveButton(classes) {
        if (!this.state.onBottle) {
            return <Button
                id="leave-bottle-btn"
                className={classes.button}
                variant="contained" color="primary">
                Leave a bottle
            </Button>
        }
    }

    positionButton(classes) {
        if (!this.state.onBottle) {
            return <Button onClick={this.getPosition}>
                Position
            </Button>
        }
    }

    render() {
        const classes = this.props;

        const {lat, lng, bottlePositions} = this.state;

        return (
            <div className="overview">
                <span className="overview-text">{bottlePositions.length} Bottles nearby!</span>
                <div className="map">
                    <Map lat={lat} lng={lng} zoom={15} bottlePositions={bottlePositions}/>
                </div>
                {this.bottle()}
                {this.leaveButton(classes)}
                {this.positionButton(classes)}
            </div>
        );
    }
}

export default withStyles(styles)(Overview);