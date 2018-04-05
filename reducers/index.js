import { combineReducers } from 'redux';
import auth from './auth-reducer';
import jobs from './job-reducer';
import likedJobs from './likes_reducer';

export default combineReducers({
    auth,
    jobs,
    likedJobs
});