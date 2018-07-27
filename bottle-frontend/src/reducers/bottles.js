const defaultState = {
    all: [],
    onMap: [],
    collectedBottles: [],
    droppedBottles: [],
    currBottle: {}
};

const mapToLocalBottles = (bottleDtos) => {
    return bottleDtos.Items.map(dto => {
        return {
            id: dto.bottleId.S,
            title: dto.title.S,
            body: dto.body.S,
            lat: parseFloat(dto.lat.N),
            lng: parseFloat(dto.lng.N),
            collectedBy: (dto.collectedBy && dto.collectedBy.S)
        };
    });
};

const bottles = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_BOTTLES':
            const local = mapToLocalBottles(action.payload.data);
            return {
                ...state,
                all: local,
                onMap: local.filter(b => !b.collectedBy)
            };
        case 'COLLECT_BOTTLE':
            return state;
        case 'FETCH_COLLECTED_BOTTLES':
            const username = action.payload.user;
            console.log('fetch collected reducer');
            console.log(state);
            const collectedBottles = state.all.filter(b => b.collectedBy === username);
            return {
                ...state,
                collectedBottles
            };
        default:
            return state;
    }
};

export default bottles;