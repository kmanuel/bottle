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

