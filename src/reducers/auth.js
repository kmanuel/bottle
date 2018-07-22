const defaultState = {};

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('login with payload: ', action.payload);
            const user = {
                username: action.payload.idToken.payload['cognito:username'],
                idToken: action.payload.idToken
            };
            console.log('user', user);
            return {user};
        case 'LOGOUT':
            return {};
        case 'SIGNUP':
            console.log('signup', action.payload);
            return {};
        case 'ACCOUNT_CONFIRMATION':
            console.log('account confirmation reducer', action.payload);
            return {};
        default:
            return state;
    }
};

export default auth;