import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dimensions } from 'react-native';

import IntroHeaderStyles from './styles/IntroHeaderStyles';

export default class IntroHeader extends Component {
    render() {
        return (
            <View style={IntroHeaderStyles.introHeader} >
                <View style={IntroHeaderStyles.topSection}>
                    <TouchableOpacity style={IntroHeaderStyles.backPress} onPress={() => this.props.leftPress()}>
                        <View style={IntroHeaderStyles.backContainer}>
                            <FontAwesomeIcon
                                icon='angle-left'
                                size={0.075 * Dimensions.get('window').width}
                                color={"rgba(100, 100, 100, 0.7)"}
                            />
                            <Text style={{ ...IntroHeaderStyles.backText, ...this.props.fonts.regLetterStyle }}>
                                {this.props.backText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={IntroHeaderStyles.homePress} onPress={() => this.props.setLandingState(null)}>
                        <FontAwesomeIcon
                            icon='home'
                            size={0.085 * Dimensions.get('window').width}
                            color={"rgba(100, 100, 100, 0.7)"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={IntroHeaderStyles.introHeaderTextContainer}>
                    <Text style={{ ...this.props.fonts.regLetterStyle, ...IntroHeaderStyles.introHeaderText }} >
                        {this.props.title}
                    </Text>
                </View>
            </View>
        )
    }
}

