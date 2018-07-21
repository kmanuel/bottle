const API_URL = 'https://j4mfxo6i2m.execute-api.eu-central-1.amazonaws.com/dev';


const defaultBottles = [
    {
        id: 0,
        position: {lat: 48.223973, lng: 16.365172}
    }, {
        id: 1,
        position: {lat: 48.223404, lng: 16.367238}
    }
];

const bottles = JSON.parse(window.localStorage.getItem('bottles')) || defaultBottles;

const saveLocalStorage = () => {
    window.localStorage.setItem('bottles', JSON.stringify(bottles));
};

const createBottle = (pos) => {
    const newBottle = {
        id: bottles.length,
        position: pos
    };

    bottles.push(newBottle);

    saveLocalStorage();

    fetch(`${API_URL}/bottles`,
        {
            method: 'POST',
            body: {newBottle}
        })
        .then((res) => console.log(res))
        .catch(err => console.log(err));

    return Promise.resolve(newBottle);
};

const getBottles = () => {
    return fetch(`${API_URL}/bottles`)
        .then(res => res.json())
        .then(data => data.bottles);
};

export {createBottle, getBottles};
