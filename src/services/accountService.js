const admin = {
    username: 'admin',
    bottlesCollected: [],
    email: 'admin@admin.com'
};

let currentUser;

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username === 'admin'
            && password === 'admin') {
            currentUser = admin;
            resolve(admin);
        }
        reject('invalid credentials');
    })
};

const getCurrentUser = () => {
    return currentUser;
};

export {login, getCurrentUser};