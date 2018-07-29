import distanceBetween from '../utils/distanceCalculator';

function Bottle(title, body, lat, lng, author, id, collectedBy) {

    this.id = id;

    const isCollected = function() {
        return this.collectedBy;
    };

    const setCollector = function(collector) {
        this.collectedBy = collector;
    };

    const isCollectedBy = function(collector) {
        return this.collectedBy === collector;
    };

    const meterDistanceFrom = function(position) {
        return Math.ceil(distanceBetween(this.position, position));
    };

    return {
        id: this.id,
        title,
        body,
        position: {
            lat,
            lng
        },
        author,
        collectedBy,
        isCollected,
        setCollector,
        isCollectedBy,
        meterDistanceFrom
    };
}

export default Bottle;