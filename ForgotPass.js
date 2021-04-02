import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Linking } from 'expo';
import {
    View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView,
    SafeAreaView, TouchableWithoutFeedback, Keyboard, Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button } from 'react-native-elements';

import LoginStyles from './styles/LoginStyles';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        let email = "";
        if (this.props.email !== false) {
            email = props.email;
        }
        this.state = {
            email: email
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
    updateEmail(text) {
        this.updateState({
            email: text
        })
    }
    resetPassword() {
        if (this.state.email.length < 1) {
            this.props.setError("Email is required");
            return;
        }

        this.props.removeErrors();
        this.props.resetPassword(this.state.email);
    }
    render() {
        let fontStyle = this.props.fontStyle;
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
                                    onPress={() => this.props.showLogin()}
                                >
                                    <FontAwesomeIcon
                                        icon='angle-left'
                                        size={0.075 * Dimensions.get('window').width}
                                        color={"rgba(100, 100, 100, 0.7)"}
                                    />
                                </TouchableOpacity>
                                <Text style={{ ...LoginStyles.loginHeaderText, ...fontStyle }}>
                                    Lost Password
                                </Text>
                                <View style={LoginStyles.rightSide} />
                            </View>
                            <View style={LoginStyles.loginForm}>
                                {this.props.reset === null ?
                                    <View style={LoginStyles.inputArea}>
                                        <TextInput
                                            style={LoginStyles.loginInput}
                                            placeholder='Enter Your Email'
                                            onChangeText={text => this.updateEmail(text)}
                                            value={this.state.email}
                                            autoFocus={true}
                                            autoCapitalize='none'
                                        />
                                        <Button
                                            buttonStyle={LoginStyles.loginSubmit}
                                            onPress={() => this.resetPassword()}
                                            color="#fffffff"
                                            title="Submit"
                                        />
                                        <TouchableOpacity
                                            style={LoginStyles.forgotPassContainer}
                                            onPress={() => this.props.showLogin()}
                                        >
                                            <Text style={LoginStyles.forgotPass}>Back To Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={LoginStyles.messageContainer}>
                                        <Text style={LoginStyles.resetOkay}>
                                            A reset link was sent to <Text style={LoginStyles.resetEmail}>{this.props.email}</Text>.
                                        </Text>

                                        <Text style={LoginStyles.resetOkay}>
                                            Please follow it to reset your password.
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}