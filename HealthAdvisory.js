import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dimensions } from 'react-native';

import HealthAdvisoryStyles from './styles/HealthAdvisoryStyles';

import moment from 'moment';

export default class HealthAdvisory extends Component {
    constructor(props) {
        super(props);
    }
    async confirm(delay){
        if (delay){
            await this.props.updateUserSettings("allergy_warning_date", moment().format("YYYY-MM-DD"));
        }
        this.props.updateScreen("HOME")
    }
    render(){
        let regLetterStyle = this.props.regLetterStyle;
        return(
            <View style={HealthAdvisoryStyles.advisoryWrap}>
                <View style={HealthAdvisoryStyles.iconWrap}>
                    <FontAwesomeIcon
                        icon='exclamation-triangle'
                        size={0.4 * Dimensions.get('window').width}
                        color={"rgba(100, 100, 100, 0.1)"}
                    />
                </View>
                <View style={HealthAdvisoryStyles.advisoryTextContainer}>
                    <Text style={HealthAdvisoryStyles.advisoryText}>
                        Reductiscope is not a clinical tool. Do not eat any of the foods suggested if you have allergies to them. 
                    </Text>
                </View>
                <View style={HealthAdvisoryStyles.buttonContainer}>
                    <TouchableOpacity
                        style={{...HealthAdvisoryStyles.button, ...HealthAdvisoryStyles.accept}}
                        onPress={() => this.confirm(true)}
                    >
                        <Text style={{ ...HealthAdvisoryStyles.buttonText, ...regLetterStyle }}>
                            Don't warn me for 6 months
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{...HealthAdvisoryStyles.button, ...HealthAdvisoryStyles.continue}}
                        onPress={() => this.confirm(false)}
                    >
                        <Text style={{ ...HealthAdvisoryStyles.buttonText, ...regLetterStyle }}>
                           Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}