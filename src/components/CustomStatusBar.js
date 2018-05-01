import React from 'react';
import { Platform, StatusBar, View } from 'react-native';

const iOSversion = parseInt(Platform.Version, 10);
const isAndroid = Platform.OS == "android";

const CustomStatusBar = (props) => {
    let color = props.color ? props.color : "transparent";
    let height = 0;
    if (isAndroid) {
        height = 24;
    }
    else {
        if (iOSversion <= 10) {
            height = 20;
        }
    }

    if (height == 0) {
        return (
            <StatusBar
                translucent
                backgroundColor={color}
                barStyle="dark-content"
            />
        );
    }
    
    return (
        <View style={{ height: height, backgroundColor: color, zIndex: 3 }}>
            <StatusBar
                translucent
                backgroundColor={color}
                barStyle="dark-content"
            />
        </View>
    );

};

export default CustomStatusBar;