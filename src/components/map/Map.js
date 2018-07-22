import React, {Component} from 'react';
import './Map.css';

/*global google*/
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gmap: undefined
        }
    }

    componentDidMount() {
        const map = new google.maps.Map(this.refs.map, {
            zoom: this.props.zoom,
            center: {
                lat: this.props.lat,
                lng: this.props.lng
            },
            draggable: false,
            disableDefaultUI: true
        });

        this.setState({
            gmap: map
        });
    }

    componentDidUpdate() {
        const {lat, lng, onBottleClick} = this.props;
        this.state.gmap.setCenter(new google.maps.LatLng( lat, lng ));

        this.props.bottles.map(bottle => {
            const markerLocation = {
                lat: bottle.lat,
                lng: bottle.lng
            };
            const marker = new google.maps.Marker({
                position: {lat: markerLocation.lat, lng: markerLocation.lng},
                map: this.state.gmap,
                title: 'Hello World!'
            });

            google.maps.event.addListener(marker, 'click', function() {
                onBottleClick(bottle);
                // console.log('marker glick', bottle);
                // this.props.history.push(`/bottle/${bottle.id}`);
            });
        });
    }

    render() {
        return <div ref="map" className="gmap-container">
            Map works!
        </div>;
    }
}

export default Map;