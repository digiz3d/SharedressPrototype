import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

export default class VoucherComponent extends Component {
    render() {
        return (
            <View style={styles.horizontalCard}>
                <View style={styles.textContainer}>
                    <Text style={styles.brandText}>{this.props.name}</Text>
                        <Text style={styles.promoText}>{this.props.value}</Text>
                </View>
                <View style={styles.logoContainer}>
                    <Image resizeMode="contain" style={styles.image} source={{ uri: this.props.logo }} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    horizontalCard: {
        //backgroundColor: "red",
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: "row",
        flex: 1,
        justifyContent : "space-between",
    },
    brandText: {
        fontSize: 18,
    },
    promoText: {
        fontSize: 26,
    },
    textContainer: {
        //backgroundColor: "green",
        padding: 5,
        justifyContent : "space-between",
    },
    logoContainer: {
        //backgroundColor: "orange",
        height: 80,
        width: "20%",
        padding: 5,
    },
    image : {
        flex: 1,
    }
});