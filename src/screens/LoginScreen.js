import React, { Component } from 'react';
import { ActivityIndicator, Button, TextInput, TouchableHighlight, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

import CustomStatusBar from '../components/CustomStatusBar';
import BottomMenuComponent from "../components/BottomMenuComponent";

import api from "../Api";
import strings from "../Language";
import firebase from 'react-native-firebase';

const facebookLogin = async (onSuccess) => {
    try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw new Error('User cancelled request'); // Handle this however fits the flow of your app
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        console.info(JSON.stringify(currentUser.user.toJSON()));
        onSuccess();
    } catch (e) {
        console.error(e);
    }
}


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', loading: false };
    }

    goToResetPassword = () => {
        this.props.navigation.navigate("ResetPassword")
    }
    gotoSignup = () => {
        this.props.navigation.navigate("Signup");
    }

    login = () => {
        this.setState({ loading: true });
        const { email, password } = this.state;
        if (email !== "" && password !== "") {
            firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password).then((user) => {
                if (user) {
                    this.props.navigation.navigate("App");
                }
                else {
                    this.setState({ loading: false });
                }
            }).catch((error) => {
                console.warn(error);
                this.setState({ loading: false });
            });
        }
        else {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.fullPage} enabled behavior="padding">
                <CustomStatusBar />
                <SafeAreaView style={styles.registerBackground}>
                    <Text style={styles.title}>Prototype login</Text>
                    <View style={styles.form}>
                        <TextInput
                            placeholder={strings.email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(txt) => { this.setState({ email: txt }) }}
                            style={styles.textInput}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            placeholder={strings.password}
                            onChangeText={(txt) => { this.setState({ password: txt }) }}
                            style={[styles.textInput,{marginBottom: 0}]}
                            underlineColorAndroid="transparent"
                            secureTextEntry
                        />
                        <TouchableHighlight
                            onPress={this.goToResetPassword}
                            activeOpacity={0.6}
                            underlayColor="transparent"
                            style={styles.forgotPassword}
                        >
                            <Text style={styles.forgotPasswordText}>{strings.forgotPassword}</Text>
                        </TouchableHighlight>
                        <View style={styles.loginButton}>
                            <Button
                                onPress={this.login}
                                title={this.state.loading ? strings.loggingYouIn : strings.login}
                            />
                        </View>
                        <View style={styles.fbSeparator}>
                            <View style={styles.fbSeparatorLine} />
                            <Text style={styles.fbSeparatorOR}>{strings.or}</Text>
                            <View style={styles.fbSeparatorLine} />
                        </View>
                        <View style={styles.loginButton}>
                            <Button onPress={() => {
                                try {
                                    facebookLogin(() => {
                                        this.props.navigation.navigate("App");
                                    });
                                }
                                catch (err) {
                                    console.warn(err);
                                }
                            }} title={strings.loginWithFacebook} />
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={styles.bottomMenu}>
                    <BottomMenuComponent
                        onPress={this.gotoSignup}
                        question={strings.dontHaveAnAccount}
                        answer={strings.signUp}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
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
    loginButton: {
        height: 40,
    },
    forgotPassword: {
        //backgroundColor: "orange",
        alignSelf: 'flex-end',
        height: 30,
        justifyContent: 'center'
    },
    forgotPasswordText: {
        fontSize: 11
    },
    fbSeparator: {
        //backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    fbSeparatorOR: {
        //backgroundColor: "blue",
        paddingHorizontal: 10,
        color: "#999",
    },
    fbSeparatorLine: {
        //backgroundColor: "transparent",
        borderBottomWidth: 0.5,
        borderColor: "#999",
        flexGrow: 1,
        height: 5,
    },
});