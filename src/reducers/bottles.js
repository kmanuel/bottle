const defaultState = {
    all: [
        {id: 1, lat: 2, lng: 3, title: 'Hello World', body: 'lorem ipsum dolor sit amen'},
        {id: 2, lat: 3, lng: 4},
        {id: 3, lat: 4, lng: 5}
    ],
    onMap: [
        {id: 1, lat: 2, lng: 3},
        {id: 2, lat: 3, lng: 4},
        {id: 3, lat: 4, lng: 5}
    ],
    collectedBottles: [

    ],
    droppedBottles: [

    ]
};

const bottles = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_BOTTLES':
            return {
                ...state,
                onMap: action.payload
            };
        default:
            return state;
    }
};

export default bottles;