import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
    View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView,
    SafeAreaView, TouchableWithoutFeedback, Keyboard, Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ForgotPass from './ForgotPass';

import LoginStyles from './styles/LoginStyles';

export default class Login extends Component {
    constructor(props) {
        super(props);
        let email = "";
        if (this.props.email !== false) {
            email = props.email;
        }
        this.state = {
            email: email,
            password: "",
            fontLoaded: false,
            forgotPass: false
        }
    }
    async componentDidMount() {
        await Font.loadAsync({
            'raleway': require('./assets/fonts/Raleway/Raleway-Regular.ttf'),
            'raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf'),
        });
        this.setState({ fontLoaded: true });
    }
    updateState(newState) {
        this.props.removeErrors();
        this.setState(newState);
    }
    login() {
        Keyboard.dismiss();
        this.props.login(this.state.email, this.state.password);
    }
    forgotPass() {
        this.updateState({
            forgotPass: true
        })
    }
    showLogin() {
        this.updateState({
            forgotPass: false
        })
    }
    setEmail(text) {
        this.updateState({ email: text })
    }
    setPassword(text) {
        this.updateState({ password: text })
    }
    render() {
        let fontStyle = {};
        if (this.state.fontLoaded) {
            fontStyle = { fontFamily: 'raleway-bold' };
        }
        if (this.state.forgotPass) {
            return (
                <ForgotPass
                    fontStyle={fontStyle} {...this.props}
                    showLogin={() => this.showLogin()}
                    resetPassword={this.props.resetPassword}
                    removeErrors={this.props.removeErrors}
                    email={this.state.email}
                />
            );
        }
        return (
            <KeyboardAvoidingView
                style={LoginStyles.keyboardAvoid}
                behavior="padding"
            >
                <SafeAreaView style={LoginStyles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={LoginStyles.inner}>
                            <View style={LoginStyles.loginHeader}>
                                <TouchableOpacity
                                    style={LoginStyles.backPress}
                                    onPress={() => this.props.setLandingState(null)}
                                >
                                    <FontAwesomeIcon
                                        icon='angle-left'
                                        size={0.075 * Dimensions.get('window').width}
                                        color={"rgba(100, 100, 100, 0.7)"}
                                    />
                                </TouchableOpacity>
                                <Text style={{ ...LoginStyles.loginHeaderText, ...fontStyle }}>
                                    Reductiscope
                                </Text>
                                <View style={LoginStyles.rightSide} />
                            </View>
                            <View style={LoginStyles.loginForm}>
                                <View style={LoginStyles.inputArea}>
                                    <TextInput
                                        style={LoginStyles.loginInput}
                                        placeholder='Email'
                                        onChangeText={text => this.setEmail(text)}
                                        value={this.state.email}
                                        autoCapitalize='none'
                                    />
                                    <TextInput
                                        secureTextEntry={true}
                                        style={LoginStyles.loginInput}
                                        placeholder='Password'
                                        onChangeText={text => this.setPassword(text)}
                                        value={this.state.password}
                                        autoCapitalize='none'
                                    />
                                    <Button
                                        buttonStyle={LoginStyles.loginSubmit}
                                        onPress={() => this.login()}
                                        color="#fffffff"
                                        title="Log in"
                                    />
                                </View>
                                <TouchableOpacity
                                    style={LoginStyles.forgotPassContainer}
                                    onPress={() => this.forgotPass()}
                                >
                                    <Text style={LoginStyles.forgotPass}>Forgot password?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}