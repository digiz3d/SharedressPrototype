import React, { Component } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import TopMenuComponent from "../components/TopMenuComponent";
import firebase from 'react-native-firebase';
import strings from '../Language';

export default class SettingsScreen extends Component {
    componentWillMount() {
        // TODO: implement a real token verification and redirect to App if it is valid
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate("Auth");
            }
        });
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    logOut = () => {
        firebase.auth().signOut();
    }

    render () {
        return(
            <View style={styles.fullPage}>
                <CustomStatusBar color="white" />
                <SafeAreaView style={styles.top}>
                    <TopMenuComponent text={strings.settings}/>
                </SafeAreaView>
                <Button title="Logout" onPress={this.logOut}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullPage: {
        flex: 1,
        backgroundColor: "#efefef",
    },
    top: {
        //backgroundColor: "red",
        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        zIndex: 2,
        elevation: 2,
    },
    main: {
        flexGrow: 1,
        flexDirection: "row",
        zIndex: 1,
        elevation: 1,
    },
    loading: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    finished: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    },
    finishedText: {
        textAlign: "center",
        marginBottom: 20,
    },
});
