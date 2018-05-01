import React, { Component } from 'react';
import {
    PanResponder,
    Animated,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ClothCardComponent from "./ClothCardComponent";
import clamp from "../helpers/clamp";

const SWIPE_THRESHOLD = 120;
const ONGRAB_SCALE = 0.95;
const MINIMUM_SWIPE_VELOCITY = -5;

export default class SwipeUpComponent extends Component {
    static defaultProps = {
        card: {
            backgroundColor: "green"
        },
        handleSwipeUp: () => {
            console.log("swiped up");
        },
        onClickHandler: () => {
            console.log("clicked !");
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            card: this.props.card,
            scale: new Animated.Value(1),
            locked: false,
        };

        this.lastX = 0;
        this.lastY = 0;

        this.cardAnimation = null;

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (e, gestureState) => {
                if (!this.state.locked && (
                    Math.abs(gestureState.dx) > 3 ||
                    Math.abs(gestureState.dy) > 3)
                ) {
                    return true;
                }
                return false;
            },
            onPanResponderGrant: (e, gestureState) => {
                Animated.timing(this.state.scale, {
                    toValue: ONGRAB_SCALE,
                    duration: 100
                }).start();

                this.setState(state => {
                    return { dragging: true };
                });

                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value
                });

                this.state.pan.setValue({
                    x: 0,
                    y: 0
                });
            },
            onPanResponderTerminationRequest: (e, gestureState) => true,

            onPanResponderMove: (e, gestureState) => {
                Animated.event([
                    null,
                    {
                        dx: 0,
                        dy: this.state.pan.y
                    }
                ])(e, gestureState);
            },

            onPanResponderRelease: (e, gestureState) => {
                this.state.pan.flattenOffset();

                if (
                    Math.abs(gestureState.dx) <= 5 &&
                    Math.abs(gestureState.dy) <= 5
                ) {
                    //meaning the gesture did not cover any distance
                    this.props.onClickHandler(this.state.card);
                }

                let hasSwipedUp = gestureState.vy < -1 && gestureState.dy < SWIPE_THRESHOLD;

                //alert(gestureState.vy +" et "+gestureState.dy);

                const hasSwipedVertically =
                    Math.abs(this.state.pan.y._value) > SWIPE_THRESHOLD;

                if (hasSwipedUp) {
                    this.props.onSwipedUp(/*this.state.card*/);
                    // allows the card to go further than the screen
                    let velocityY = gestureState.vy < MINIMUM_SWIPE_VELOCITY ? gestureState.vy : MINIMUM_SWIPE_VELOCITY;

                    this.cardAnimation = Animated.decay(this.state.pan, {
                        velocity: { x: 0, y: velocityY },
                        deceleration: 0.99
                    });

                    this.cardAnimation.start(status => {
                        this._resetState();
                        this.cardAnimation = null;
                    });
                }
                else {
                    this._resetPan();
                    return;
                }
            }
        });
    }

    lock() {
        this.setState({locked: true});
    }

    _resetState() {
        /*
        Animated.timing(this.state.scale, {
            toValue: 1,
        }).start();

        this.state.pan.setValue({ x: 0, y: 0 });
        */
        this.props.swipedUp();
    }

    _resetPan() {
        Animated.timing(this.state.scale, {
            toValue: 1,
        }).start();
        Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 6
        }).start();
    }

    renderCard(txt, uri) {
        let { dragging, pan, enter } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        let scale = this.state.scale;
        let animatedCardStyles = {
            transform: [{ translateX }, { translateY }, { scale }]
        };

        return (
            <Animated.View
                key={"top"}
                style={[styles.swipeCard, animatedCardStyles]}
                {...this._panResponder.panHandlers}>
                <ClothCardComponent txt={txt} uri={uri} />
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={styles.swipeContainer}>
                {this.renderCard(this.props.name, this.props.image)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    swipeContainer: {
        flex: 1,
        //backgroundColor: "orange",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    swipeCard: {
        //backgroundColor: "green",
        flex: 1,
        height: 400
    }
});
