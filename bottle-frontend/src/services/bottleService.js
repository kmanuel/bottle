// const API_URL = 'https://j4mfxo6i2m.execute-api.eu-central-1.amazonaws.com/dev';
const API_URL = 'https://jf71y5a8ak.execute-api.eu-central-1.amazonaws.com/dev';

const saveBottle = (title, body, pos, author) => {
    const newBottle = {
        title,
        body,
        lat: pos.lat,
        lng: pos.lng,
        author
    };

    return fetch(`${API_URL}/bottles`,
        {
            method: 'POST',
            body: JSON.stringify(newBottle)
        })
        .then((res) => res)
        .catch(err => console.log(err));
};

const getBottles = () => {
    return fetch(`${API_URL}/bottles`)
        .then(res => res.json());
};

export {saveBottle, getBottles};
