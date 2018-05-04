import React, { Component } from 'react';
import { Animated, ActivityIndicator, Button, TextInput, TouchableHighlight, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

import CustomStatusBar from '../components/CustomStatusBar';
import BottomMenuComponent from "../components/BottomMenuComponent";

import api from "../Api";
import strings from "../Language";
import firebase from 'react-native-firebase';


export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            messageBoxHidden: true,
            messageBoxHeight: new Animated.Value(0),
            messageBoxOpacity: new Animated.Value(0),
            sucess: false
        };
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    resetPassword = () => {
        const email = this.state.email.trim();
        if (email !== "") {
            firebase.auth().sendPasswordResetEmail(email).then(() => {
                this.displayMessage(strings.resetPasswordEmailSent, true);
            }).catch((err) => {
                const { code, message } = err;
                this.displayMessage(code);
            });
        }
        else {
            this.displayMessage(strings.pleaseEnterValidEmail);
        }
    }

    displayMessage(message, success = false) {
        if (this.state.messageBoxHidden) {
            Animated.parallel([
                Animated.timing(
                    this.state.messageBoxHeight,
                    {
                        toValue: 40,
                        duration: 200
                    }
                ),
                Animated.timing(
                    this.state.messageBoxOpacity,
                    {
                        toValue: 1,
                        duration: 200
                    }
                )
            ]).start();
        }
        this.setState({ message, messageBoxHidden: false, success });
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
                        <Animated.View style={{
                            opacity: this.state.messageBoxOpacity,
                            height: this.state.messageBoxHeight,
                            marginBottom: 10,
                            justifyContent: 'center'
                        }}>
                            <Text>{this.state.message}</Text>
                        </Animated.View>
                        <View style={styles.resetButton}>
                            <Button onPress={this.resetPassword} title={strings.resetMyPassword} disabled={this.state.success} />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomMenu}>
                    <BottomMenuComponent
                        onPress={this.goBack}
                        question={this.state.success ? strings.nowYouCanConnect : strings.neverMind}
                        answer={this.state.success ? strings.withNewPassword : strings.gotIt}
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