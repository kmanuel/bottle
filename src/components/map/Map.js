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
            }
        });

        this.props.markers.map(markerLocation => {
            new google.maps.Marker({
                position: {lat: markerLocation.lat, lng: markerLocation.lng},
                map: map,
                title: 'Hello World!'
            });
        });

        this.setState({
            gmap: map
        });
    }

    componentDidUpdate() {
        console.log('set center');
        const {lat, lng} = this.props;
        console.log(`set lat lng to : ${lat} ${lng}`);
        this.state.gmap.setCenter(new google.maps.LatLng( lat, lng ));
    }

    render() {
        console.log('render map');
        return <div ref="map" className="gmap-container">
            Map works!
        </div>;
    }
}

export default Map;