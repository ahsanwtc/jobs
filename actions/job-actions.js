import axios from 'axios';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const GOOGLE_API_KEY = 'AIzaSyB72ZnG5OWTAGqm_0Y_nSlvdRQeTlcoc0o';
const GEOCODE_ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?`;

const ROOT_URL = "http://api.indeed.com/ads/apisearch?";

const buildJobsUrl = zip => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${ROOT_URL}${query}`;
}

const buildGeocodeUrl = ({ longitude, latitude }) => {
    const query = qs.stringify({ key: GOOGLE_API_KEY, latlng: `${latitude},${longitude}` });
    return `${GEOCODE_ROOT_URL}${query}`;
};

const reverseGeoCode = async region => {
    const url = buildGeocodeUrl(region);
    let { data } = await axios.get(url);
    
    if (data.error_message) {
        throw new Error(data.error_message);
    }
    
    const { results } = data;
    
    if (results.length === 0) {
        throw new Error('No Results');
    }
    
    const postCode = results[0].address_components.find(
        component => component.types[0] === 'postal_code'
    );
    
    if (!postCode) {
        throw new Error('No Postcode');
    }
    
    return postCode.long_name || postCode.short_name;
};

export const fetchJobs = (region, callback) => async dispatch => {
    try {
        let zip = await reverseGeoCode(region);
        const url = buildJobsUrl(zip);        
        let { data }  = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        callback();
    } catch(e) {
        console.error(e);
    }    

};

export const likeJob = job => {
    return {
        payload: job,
        type: LIKE_JOB
    };
};

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS };
}

