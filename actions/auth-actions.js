import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAILED
} from './types';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb-token');
    if (token) {
        // dispatch an action saying fb login is done
        dispatch({
            type: FB_LOGIN_SUCCESS,
            payload: token
        });
    } else {
        // start up fb login process
        await doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('393226767808475', {
        permissions: ['public_profile']
    });

    if (type === "cancel") {
        return dispatch({ type: FB_LOGIN_FAILED });
    }

    await AsyncStorage.setItem('fb-token', token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
}
    


