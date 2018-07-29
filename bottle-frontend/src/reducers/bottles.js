import * as types from '../actions/types';
import Bottle from '../models/Bottle';

const defaultState = {
    all: [],
    onMap: [],
    collectedBottles: [],
    droppedBottles: [],
    currBottle: {}
};

const mapToLocalBottles = (bottleDtos) => {

    return bottleDtos.Items.map(dto => {
        return new Bottle(dto.title.S,
            dto.body.S,
            parseFloat(dto.lat.N),
            parseFloat(dto.lng.N),
            dto.author.S,
            dto.bottleId.S,
            (dto.collectedBy && dto.collectedBy.S)
        );
    });
};

const bottles = (state = defaultState, action) => {
    switch (action.type) {
        case types.LOAD_BOTTLES:
            const local = mapToLocalBottles(action.payload.data);
            return {
                ...state,
                all: local,
                onMap: local.filter(b => !b.isCollected()),
            };
        case types.COLLECT_BOTTLE:
            return state;
        case types.FETCH_COLLECTED_BOTTLES:
            const username = action.payload.user;
            const collectedBottles = state.all.filter(b => b.isCollectedBy(username));
            return {
                ...state,
                collectedBottles
            };
        default:
            return state;
    }
};

export default bottles;