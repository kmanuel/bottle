const defaultState = {
    all: [
        // {id: 1, lat: 2, lng: 3, title: 'Hello World', body: 'lorem ipsum dolor sit amen'},
        // {id: 2, lat: 3, lng: 4},
        // {id: 3, lat: 4, lng: 5}
    ],
    collectedBottles: [

    ],
    droppedBottles: [

    ]
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