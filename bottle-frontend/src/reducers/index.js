import { combineReducers } from 'redux';
import bottles from './bottles';
import auth from './auth';
import position from './position';

export default combineReducers({
    bottles,
    auth,
    position
});