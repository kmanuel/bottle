import * as bottleService from '../services/bottleService';

export const loadBottles = () => {
    return {
        type: 'LOAD_BOTTLES',
        payload: bottleService.getBottles()
    };
};

export const createBottle = (bottlePosition) => {
    return bottleService.createBottle(bottlePosition)
        .then(res => {
            return loadBottles();
        })
        .catch(err => console.log(err));
};

export const login = (username, password, history) => {
    history.push('/overview');
    return {
        type: 'LOGIN',
        payload: {
            username,
            password
        }
    };
};

export const logout = (history) => {
    history.push('/');
    return {
        type: 'LOGOUT'
    };
};