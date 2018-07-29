const API_URL = 'https://jf71y5a8ak.execute-api.eu-central-1.amazonaws.com/dev';

const saveBottle = (bottle) => {
    return fetch(`${API_URL}/bottles`,
        {
            method: 'POST',
            body: JSON.stringify(bottle)
        })
        .then((res) => res)
        .catch(err => console.log(err));
};

const getBottles = () => {
    return fetch(`${API_URL}/bottles`)
        .then(res => res.json());
};

const collectBottle = (bottleId, collectedBy) => {
    return fetch(`${API_URL}/user/${collectedBy}/collected-bottles/${bottleId}`,
        {
            method: 'PUT'
        })
        .catch(err => console.log(err));
};

const findOne = (bottleId) => {
    return fetch(`${API_URL}/bottles/${bottleId}`);
};

export {saveBottle, getBottles, collectBottle, findOne};
