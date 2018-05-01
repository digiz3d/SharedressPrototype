import React, { Component } from 'react';
import firebase from 'react-native-firebase';

import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';

export default class AuthLoadingScreen extends Component {
    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("App");
            }
            else {
                this.props.navigation.navigate("Auth");
            }
        });
    }
    
    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomStatusBar />
                <ActivityIndicator />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});