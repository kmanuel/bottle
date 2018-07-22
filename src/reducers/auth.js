const defaultState = {};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const user = { username: action.payload.username };
            return {user};
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};

export default auth;