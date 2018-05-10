import React from 'react';
import { KeyboardAvoidingView , Platform} from 'react-native';

const CustomKeyboardAvoidingView = ({style, children}) => (
    <KeyboardAvoidingView style={style} enabled={Platform.OS === 'android'?false:true} behavior="padding">{children}</KeyboardAvoidingView>
);

export default CustomKeyboardAvoidingView;