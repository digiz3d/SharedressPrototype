import React, { Component } from 'react';
import { ActivityIndicator, Button, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomStatusBar from '../components/CustomStatusBar';
import ClothCardComponent from "../components/ClothCardComponent";
import SwipeUpComponent from "../components/SwipeUpComponent";
import TopMenuComponent from "../components/TopMenuComponent";
import api from "../Api";
import strings from "../Language";


export default class ClothesSwipeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextItemsLoaded: false,
            set: [],
            finished: false,
        };

        this.firstCardRef = null;
        this.secondCardRef = null;
    }

    componentDidMount() {
        api.getNextSet().then((val) => {
            this.setState({ set: val, nextItemsLoaded: true })
        }).catch((reason) => {
            alert(reason);
        });
    }

    restartApi = () => {
        api.resetQueue();
        this.setState({ finished: false });
        this.swipedUp();
    }

    swipedUp = () => {
        this.setState({
            nextItemsLoaded: false
        });

        api.getNextSet().then((val) => {
            this.setState({ set: val,
                nextItemsLoaded: true,
                finished: false,
            });
        }).catch((reason) => {
            this.setState({ finished: true });
        });
    }

    lockFirstCard = () => {
        if (this.firstCardRef) {
            this.firstCardRef.lock();
            //console.warn("locked first card");
        }
        //console.warn("AFTER locked first card");
    }

    lockSecondCard = () => {
        if (this.secondCardRef) {
            this.secondCardRef.lock();
            //console.warn("locked second card");
        }
        //console.warn("AFTER locked second card");
    }

    renderSwipeUpComponents() {
        return (
            <SafeAreaView style={styles.main}>
                <SwipeUpComponent
                    swipedUp={this.swipedUp}
                    id={this.state.set[0].id}
                    name={this.state.set[0].name}
                    image={this.state.set[0].image}
                    onSwipedUp={this.lockSecondCard}
                    ref={(r) => this.firstCardRef = r}
                />
                <SwipeUpComponent
                    swipedUp={this.swipedUp}
                    id={this.state.set[1].id}
                    name={this.state.set[1].name}
                    image={this.state.set[1].image}
                    onSwipedUp={this.lockFirstCard}
                    ref={(r) => this.secondCardRef = r}
                />
            </SafeAreaView>
        );
    }

    render() {
        if (this.state.finished) {
            return (
                <View style={styles.fullPage}>
                    <CustomStatusBar color="white"/>
                    <SafeAreaView style={styles.top}>
                        <TopMenuComponent text={strings.titleSwipe} />
                    </SafeAreaView>
                    <SafeAreaView style={styles.finished}>
                        <Text style={styles.finishedText}>Fini ! à la prochaine. 😉</Text>
                        <Button
                            title="Recommencer"
                            onPress={this.restartApi}
                        />
                    </SafeAreaView>
                </View>
            );
        }

        if (!this.state.nextItemsLoaded) {
            return (
                <View style={styles.fullPage}>
                    <CustomStatusBar color="white"/>
                    <SafeAreaView style={styles.top}>
                        <TopMenuComponent text={strings.titleSwipe} />
                    </SafeAreaView>
                    <SafeAreaView style={styles.loading}>
                        <ActivityIndicator size="large" color="#000" />
                    </SafeAreaView>
                </View>
            );
        }

        return (
            <View style={styles.fullPage}>
                <CustomStatusBar color="white" />
                <SafeAreaView style={styles.top}>
                    <TopMenuComponent text={strings.titleSwipe} />
                </SafeAreaView>
                {this.renderSwipeUpComponents()}
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
