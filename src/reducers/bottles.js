const defaultState = {
    all: [],
    collectedBottles: [],
    droppedBottles: []
};

const mapToLocalBottles = (bottleDtos) => {
    return bottleDtos.Items.map(dto => {
        return {
            id: dto.BottleId.S,
            title: dto.title.S,
            body: dto.body.S,
            lat: parseFloat(dto.lat.N),
            lng: parseFloat(dto.lng.N)
        };
    });
};

const bottles = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_BOTTLES':
            return {
                all: mapToLocalBottles(action.payload)
            };
        default:
            return state;
    }
};

export default bottles;