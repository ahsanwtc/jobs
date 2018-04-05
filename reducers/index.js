import { combineReducers } from 'redux';
import auth from './auth-reducer';
import jobs from './job-reducer';

export default combineReducers({
    auth,
    jobs
});