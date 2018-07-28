import * as bottleService from '../services/bottleService';
import * as types from './types';

import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js'

const POOL_DATA = {
    UserPoolId: 'eu-central-1_qzW2Yhttl',
    ClientId: '36fglpg2fl2mldemfjltokr6qc'
};

const userPool = new CognitoUserPool(POOL_DATA);

const getAutoLoginSession = () => {
    const cognitoUser = userPool.getCurrentUser();

    return new Promise((resolve, reject) => {
        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    reject(err);
                }
                resolve(session);
            });
        }
    });
};

export const autoLogin = () => {
    return {
        type: types.AUTO_LOGIN,
        payload: getAutoLoginSession()
    }
};

export const loadBottles = () => {
    return {
        type: types.LOAD_BOTTLES,
        payload: bottleService.getBottles()
    };
};

export const login = (username, password, history) => {
    const authData = {
        Username: username,
        Password: password
    };

    const authDetails = new AuthenticationDetails(authData);

    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    const loginResultPromise = new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess (result) {
                history.push('/overview');
                resolve(result);
            },
            onFailure (error) {
                reject(error);
            }
        });
    });

    return {
        type: types.LOGIN,
        payload: loginResultPromise
    };
};

export const signup = (username, email, password, history) => {

    const emailAttribute = {
        Name: 'email',
        Value: email
    };

    const attrList = [];
    attrList.push(emailAttribute);

    const signupPromise = new Promise((resolve, reject) => {
        userPool.signUp(username, password, attrList, null, (err, result) => {
            if (err) {
                console.log('signup fail', err);
                reject(err);
            }
            resolve(result);
        });
    });

    history.push('/signup-confirm');

    return {
        type: types.SIGNUP,
        payload: signupPromise
    }
};

export const logout = (history) => {
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.signOut();
    }
    history.push('/');
    return {
        type: types.LOGOUT
    };
};

export const confirm = (username, code, history) => {
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    const confirmPromise = new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function(err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            history.push('/');
            resolve(result);
        });
    });

    return {
        type: types.ACCOUNT_CONFIRMATION,
        payload: confirmPromise
    };
};


export const createBottle = (title, body, position, author, history) => {
    return saveBottleAndLoad(title, body, position, author, history);
};

export const collectBottle = (bottleId, history) => {
    const currentUser = userPool.getCurrentUser();
    return bottleService.collectBottle(bottleId, currentUser.username)
        .then(this.loadBottles)
        .then(() => history.push('/overview'))
};

const saveBottleAndLoad = async (title, body, position, author, history) => {
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
    return {
        type: types.FETCH_COLLECTED_BOTTLES,
        payload: {user: userPool.getCurrentUser().getUsername()}
    };
};