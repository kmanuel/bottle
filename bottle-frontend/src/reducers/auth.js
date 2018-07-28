import * as types from '../actions/types';

const defaultState = {};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case types.LOGIN:
            const {payload} = action;
            if (payload.code) {
                return {
                    ...state,
                    loginStatus: 'wrongCredentials'
                };
            } else {
                const user = {
                    username: action.payload.idToken.payload['cognito:username'],
                    idToken: action.payload.idToken
                };
                return {user};
            }
        case types.AUTO_LOGIN:
            const user = {
                username: action.payload.idToken.payload['cognito:username'],
                idToken: action.payload.idToken
            };
            return {user};
        case types.LOGOUT:
            return {};
        case types.SIGNUP:
            return {};
        case types.ACCOUNT_CONFIRMATION:
            return {};
        default:
            return state;
    }
};

export default auth;