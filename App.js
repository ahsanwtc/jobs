import React from 'react';
import { Notifications } from 'expo';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import registerForNotifications from './services/push-notifications';

export default class App extends React.Component {

    componentDidMount() {
        registerForNotifications();
        Notifications.addListener(notification => {
            console.log(notification);
            const { data: { text }, origin } = notification;


            if (origin === 'received' && text) {
                Alert.alert(
                    'New Push Notification',
                    text,
                    [{ text: 'OK' }]
                );
            }            
        });
    }
      
    render() {
        const MainNavigator = new TabNavigator({
            welcome: { screen: WelcomeScreen },
            auth: { screen: AuthScreen },
            main: {
                screen: TabNavigator({
                    map: { screen: MapScreen },
                    deck: { screen: DeckScreen },
                    review: {
                        screen: StackNavigator({
                            review: { screen: ReviewScreen },
                            settings: { screen: SettingsScreen }
                        })
                    }
                }, {
                    tabBarPosition: "bottom",
                    swipeEnabled: false,
                    tabBarOptions: {
                        showIcon: true,
                        labelStyle: { fontSize: 12 },
                        indicatorStyle: {
                            backgroundColor: "blue"
                        }
                    }
                })
            }
        }, {
            tabBarPosition: "bottom",
            tabBarOptions: {
                indicatorStyle: {
                    backgroundColor: "blue"
                }
            },
            navigationOptions: {
                tabBarVisible: false
            }
        });
    	return (
            <Provider store={store}>
                <View style={styles.container}>
				    <MainNavigator />
      		    </View>
            </Provider>    		
    	);
  	}
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: '#fff',
    	// alignItems: 'center',
        justifyContent: 'center',
        marginTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : undefined
  	},
});
