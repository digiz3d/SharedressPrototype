import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { TabNavigator, StackNavigator, SwitchNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupParametersScreen from './screens/SignupParametersScreen';

import ClothesSwipeScreen from './screens/ClothesSwipeScreen';
import SettingsScreen from './screens/SettingsScreen';
import VouchersScreen from './screens/VouchersScreen';

import api from './Api';

function routeNameToIcon(routeName) {
    switch (routeName) {
        case 'Swipe': return 'ios-shirt';
        case 'Vouchers': return 'ios-school';
        case 'Settings': return 'ios-settings';
        default: return 'default-icon';
    }
}

// TODO: add a settings screen
const AppTab = TabNavigator(
    {
        Swipe: ClothesSwipeScreen,
        Vouchers: VouchersScreen,
        Settings: SettingsScreen,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor, focused }) => (<Ionicons size={24} name={routeNameToIcon(navigation.state.routeName)} color={tintColor} />)
        }),
        swipeEnabled: false,
        tabBarPosition: 'bottom',
        lazy: false,
        tabBarOptions: {
            renderIndicator: () => null, // disable the tab indicator on android
            upperCaseLabel: false,
            style: {
                backgroundColor: "white",
            },
            activeTintColor: "black",
            inactiveTintColor: "#444",
            showIcon: true,
            showLabel: false,
        }
    }
);
// TODO: add a sign-up screen
const AuthTab = StackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen,
        Signup2: SignupParametersScreen,
    },
    {
        headerMode: 'none', // we don't want a blank header
    });

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppTab,
        Auth: AuthTab,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);