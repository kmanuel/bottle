import React, {Component} from 'react';
import './Map.css';

/*global google*/
class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const map = new google.maps.Map(this.refs.map, {
            zoom: this.props.zoom,
            center: {
                lat: this.props.lat,
                lng: this.props.lng
            }
        });

        this.props.markers.map(markerLocation => {
            new google.maps.Marker({
                position: {lat: markerLocation.lat, lng: markerLocation.lng},
                map: map,
                title: 'Hello World!'
            });
        })
    }

    render() {
        return <div ref="map" className="gmap-container">
            Map works!
        </div>;
    }
}

export default Map;