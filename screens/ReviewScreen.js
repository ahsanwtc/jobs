import React, { Component } from 'react';
import { View, Text, ScrollView, Linking, Platform } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Review Jobs',
        headerRight: <Button 
                        title="Settings" 
                        onPress={() => navigation.navigate("settings")} 
                        backgroundColor="rgba(0, 0, 0, 0)"
                        color="rgba(0, 122, 255, 1)"
                    />,
        tabBarLabel: 'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={25} color={tintColor} />;
        }
    });

    renderLikedJobs = () => {
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, url, longitude, latitude, 
                jobtitle, jobkey
            } = job;
            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };
            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === 'android'}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailsWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button title="Apply Now" backgroundColor="#03A9F4" onPress={() => Linking.openURL(url)} />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return(
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailsWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
};

const mapStateToProps = state => {
    return {
        likedJobs: state.likedJobs
    };
};
export default connect(mapStateToProps)(ReviewScreen);