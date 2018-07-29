import distanceBetween from '../utils/distanceCalculator';

function Bottle(title, body, lat, lng, author, id, collectedBy) {

    this.id = id;
    this.collectedBy = collectedBy;
    const self = this;

    const isCollected = function() {
        return self.collectedBy;
    };

    const setCollector = function(collector) {
        self.collectedBy = collector;
    };

    const isCollectedBy = function(collector) {
        return self.collectedBy === collector;
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
        isCollected,
        setCollector,
        isCollectedBy,
        meterDistanceFrom
    };
}

export default Bottle;