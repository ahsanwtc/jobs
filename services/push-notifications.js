import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    let ptoken = await AsyncStorage.getItem('pushtoken');
    if (ptoken) {
        console.log("token", ptoken);
        return;
    } else {
        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
        if (status !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        await axios.post(PUSH_ENDPOINT, { token: { token } });
        await AsyncStorage.setItem('pushtoken', token);
    }
}