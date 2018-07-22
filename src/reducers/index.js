import { combineReducers } from 'redux';
import bottles from './bottles';
import auth from './auth';

export default combineReducers({
    bottles,
    auth
});