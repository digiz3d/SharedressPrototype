import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, Picker, Text, SafeAreaView, StyleSheet, View } from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import TopMenuComponent from "../components/TopMenuComponent";
import BottomMenuComponent from "../components/BottomMenuComponent";
import VoucherComponent from "../components/VoucherComponent";
import api from "../Api";
import strings from "../Language";

export default class VouchersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            vouchers: []
        };
    }

    componentDidMount() {
        api.getMyVouchers().then((val) => {
            this.setState({ vouchers: val, loaded: true });
        })
    }

    renderVouchersComponents() {
        return (
            <FlatList 
                style={{flex: 1}}
                data={this.state.vouchers}
                renderItem={({item}) => <VoucherComponent
                    id={item.id}
                    name={item.name}
                    value={item.value}
                    logo={item.logo}
                />}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }

    render() {
        if (!this.state.loaded) {
            return (
                <SafeAreaView style={styles.fullPage}>
                    <CustomStatusBar color="white" />
                    <ActivityIndicator size="large" color="#000" />
                </SafeAreaView>
            );

        }
        return (
            <View style={styles.fullPage}>
                <CustomStatusBar color="white" />
                <SafeAreaView style={styles.top}>
                    <TopMenuComponent text={strings.voucher} />
                </SafeAreaView>
                {this.renderVouchersComponents()}
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
        zIndex: 2,
        elevation: 2,
    },
    main: {
        flexGrow: 1,
        flexDirection: "column",
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
    bottom: {
        //backgroundColor: "yellow",
        backgroundColor: "#fff",
        zIndex: 2,
        elevation: 10,
    },
});
