import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Map from '../../components/Map';
import Button from '@material-ui/core/Button';
import getDistanceBetweenInMeters from '../../utils/distanceCalculator';
import {withStyles} from '@material-ui/core/styles';
import './Overview.css';
import {updatePosition, loadBottles} from '../../actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class Overview extends Component {
    constructor(props) {
        super(props);

        this.getPosition = this.getPosition.bind(this);
        this.isCloserThan100Meters = this.isCloserThan100Meters.bind(this);

        this.props.loadBottles();
    }

    componentDidMount() {
        this.getPosition();
    }

    getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.props.updatePosition, console.log);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    isCloserThan100Meters(bottle) {
        const position = {
            lat: this.props.lat,
            lng: this.props.lng
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

    onBottleClick(bottle) {
        this.props.history.push(`/bottle/${bottle.id}`);
    }

    render() {
        const classes = this.props;
        const {bottles} = this.props;
        const userLocation = {
            lat: this.props.lat,
            lng: this.props.lng
        };

        let nearbyBottles = bottles.filter(b => b.meterDistanceFrom(userLocation) < 100);

        return (
            <div className="overview">
                <span className="overview-text">
                    {nearbyBottles.length} Bottles nearby!
                </span>
                <div className="map">
                    <Map lat={this.props.lat}
                         lng={this.props.lng}
                         zoom={16}
                         bottles={nearbyBottles}
                         onBottleClick={(bottle) => this.onBottleClick(bottle)}/>
                </div>
                <div id="bottom-buttons">
                    <Link to="/create/bottle">
                        <Button
                            id="leave-bottle-btn"
                            className={classes.button}
                            variant="contained" color="primary">
                            Leave a bottle
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bottles: state.bottles.onMap,
        lat: state.position.lat,
        lng: state.position.lng
    };
};

export default connect(mapStateToProps, {loadBottles, updatePosition})(withStyles(styles)(Overview));