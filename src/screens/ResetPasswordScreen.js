import React, { Component } from 'react';
import { ActivityIndicator, Button, TextInput, TouchableHighlight, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

import CustomStatusBar from '../components/CustomStatusBar';
import BottomMenuComponent from "../components/BottomMenuComponent";

import api from "../Api";
import strings from "../Language";
import firebase from 'react-native-firebase';


export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { email: ''};
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
            console.warn('on a bien envoyé le mail de reset');
          }).catch(function(error) {
            console.warn(error);
          });
    }

    render() {
        return (
            <View style={styles.fullPage}>
                <CustomStatusBar />
                <SafeAreaView style={styles.registerBackground}>
                    <Text style={styles.title}>Prototype reset password</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder={strings.email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(txt) => { this.setState({ email: txt }) }}
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                        />
                        <View style={styles.resetButton}>
                            <Button onPress={this.resetPassword} title={strings.resetMyPassword} />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomMenu}>
                    <BottomMenuComponent
                        onPress={this.goBack}
                        question={strings.neverMind}
                        answer={strings.gotIt}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullPage: {
        flex: 1,
        backgroundColor: "#efefef",
    },
    registerBackground: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
    },
    bottomMenu: {
        zIndex: 2,
        elevation: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        shadowColor: "black",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        backgroundColor: "white",
    },
    form: {
        width: "100%",
        paddingHorizontal: 10,
    },
    textInput: {
        backgroundColor: "white",
        width: "100%",
        borderWidth: 0,
        borderRadius: 5,
        borderColor: "silver",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
    },
    resetButton: {
        height: 40,
    },
});