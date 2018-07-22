import React, {Component} from 'react';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import Button from '@material-ui/core/Button';
import getDistanceBetweenInMeters from '../../utils/distanceCalculator';
import {withStyles} from '@material-ui/core/styles';
import './Overview.css';
import * as actions from '../../actions'

import { createBottle } from '../../actions';

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
        this.viewBottle = this.viewBottle.bind(this);
        this.isCloserThan100Meters = this.isCloserThan100Meters.bind(this);

        this.state = {
            lat: 0,
            lng: 0,
            onBottle: undefined
        };

        this.props.dispatch(actions.loadBottles());
    }

    checkDistanceToBottles(coords) {
        this.props.bottles.map(bottle => {
            const bottlePosition = {
                lat: bottle.lat,
                lng: bottle.lng
            };
            const distance = getDistanceBetweenInMeters(coords, bottlePosition);
            if (distance < METERS_10) {
                if (!this.state.onBottle) {
                    // TODO temporary disable this
                    // this.setState({
                    //     onBottle: bottle
                    // })
                } else {
                    this.setState({
                        onBottle: undefined
                    })
                }
            }
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

    viewBottle() {
        this.props.history.push(`/bottle/${this.state.onBottle.id}`);
    }

    bottle() {
        if (this.state.onBottle) {
            return <div className="on-bottle bottle-image"
                        onClick={this.viewBottle}>
            </div>
        }
    }

    leaveButton(classes) {
        if (!this.state.onBottle) {
            return <Button
                id="leave-bottle-btn"
                className={classes.button}
                variant="contained" color="primary"
                onClick={() => this.leaveBottle()}>
                Leave a bottle
            </Button>
        }
    }

    leaveBottle() {
        const {lat, lng} = this.state;

        const bottlePosition = {
            lat, lng
        };

        this.props.dispatch(createBottle(bottlePosition));
    }

    positionButton(classes) {
        if (!this.state.onBottle) {
            return <Button onClick={this.getPosition}>
                Position
            </Button>
        }
    }

    isCloserThan100Meters(bottle) {
        const position = {
            lat: this.state.lat,
            lng: this.state.lng
        };

        if (bottle) {
            const bottlePosition = {
                lat: bottle.lat,
                lng: bottle.lng
            };
            const distance = getDistanceBetweenInMeters(position, bottlePosition);

            return distance < 100;
        }
    }

    render() {
        const classes = this.props;

        const {lat, lng} = this.state;
        const {bottles} = this.props;

        let nearbyBottles = [];
        if (bottles) {
            nearbyBottles = bottles.filter(this.isCloserThan100Meters);
        }

        return (
            <div className="overview">
                <span className="overview-text">{nearbyBottles.length} Bottles nearby!</span>
                <div className="map">
                    <Map lat={lat} lng={lng} zoom={16} bottles={nearbyBottles}/>
                </div>
                {this.bottle()}
                {this.leaveButton(classes)}
                {this.positionButton(classes)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {bottles: state.bottles.onMap};
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Overview));