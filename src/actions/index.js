import * as bottleService from '../services/bottleService';

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
        type: 'LOGIN',
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
        type: 'SIGNUP',
        payload: signupPromise
    }
};

export const logout = (history) => {
    history.push('/');
    return {
        type: 'LOGOUT'
    };
};

export const confirm = (username, code, history) => {
    console.log('confirm action', {username, code});

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
        type: 'ACCOUNT_CONFIRMATION',
        payload: confirmPromise
    };
};