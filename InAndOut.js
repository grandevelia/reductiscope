import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class InAndOut extends Component {
    constructor(props) {
        super(props);
        let state = {};

        props.animations.forEach((anim, i) => {
            let key = anim.key;
            if (typeof anim.start === "number") {
                state[key] = new Animated.Value(anim.start);
            } else {
                state[key] = new Animated.Value(0) //For strings, use interpolate from 0 to 1
            }
        });
        state['prevDir'] = "backward";
        state['direction'] = props.direction;
        this.state = state;
    }
    componentDidMount() {
        this._updateAnimation(this.props.direction);
    }
    componentDidUpdate(oldProps) {
        let direction = this.props.direction;
        if (oldProps.direction !== direction) {
            let prevDir = this.state.direction;
            this.setState({
                prevDir: prevDir,
                direction: direction
            }, () => this._updateAnimation(direction));
        }
    }
    _updateAnimation(direction) {
        let cb = () => { return };
        if (direction === "forward") {
            if (this.props.finishedForward) {
                cb = this.props.finishedForward;
            }
            let parallelArr = [];

            this.props.animations.forEach((anim, i) => {
                let key = anim.key;
                let endVal = anim.end
                if (typeof endVal !== "number") {
                    endVal = 1;
                }
                parallelArr.push(
                    Animated.timing(
                        this.state[key],
                        {
                            toValue: endVal,
                            duration: this.props.duration
                        }
                    )
                )
            })
            Animated.parallel(parallelArr).start(() => cb())

        } else if (direction === "backward") {
            if (this.props.finishedBackward) {
                cb = this.props.finishedBackward;
            }
            let parallelArr = []

            this.props.animations.forEach((anim, i) => {
                let key = anim.key;
                let startVal = anim.start
                if (typeof startVal !== "number") {
                    startVal = 1;
                }
                parallelArr.push(
                    Animated.timing(
                        this.state[key],
                        {
                            toValue: startVal,
                            duration: this.props.duration
                        }
                    )
                )
            })
            Animated.parallel(parallelArr).start(() => cb())
        } else {
            let parallelArr = []
            let staticVal = "end";
            if (this.state.prevDir === "backward") {
                staticVal = "start";
            }
            this.props.animations.forEach((anim, i) => {
                let key = anim.key;
                let startVal = anim[staticVal]
                if (typeof startVal !== "number") {
                    startVal = 0; //Remap to 0 after animation is complete
                }
                parallelArr.push(
                    Animated.timing(
                        this.state[key],
                        {
                            toValue: startVal,
                            duration: this.props.duration
                        }
                    )
                )
            })
            Animated.parallel(parallelArr).start();
        }
    }
    getAnimationStyle(to, from) {
        let animationStyle = {};
        this.props.animations.forEach(anim => {
            let key = anim.key;
            let toVal = anim[to];

            if (typeof toVal === 'number') {

                animationStyle[key] = this.state[key];
            } else {

                let inRange = [0, 1];
                let outRange = [anim[from], toVal];
                let newStyle = this.state[key].interpolate({
                    inputRange: inRange,
                    outputRange: outRange
                });
                animationStyle[key] = newStyle;
            }
        })
        return (animationStyle);
    }
    render() {
        let direction = this.state.direction;
        //Default to going forward
        let to = "end";
        let from = "start";
        if (direction === "backward") {
            to = "start";
            from = "end";

        } else if (direction === false) {

            //If direction currently false, default to coming from forward
            to = "end";
            from = "end";
            if (this.state.prevDir === "backward") {
                to = "start";
                from = "start"
            }
        }

        animationStyle = this.getAnimationStyle(to, from);

        if (this.props.text !== undefined) {
            return (
                <Animated.Text style={{ ...this.props.style, ...animationStyle }}>
                    {this.props.text}
                </Animated.Text>
            )
        }
        return (
            <Animated.View style={{ ...this.props.style, ...animationStyle }}>
                {this.props.children}
            </Animated.View>
        )
    }
}