import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

import { carbOrder, carbOptions, iconPaths, numLevels } from './utilities';
import InAndOut from './InAndOut';
import LevelUIStyles from './styles/LevelUIStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import XPBar from './XPBar';

export default class LevelUI extends Component {
    constructor(props){
        super(props);
        this.state = this.updateView();
    }
    updateView(){
        let carbRanks = this.props.user.carb_ranks;
        let levelMap = this.props.levelMap;
        let currLevelIndex = levelMap.length + 2;
        let trueLevelIndex = levelMap.length + 2;

        //Find level for current actual weight
        for (let i = 0; i < levelMap.length; i++) {
            let levelWeight = levelMap[i];
            if (levelWeight < this.props.weight) {
                currLevelIndex = i;
                break;
            }
        }

        //Find level for lowest weight so far
        //If the user has gained weight, XP bar must show progress to retain lost incentives,
        //Not to the next level
        for (let i = 0; i < levelMap.length; i++) {
            let levelWeight = levelMap[i];
            if (levelWeight < this.props.minWeight){
                trueLevelIndex = i;
                break;
            }
        }
        
        if (currLevelIndex < trueLevelIndex){
            //If the user has gained weight over the cutoff for their current level, collapse their options
            currLevelIndex = 0;
        }

        let endIndex = this.props.user.carb_ranks.length;

        let allowed = carbOrder.slice(0, currLevelIndex).map(el => carbRanks[el]);
        let objectives = carbOrder.slice(currLevelIndex, endIndex).map(el => carbRanks[el]).reverse();

        if (currLevelIndex === levelMap.length - 1) {
            currLevelIndex += 2;
        }
        return {
            allowed,
            objectives,
            currLevelIndex,
            trueLevelIndex
        }
    }
    componentDidUpdate(oldProps){
        if (oldProps && oldProps.weight !== this.props.weight){
            this.setState(this.updateView());
        }
    }
    render() {
        let {currLevelIndex, allowed, objectives, trueLevelIndex } = this.state;
        let levelMap = this.props.levelMap;

        if (currLevelIndex < trueLevelIndex){
            currLevelIndex = 0;
        }
        return (
            <InAndOut
                style={LevelUIStyles.levelUIContainer}
                animations={[{ key: 'top', start: 0, end: 1.05 * Dimensions.get("window").height }]}
                direction={this.props.triggerScreenChange}
                duration={400}
            >
                {currLevelIndex < trueLevelIndex ? 
                    <XPBar
                        targetLevel={this.state.trueLevelIndex}
                        current={this.props.weight}
                        target={levelMap[Math.min(this.state.trueLevelIndex, levelMap.length - 1)]}
                        start={this.props.weight}
                        units={this.props.user.weight_units}
                        showLabel={true}
                        numberStyle={this.props.numberStyle}
                        style={{ width: '100%' }}
                        over={true}
                    />
                : currLevelIndex <= numLevels ?
                    <XPBar
                        targetLevel={Math.min(currLevelIndex + 1, numLevels - 1)}
                        current={this.props.weight}
                        target={levelMap[Math.min(currLevelIndex, levelMap.length - 1)]}
                        start={levelMap[Math.max(currLevelIndex - 1, 0)]}
                        units={this.props.user.weight_units}
                        showLabel={true}
                        numberStyle={this.props.numberStyle}
                        style={{ width: '100%' }}
                    />
                    : null}
                <View style={LevelUIStyles.allowedSection}>
                    <Text style={{ ...LevelUIStyles.sectionLabel, ...this.props.numberStyle }}>You may have</Text>
                    <ScrollView
                        centerContent={true}
                        contentContainerStyle={allowed.length > 2 ?
                            { ...LevelUIStyles.iconContainer, paddingLeft: 50 }
                            : { ...LevelUIStyles.iconContainer }}
                        horizontal={true}
                        ref={ref => this.allowed = ref}
                        onContentSizeChange={_ => {
                            this.allowed.scrollToEnd({ animated: true });
                        }}
                    >
                        <View style={LevelUIStyles.weightOk}>
                            <TouchableOpacity
                                style={LevelUIStyles.icon}
                                onPress={() => this.props.showExplanation(-1)}
                            >
                                <Text style={{ ...LevelUIStyles.iconLabel, ...this.props.letterStyle, ...LevelUIStyles.multiLine2 }}>Foods Other Than</Text>
                                <Text style={{ ...LevelUIStyles.iconLabel, ...this.props.letterStyle, ...LevelUIStyles.multiLine3 }}>Foods of Joy</Text>
                                <View style={LevelUIStyles.allowedIconWrap}>
                                    <FontAwesomeIcon
                                        icon='drumstick-bite'
                                        size={0.125 * Dimensions.get('window').width}
                                        color={"rgba(100, 100, 100, 0.9)"}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {allowed.map((j, id) => {
                            return (
                                <View key={id} style={LevelUIStyles.weightOk}>
                                    {
                                        <TouchableOpacity
                                            style={LevelUIStyles.icon}
                                            onPress={() => this.props.showExplanation(j)}
                                        >
                                            <Text style={{ ...LevelUIStyles.iconLabel, ...this.props.letterStyle }}>{carbOptions[j]}</Text>
                                            <View style={LevelUIStyles.allowedIconWrap}>
                                                <Image
                                                    style={{ ...LevelUIStyles.iconImage, ...LevelUIStyles.allowedIcon }}
                                                    source={iconPaths[j]}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    }
                                </View>
                            )
                        })
                        }
                    </ScrollView>
                </View>
                <View style={LevelUIStyles.objectivesSection} >
                    {objectives.length > 0 ?
                    <View>
                    <Text style={{ ...LevelUIStyles.sectionLabel, ...this.props.numberStyle }}>Not Allowed</Text>
                    <ScrollView
                        centerContent={true}
                        contentContainerStyle={LevelUIStyles.iconContainer}
                        horizontal={true}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={_ => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}
                    >
                        {
                            objectives.map((j, index) => {
                                let tmpLevels = levelMap.slice(currLevelIndex);
                                let tmpIndex = index - tmpLevels.length + 1;
                                if (tmpIndex < 0) {
                                    //This will occur for the last level, if the user consumes alcohol
                                    tmpIndex = 0;
                                }
                                let target = tmpLevels[tmpIndex];
                                //If at the last level, currLevelIndex will have been given the +2 boost
                                if (currLevelIndex > levelMap.length - 1) {
                                    target = levelMap[levelMap.length - 1]
                                }
                                return (
                                    <View key={index} style={LevelUIStyles.weightNotOk}>
                                        {
                                            <TouchableOpacity
                                                style={LevelUIStyles.icon}
                                                onPress={() => this.props.showExplanation(j)}
                                            >
                                                <Text style={{ ...LevelUIStyles.iconLabel, ...this.props.letterStyle }}>{carbOptions[j]}</Text>
                                                <View style={LevelUIStyles.objectiveIcon}>
                                                    <Image
                                                        style={LevelUIStyles.iconImage}
                                                        source={iconPaths[j]}
                                                    />
                                                    <View style={LevelUIStyles.lockIcon}>
                                                        <FontAwesomeIcon
                                                            icon='lock'
                                                            size={0.125 * Dimensions.get('window').width}
                                                            color={"rgba(100, 100, 100, 0.9)"}
                                                        />
                                                    </View>
                                                </View>
                                                <XPBar
                                                    current={this.props.weight}
                                                    target={target}
                                                    start={this.props.initialWeight}
                                                    units={this.props.user.weight_units}
                                                    style={{ width: 0.2 * Dimensions.get("window").width }}
                                                />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    </View>
                    :
                    <View style={LevelUIStyles.allAllowedContainer}>
                        <View style={LevelUIStyles.allAllowedBanner}>
                            <Text style={{...LevelUIStyles.allAllowedText, ...this.props.numberStyle }}>
                                All foods allowed.
                            </Text>
                        </View>
                    </View>
                    }
                </View>
            </InAndOut>
        )
    }
}