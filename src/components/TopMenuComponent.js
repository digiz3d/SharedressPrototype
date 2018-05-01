import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

export default class TopMenuComponent extends Component {
    render() {
        return (
            <View style={styles.menu}>
                <Text style={styles.title}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        //backgroundColor: "red",
    },
    title: {
        textAlign: "center",
        fontSize: 28,
    },
});
