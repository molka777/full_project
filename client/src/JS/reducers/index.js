import { combineReducers } from 'redux';
import userReducer from './userReducer';
import { experiencesReducers } from './experienceReducers';

export default combineReducers({
    userReducer,
experiencesReducers
});
