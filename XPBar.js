import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { weightStringFromKg } from './utilities';
import LevelUIStyles from './styles/LevelUIStyles';
import DashboardStyles from './styles/DashboardStyles';

export default class XPBar extends Component {
    render() {
        let progPct = Math.max(100.0 * (this.props.start - this.props.current) / (this.props.start - this.props.target), 0);
        let toGo = weightStringFromKg(this.props.current - this.props.target, this.props.units);
        //console.log(this.props.current, this.props.target, toGo)
        return (
            <View style={{ ...LevelUIStyles.XPBarContainer, ...this.props.style }}>
                {this.props.showLabel ?
                    <View style={LevelUIStyles.textContainer}>
                        <Text style={{ ...LevelUIStyles.XPBarText, ...this.props.ralewayLight }}>{toGo}</Text>
                        {this.props.over ? 
                            <View style={DashboardStyles.levelContainer}>
                                <Text style={LevelUIStyles.toGoText}>to regain Foods of Joy</Text>
                            </View>
                        :
                            <View style={DashboardStyles.levelContainer}>
                                <Text style={LevelUIStyles.toGoText}>to level</Text>
                                <Text style={DashboardStyles.levelNumber}>
                                    {this.props.targetLevel}
                                </Text>
                            </View>
                        }
                    </View>
                    : null}
                <View style={LevelUIStyles.XPBarOuter}>
                    <View style={{ ...LevelUIStyles.XPBarFilled, width: progPct + '%' }} />
                </View>
            </View>
        )
    }
}