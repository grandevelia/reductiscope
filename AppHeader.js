import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';

import InAndOut from './InAndOut';
import HeaderStyles from './styles/HeaderStyles';

export default class AppHeader extends Component {
    render() {
        let startSize = this.props.startFontSize;
        let endSize = this.props.endFontSize;
        if (this.props.title.length > 20) {
            startSize = 0.065 * Dimensions.get('window').width;
            endSize = 0.065 * Dimensions.get('window').width;
        }
        return (
            <View style={HeaderStyles.header} >
                {this.props.title === "Today" ?
                    <InAndOut
                        style={{ ...this.props.regLetterStyle, ...HeaderStyles.dateText }}
                        animations={[
                            { key: 'fontSize', start: startSize, end: endSize },
                        ]}
                        text={this.props.title}
                        duration={400}
                        direction={this.props.triggerScreenChange}
                    />
                    :
                    <Text style={{ ...this.props.regLetterStyle, ...HeaderStyles.dateText, fontSize: startSize }}>
                        {this.props.title}
                    </Text>
                }
                <TouchableOpacity onPress={() => this.props.leftPress()}>
                    {this.props.leftComponent}
                </TouchableOpacity>
                {this.props.rightComponent}
            </View>
        )
    }
}