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

        this.updatePosition = this.updatePosition.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.viewBottle = this.viewBottle.bind(this);
        this.isCloserThan100Meters = this.isCloserThan100Meters.bind(this);

        this.state = {
            onBottle: undefined
        };

        this.props.loadBottles();
    }

    updatePosition(position) {
        this.props.updatePosition(position);
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
            return <Link to="/create/bottle">
                <Button
                    id="leave-bottle-btn"
                    className={classes.button}
                    variant="contained" color="primary">
                    Leave a bottle
                </Button>
            </Link>
        }
    }

    positionButton() {
        if (!this.state.onBottle) {
            return <Button onClick={this.getPosition}>
                Position
            </Button>
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

        let nearbyBottles = [];
        if (bottles) {
            nearbyBottles = bottles.filter(this.isCloserThan100Meters);
        }

        return (
            <div className="overview">
                <span className="overview-text">{nearbyBottles.length} Bottles nearby!</span>
                <div className="map">
                    <Map lat={this.props.lat} lng={this.props.lng} zoom={16} bottles={nearbyBottles}
                         onBottleClick={(bottle) => this.onBottleClick(bottle)}/>
                </div>
                {this.bottle()}
                {this.leaveButton(classes)}
                {this.positionButton(classes)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bottles: state.bottles.all,
        lat: state.position.lat,
        lng: state.position.lng
    };
};

export default connect(mapStateToProps, {loadBottles, updatePosition})(withStyles(styles)(Overview));