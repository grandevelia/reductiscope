import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Login from './Login';
import Intro from './Intro';

import LandingPageStyles from './styles/LandingPageStyles';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            child: null,
        }
    }
    componentDidUpdate(oldProps) {
        if (this.props.email && this.state.child !== "LOGIN") {
            this.setState({ child: "LOGIN" })
        }
    }
    setLandingState = target => {
        if (this.props.errors) {
            this.props.removeErrors();
        }
        if (target !== null && target !== "LOGIN" && target !== "INTRO") {
            return false;
        }
        if (target === null) {
            this.props.clearLogin();
        }
        this.setState({ child: target })
    }
    render() {
        return (
            <View style={LandingPageStyles.landingPage}>
                {this.state.child === "LOGIN" ?
                    <Login
                        setLandingState={this.setLandingState}
                        errors={this.props.errors}
                        reset={this.props.reset}
                        resetPassword={this.props.resetPassword}
                        email={this.props.email}
                        login={this.props.login}
                        removeErrors={this.props.removeErrors}
                        setError={this.props.setError}
                        email={this.props.email}
                    />
                    : this.state.child === "INTRO" ?
                        <Intro
                            login={this.props.login}
                            setLandingState={this.setLandingState}
                            {...this.props} />
                        :
                        <View style={LandingPageStyles.landingPageInputs}>
                            <View style={LandingPageStyles.landingHeader}>
                                <Text style={LandingPageStyles.landingHeaderText}>
                                    You're here to reach your weight goals.
                            </Text>
                                <Text style={LandingPageStyles.landingHeaderText}>
                                    Let's start.
                            </Text>
                            </View>
                            <TouchableOpacity
                                style={LandingPageStyles.landingPageContainer}
                                onPress={() => this.setLandingState("LOGIN")}
                            >
                                <Text style={{ ...LandingPageStyles.login, ...LandingPageStyles.CTA }}>
                                    Log in
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={LandingPageStyles.landingPageContainer}
                                onPress={() => this.setLandingState("INTRO")}
                            >
                                <Text style={{ ...LandingPageStyles.CTA, ...LandingPageStyles.signup }}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}
