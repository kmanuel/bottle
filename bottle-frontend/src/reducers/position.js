import * as types from '../actions/types';

const defaultState = {
    lat: 0,
    lng: 0
};

const position = (state = defaultState, action) => {
    switch (action.type) {
        case types.POSITION_UPDATE:
            return {
                lat: action.payload.position.coords.latitude,
                lng: action.payload.position.coords.longitude
            };
        default:
            return state;
    }
};

export default position;