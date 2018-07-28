import * as bottleService from '../services/bottleService';
import * as authService from '../services/authService';
import * as types from './types';

export const autoLogin = () => {
    return {
        type: types.AUTO_LOGIN,
        payload: authService.getAutoLoginSession()
    }
};

export const loadBottles = () => {
    return {
        type: types.LOAD_BOTTLES,
        payload: bottleService.getBottles()
    };
};

export const login = (username, password, history) => {
    const loginPromise = authService.login(username, password);

    history.push('/overview');

    return {
        type: types.LOGIN,
        payload: loginPromise
    };
};

export const signup = (username, email, password, history) => {

    const signupPromise = authService.signup(username, email, password);

    history.push('/signup-confirm');

    return {
        type: types.SIGNUP,
        payload: signupPromise
    }
};

export const logout = (history) => {
    authService.logout();
    history.push('/');
    return {
        type: types.LOGOUT
    };
};

export const confirm = (username, code, history) => {
    const confirmPromise = authService.confirm(username, code);
    history.push('/');
    return {
        type: types.ACCOUNT_CONFIRMATION,
        payload: confirmPromise
    };
};


export const createBottle = (title, body, position, author, history) => {
    return saveBottleAndLoad(title, body, position, author, history);
};

export const collectBottle = (bottleId, history) => {
    const currentUser = authService.getCurrentUser();
    return bottleService.collectBottle(bottleId, currentUser.username)
        .then(this.loadBottles)
        .then(() => history.push('/overview'))
};

const saveBottleAndLoad = async(title, body, position, author, history) => {
    await bottleService.saveBottle(title, body, position, author);
    const bottles = await loadBottles();
    history.push('/overview');
    return bottles;
};

export const updatePosition = (position) => {
    return {
        type: types.POSITION_UPDATE,
        payload: {position}
    };
};

export const fetchCollectedBottles = () => {
    const username = authService.getCurrentUser().getUsername();
    return {
        type: types.FETCH_COLLECTED_BOTTLES,
        payload: {user: username}
    };
};