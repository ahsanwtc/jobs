import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, {backgroundColor: slide.color}]}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button title="Onwards!" 
                    raised 
                    buttonStyle={styles.buttonStyle} 
                    containerViewStyle={styles.containerViewStyle} 
                    onPress={this.props.onComplete}
                />
            );
        }
    }

    render() {
        return(
            <ScrollView horizontal pagingEnabled>
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: "#FFF"
    },
    buttonStyle: {
        backgroundColor: "#0288D1"
    },
    containerViewStyle: {
        marginTop: 15
    }
};

export default Slides;