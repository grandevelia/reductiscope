import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { carbOptions, iconPaths, carbOrder } from './utilities';
import FoodDetail from './FoodDetail';
import LevelUIStyles from './styles/LevelUIStyles';
import ExplanationsStyles from './styles/ExplanationsStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dimensions } from 'react-native';

export default class ExplanationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            explanation: props.explanation,
            direction: false
        }
    }
    componentDidUpdate(oldProps) {
        if (oldProps.explanation !== this.props.explanation) {
            if (this.props.explanation === false) {
                this.closeDetail();
            } else {
                this.openDetail(this.props.explanation);
            }
        }
    }
    closeDetail() {
        this.setState({
            explanation: false
        }, () => {
            this.props.toggleExplanation(false);
        })
    }
    openDetail(target) {
        this.setState({
            explanation: target
        })
    }
    showExplanation(i) {
        this.props.toggleExplanation(i)
    }
    render() {
        let carbRanks = this.props.carbRanks;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FoodDetail
                    explanation={this.state.explanation}
                    toggleExplanation={this.props.explanation}
                    carbRanks={carbRanks}
                    show={this.state.explanation !== null}
                />
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={RulesStyles.topGap} />
                    <View style={ExplanationsStyles.carbExplanations}>
                        <View style={ExplanationsStyles.carbOption}>
                            <TouchableOpacity
                                style={ExplanationsStyles.icon}
                                onPress={() => this.showExplanation(-1)}
                            >
                                <View style={ExplanationsStyles.objectiveIcon}>
                                    <FontAwesomeIcon
                                        icon='drumstick-bite'
                                        size={0.125 * Dimensions.get('window').width}
                                        color={"rgba(100, 100, 100, 0.9)"}
                                    />
                                </View>
                                <Text style={{ ...ExplanationsStyles.iconLabel, ...this.props.letterStyle }}>Foods Other Than Foods of Joy</Text>
                            </TouchableOpacity>
                        </View>
                        {carbOptions.map((_, i) => {
                            return (
                                <View key={i} style={ExplanationsStyles.carbOption}>
                                    <TouchableOpacity
                                        style={ExplanationsStyles.icon}
                                        onPress={() => this.showExplanation(i)}
                                    >
                                        <View style={ExplanationsStyles.objectiveIcon}>
                                            <Image style={LevelUIStyles.iconImage} source={iconPaths[carbRanks[carbOrder[i]]]} />
                                        </View>
                                        <Text style={{ ...ExplanationsStyles.iconLabel, ...this.props.letterStyle }}>
                                            {carbOptions[carbRanks[carbOrder[i]]]}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        )
    }
}