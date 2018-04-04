import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: "#03A9F4" },
    { text: 'Use this app to get a job', color: "#009688" },
    { text: 'Set your location, then swipe away', color: "#03A9F4" }
];

class WelcomeScreen extends Component {
    state = {
        token: null
    };

    onSlidesComplete = () => {
        this.props.navigation.navigate("auth");
    }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb-token');
        if (token) {
            this.props.navigation.navigate('map');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
        
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <ActivityIndicator size='large' style={styles} />;
        }
        return(
            <View style={{ flex: 1 }}>
                <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
            </View>
        );
    }
}

const styles = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
};

export default WelcomeScreen;