import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default class BottomMenuComponent extends Component {
    constructor(props) {
        super(props);
    }
    onPressAction = () => {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.onPressAction}>
                <View style={styles.menu}>
                    <Text>{this.props.question} </Text>
                    <Text style={styles.link}>{this.props.answer}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    link: {
        fontWeight: 'bold',
    },
});

