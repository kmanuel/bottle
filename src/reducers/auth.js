const defaultState = {};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const user = {
                username: action.payload.idToken.payload['cognito:username'],
                idToken: action.payload.idToken
            };
            return {user};
        case 'LOGOUT':
            return {};
        case 'SIGNUP':
            return {};
        case 'ACCOUNT_CONFIRMATION':
            return {};
        default:
            return state;
    }
};

export default auth;