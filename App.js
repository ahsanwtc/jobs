import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
      
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
