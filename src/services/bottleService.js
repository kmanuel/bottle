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

    return Promise.resolve(newBottle);
};

const getBottles = () => {
    return Promise.resolve(bottles);
};

export {createBottle, getBottles};
