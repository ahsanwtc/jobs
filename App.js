import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

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
                    tabBarOptions: {
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
            }
        });
    	return (

    		<View style={styles.container}>
				<MainNavigator />
      		</View>
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
