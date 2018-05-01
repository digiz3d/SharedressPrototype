import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

export default class ClothCardComponent extends Component {
    render() {
        return (
            <View style={styles.card}>
                <Image resizeMode="cover" style={styles.image} source={{uri:this.props.uri}} />
                {/*<Text style={styles.txt}>{this.props.txt}</Text>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 5,
        marginHorizontal: 2,
        marginVertical: 5,
        flex: 1,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    image: {
        borderRadius: 5,
        flex: 1
    },
    txt: {
        textAlign: "center"
    }
});
