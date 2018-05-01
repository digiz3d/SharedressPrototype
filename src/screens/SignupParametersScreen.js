import React, { Component } from 'react';
import { Button, Picker, Text, SafeAreaView, StyleSheet, View } from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import BottomMenuComponent from "../components/BottomMenuComponent";
import api from "../Api";
import strings from "../Language";

const MIN_AGE = 13;
const MAX_AGE = 120;

export default class SignupParametersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: "female",
            age: 24
        };
    }

    onSelectAgeAndSex = () => {

    }

    goToLogin = () => {
        this.props.navigation.navigate("Login");
    }

    submit = () => {
        api.setAge(this.state.age);
        api.setSex(this.state.sex);

        let ok = false;

        if (api.isSexOk() && api.isAgeOk()) {
            ok = true;
        }

        if (ok) {
            this.props.navigation.navigate("App");
        }
    }

    renderAgePicker() {
        let pickers = [];
        for (let i = MIN_AGE; i < MAX_AGE; i++) {
            pickers.push(<Picker.Item key={"Pickeritem-"+i.toString()} label={i.toString()} value={i.toString()} />);
        }

        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.age.toString()}
                onValueChange={
                    (itemValue, itemIndex) => {
                        this.setState({ age: parseInt(itemValue) })
                    }} >
                {pickers}
            </Picker>
        )
    }

    renderSexPicker() {
        return (
            <Picker
                mode="dropdown"
                selectedValue={this.state.sex}
                onValueChange={(itemValue, itemIndex) => this.setState({ sex: itemValue })}
            >
                <Picker.Item label={strings.parametersFemale} value="female" />
                <Picker.Item label={strings.parametersMale} value="male" />
            </Picker>
        );
    }
    
    render() {
        return (
            <View style={styles.fullPage}>
                <CustomStatusBar />
                <SafeAreaView style={styles.registerBackground}>
                    <Text style={styles.title}>Prototype signup parameters</Text>
                    <View style={styles.form}>
                        {this.renderAgePicker()}
                        {this.renderSexPicker()}
                        <Button
                            onPress={this.submit}
                            title={strings.submit}
                        />
                    </View>  
                </SafeAreaView>
                <SafeAreaView style={styles.bottomMenu}>
                    <BottomMenuComponent
                        onPress={this.goToLogin}
                        question={strings.signupalready}
                        answer={strings.answerLogin}
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
    title : {
        fontSize: 30,
    },
    bottomMenu: {
        zIndex: 2,
        elevation: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        shadowColor: "black",
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.1,
        shadowRadius: 1,
        backgroundColor: "white",
    },
    form : {
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
});