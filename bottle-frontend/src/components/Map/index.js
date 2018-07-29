import React, {Component} from 'react';
import './Map.css';

/*global google*/
class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gmap: undefined
        };

        this.markers = [];
    }

    clearOverlays() {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers.length = 0;
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
        this.state.gmap.setCenter(new google.maps.LatLng(lat, lng));

        this.clearOverlays();

        const icon = {
            url: 'https://s3.eu-central-1.amazonaws.com/com.mankru.site/bottle.png',
            scaledSize: new google.maps.Size(50, 50)
        };

        this.props.bottles.forEach(bottle => {
            const markerLocation = bottle.position;
            const marker = new google.maps.Marker({
                position: {lat: markerLocation.lat, lng: markerLocation.lng},
                map: this.state.gmap,
                title: 'Hello World!',
                icon: icon
            });
            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function () {
                onBottleClick(bottle);
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