import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { carbOptions, carbList, nonCarbList } from './utilities';
import InAndOut from './InAndOut';
import FoodDetailStyles from './styles/FoodDetailStyles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dimensions } from 'react-native';

const iconPaths = [
    require('./assets/images/bread.png'),
    require('./assets/images/pasta.png'),
    require('./assets/images/potatoes_fries.png'),
    require('./assets/images/dessert_cake.png'),
    require('./assets/images/soft_drink.png'),
    require('./assets/images/snack_carb.png'),
    require('./assets/images/rice_bowl.png'),
    require('./assets/images/hard_alcohol.png'),
    require('./assets/images/alcohol_beer.png')
];
export default class FoodDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: false
        }
    }
    componentDidUpdate(oldProps) {
        if (this.props.explanation !== oldProps.explanation) {
            if (this.props.explanation !== false) {
                this.handleOpen();
            } else {
                this.handleClose();
            }
        }
    }
    handleOpen = () => {
        this.setState({
            direction: "forward"
        })
    }
    handleClose() {
        this.setState({
            direction: "backward"
        })
    }
    finishedBackward = () => {
        this.setState({
            direction: false
        })
    }
    finishedForward = () => {
        this.setState({
            direction: false
        })
    }
    render() {
        let explanation = this.props.explanation;
        let expansion = nonCarbList;
        if (explanation !== false) {
            if (explanation >= 0) {
                expansion = carbList[explanation];
            }
        }
        return (
            <InAndOut
                style={FoodDetailStyles.container}
                animations={[{ key: "left", start: -Dimensions.get("window").width, end: 0 }]}
                duration={0}
                direction={this.state.direction}
                finishedBackward={this.finishedBackward}
                finishedForward={this.finishedForward}
            >
                {explanation !== false && explanation !== -1 ?
                    <View style={FoodDetailStyles.main}>
                        <View style={FoodDetailStyles.iconWrapper}>
                            <View style={FoodDetailStyles.backgroundWrap}>
                                {Array(10).fill().map((_, i) => {
                                    return (
                                        <View style={FoodDetailStyles.backgroundColumn} key={i}>
                                            <View style={FoodDetailStyles.imageWrap}>
                                                <Image style={FoodDetailStyles.backgroundImage} source={iconPaths[explanation]} />
                                            </View>
                                            <View style={FoodDetailStyles.imageWrap}>
                                                <Image style={FoodDetailStyles.backgroundImage} source={iconPaths[explanation]} />
                                            </View>
                                            <View style={FoodDetailStyles.imageWrap}>
                                                <Image style={FoodDetailStyles.backgroundImage} source={iconPaths[explanation]} />
                                            </View>
                                            <View style={FoodDetailStyles.imageWrap}>
                                                <Image style={FoodDetailStyles.backgroundImage} source={iconPaths[explanation]} />
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={FoodDetailStyles.objectiveIcon}>
                                <Image
                                    style={FoodDetailStyles.iconImage}
                                    source={iconPaths[explanation]}
                                />
                            </View>
                        </View>
                        <View style={FoodDetailStyles.textContainer}>
                            <Text style={{ ...FoodDetailStyles.carbWord, ...this.props.letterStyle }}>
                                Foods that count as
                            <Text style={{ ...FoodDetailStyles.blueText, ...this.props.letterStyle }}> {carbOptions[explanation]} are:</Text>
                            </Text>
                            <ScrollView style={FoodDetailStyles.expansionContainer}>
                                {expansion.map(i => {
                                    return (
                                        <View style={FoodDetailStyles.carbExpansion} key={i}>
                                            <View style={FoodDetailStyles.bullet} />
                                            <Text style={{ ...FoodDetailStyles.expansionText, ...this.props.letterStyle }}>{i}</Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    : explanation === -1 ?
                        <View style={FoodDetailStyles.main}>
                            <View style={FoodDetailStyles.iconWrapper}>
                                <View style={FoodDetailStyles.backgroundWrap}>
                                    {Array(10).fill().map((_, i) => {
                                        return (
                                            <View style={FoodDetailStyles.backgroundColumn} key={i}>
                                                <View style={FoodDetailStyles.imageWrap}>
                                                    <FontAwesomeIcon
                                                        icon='drumstick-bite'
                                                        size={0.08 * Dimensions.get('window').width}
                                                        color={"rgba(100, 100, 100, 0.1)"}
                                                    />
                                                </View>
                                                <View style={FoodDetailStyles.imageWrap}>
                                                    <FontAwesomeIcon
                                                        icon='drumstick-bite'
                                                        size={0.08 * Dimensions.get('window').width}
                                                        color={"rgba(100, 100, 100, 0.1)"}
                                                    />
                                                </View>
                                                <View style={FoodDetailStyles.imageWrap}>
                                                    <FontAwesomeIcon
                                                        icon='drumstick-bite'
                                                        size={0.08 * Dimensions.get('window').width}
                                                        color={"rgba(100, 100, 100, 0.1)"}
                                                    />
                                                </View>
                                                <View style={FoodDetailStyles.imageWrap}>
                                                    <FontAwesomeIcon
                                                        icon='drumstick-bite'
                                                        size={0.08 * Dimensions.get('window').width}
                                                        color={"rgba(100, 100, 100, 0.1)"}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View style={FoodDetailStyles.objectiveIcon}>
                                    <FontAwesomeIcon
                                        icon='drumstick-bite'
                                        style={FoodDetailStyles.iconImage}
                                        size={0.125 * Dimensions.get('window').width}
                                        color={"rgba(100, 100, 100, 0.9)"}
                                    />
                                </View>
                            </View>
                            <View style={FoodDetailStyles.textContainer}>
                                <Text style={{ ...FoodDetailStyles.carbWord, ...this.props.letterStyle }}>
                                    <Text style={{ ...FoodDetailStyles.blueText, ...this.props.letterStyle }}>These are foods you can always have*:</Text>
                                </Text>
                                <ScrollView style={FoodDetailStyles.expansionContainer}>
                                    {expansion.map(i => {
                                        return (
                                            <View style={FoodDetailStyles.carbExpansion} key={i}>
                                                <View style={FoodDetailStyles.bullet} />
                                                <Text style={{ ...FoodDetailStyles.expansionText, ...this.props.letterStyle }}>{i}</Text>
                                            </View>
                                        );
                                    })}
                                    <View style={FoodDetailStyles.carbExpansion}>
                                        <Text style={{ ...FoodDetailStyles.expansionText, ...this.props.letterStyle }}>
                                            *If these are part of a dish that contains Foods of Joy, you still cannot have that dish."
                                    </Text>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                        : null
                }
            </InAndOut>
        )
    }
}