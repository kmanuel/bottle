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
        lat: pos.lat,
        lng: pos.lng
    };

    bottles.push(newBottle);

    saveLocalStorage();

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
        .then(res => res.json())
        .then(data => {
            console.log('data received: ', data);
            return data.Items.map(bottleDto => {
                console.log('mapping bottleDto', bottleDto);
                return {
                    id: bottleDto.BottleId,
                    lat: parseFloat(bottleDto.lat.N),
                    lng: parseFloat(bottleDto.lng.N)
                }
            })
        });
};

export {createBottle, getBottles};