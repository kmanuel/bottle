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

export const getAutoLoginSession = () => {
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

export const signup = (username, email, password) => {
    const emailAttribute = {
        Name: 'email',
        Value: email
    };

    const attrList = [];
    attrList.push(emailAttribute);

    const signupPromise = new Promise((resolve, reject) => {
        userPool.signUp(username, password, attrList, null, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });

    return signupPromise;
};

export const login = (username, password) => {
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
                resolve(result);
            },
            onFailure (error) {
                reject(error);
            }
        });
    });

    return loginResultPromise;
};

export const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.signOut();
    }
};

export const confirm = (username, code) => {
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    const confirmPromise = new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });

    return confirmPromise;
};

export const getCurrentUser = () => {
    return userPool.getCurrentUser();
};