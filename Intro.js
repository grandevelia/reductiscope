import React, { Component } from 'react';
import {
    View, TextInput, Text, TouchableOpacity, LayoutAnimation, KeyboardAvoidingView,
    SafeAreaView, TouchableWithoutFeedback, ScrollView, Slider, Picker, Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { displayWeightFromKg, calcHeightInches, roundWeightStringFromKg, allowedCarbs, convertWeight, idealWeightKg, weightFromKg } from './utilities';
import InteractionArea from './InteractionArea';
import InAndOut from './InAndOut';
import IntroStyles from './styles/IntroStyles';
import IntroHeader from './IntroHeader';
import { Dimensions } from 'react-native';

const introStateChangeAnimation = {
    duration: 100,
    create: {
        duration: 150,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.easeIn
    },
    update: {
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.linear
    },
    delete: {
        duration: 50,
        property: LayoutAnimation.Properties.opacity,
        type: LayoutAnimation.Types.linear
    }
}

export default class Intro extends Component {
    constructor(props) {
        super(props);
        let userState;
        //__DEV__ = false;
        if (__DEV__) {
            userState = {
                alcohol: true,
                carbRanks: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                viewChoices: true,
                sex: 'male',
                heightInches: 72,
                weightUnits: 'Kilograms',
                heightUnits: 'Centimeters',
                chooseOwnIdealWeight: false,
                viewedLevels: true,
                idealWeightKg: 87,
                initialWeightKg: 100,
                initialValue: 0,
                plan: 1,
                currentPage: 10,
            }
        } else {
            userState = {
                alcohol: null,
                carbRanks: [null, null, null, null, null, null, null, null, null],
                viewChoices: false,
                sex: null,
                heightInches: null,
                weightUnits: null,
                heightUnits: null,
                chooseOwnIdealWeight: false,
                viewedLevels: false,
                idealWeightKg: null,
                initialWeightKg: null,
                initialValue: 0,
                plan: 1,
                currentPage: 0,
            }
        }
        this.state = {
            ...userState,
            fontFamily: null,
            pageOrder: [
                { component: IntroExplanation, title: "", prev: "Login" },
                { component: AlcoholPage, title: "Do you drink alcohol?", prev: "Rules" },
                { component: CarbsPage, title: "Touch the following in the order of how much you enjoy them", prev: "Alcohol" },
                { component: HeightUnitsPage, title: "Let's find your ideal weight", prev: "Objectives" },
                { component: HeightPage, title: "Your Current Height:", prev: "Height Units" },
                { component: SexPage, title: "Biological Sex:", prev: "Height" },
                { component: WeightUnitsPage, title: "Measure Weight In:", prev: "Biological Sex" },
                { component: InitialWeightPage, title: "Your Current Weight:", prev: "Weight Units" },
                { component: ChooseIdealWeightPage, title: "Ideal Weight", prev: "Starting Weight" },
                { component: LevelPage, title: "The path to your target weight", prev: "Ideal Weight" },
                //{component: InitialValuePage, title: "Please answer the following question using the slider", prev: "Starting Weight"},
                //{component: IntroPlansPage, title: "Select Your Plan", prev: "Value"},
                { component: SignupPage, title: "Enter the Reductiscope.", prev: "Levels" },
            ],
        }
    }
    updateIntroState = newState => {
        LayoutAnimation.configureNext(introStateChangeAnimation);
        let newPage = this.state.currentPage + 1;
        if ('alcohol' in newState && newState.alcohol !== null) {
            if (newState.alcohol === true) {
                let carbRanks = this.state.carbRanks;
                if (carbRanks.length === 7) {
                    carbRanks = carbRanks.concat([null, null]);
                }
                newState = {
                    alcohol: true,
                    carbRanks: carbRanks,
                    currentPage: newPage
                };
            } else if (newState.alcohol === false) {
                let carbRanks = this.state.carbRanks;
                if (carbRanks.length === 9) {
                    carbRanks.splice(7, 2);
                }
                newState = {
                    alcohol: false,
                    carbRanks: carbRanks,
                    currentPage: newPage
                };
            }
        } else if (newState.hasOwnProperty("initialWeightKg")) {
            newState["idealWeightKg"] = idealWeightKg(this.state.heightInches, this.state.sex);

        } else if (this.state.currentPage === 2) {
            if (this.state.swiperIndex < 4) {
                newPage = newPage - 1;
            }
        } else if ('chooseOwnIdealWeight' in newState) {
            if (newState['chooseOwnIdealWeight']) {
                newPage = newPage - 1;
            }
        }
        this.setState({
            ...newState,
            currentPage: newPage
        });
    }
    handleBackPress = () => {
        if (this.props.errors) {
            this.props.removeErrors();
        }
        let newPage = this.state.currentPage - 1;
        if (newPage < 0) {
            this.props.setLandingState(null);
        } else {
            this.setState({
                currentPage: newPage
            });
        }
    }
    render() {
        let CurrentComponent = this.state.pageOrder[this.state.currentPage].component;
        let currentTitle = this.state.pageOrder[this.state.currentPage].title;
        let currentPrev = this.state.pageOrder[this.state.currentPage].prev;
        return (
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior="padding"
                keyboardVerticalOffset={-0.175 * Dimensions.get("window").height}
            >
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    {this.state.currentPage > 0 &&
                        <IntroHeader
                            title={currentTitle}
                            leftPress={this.handleBackPress}
                            backText={currentPrev}
                            fonts={this.props.fonts}
                            setLandingState={this.props.setLandingState}
                        />
                    }
                    <CurrentComponent
                        {...this.state}
                        updateIntroState={this.updateIntroState}
                        setLandingState={this.props.setLandingState}
                        register={this.props.register}
                        fonts={this.props.fonts}
                        login={this.props.login}
                        errors={this.props.errors}
                        registrationSuccess={this.props.registrationSuccess}
                        removeErrors={this.props.removeErrors}
                    />
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }
}

class IntroExplanation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            numPages: 13
        }
    }
    nextIndex() {
        if (this.props.errors) {
            this.props.removeErrors();
        }
        let newIndex = this.state.index + 1;
        if (newIndex === this.state.numPages - 1) {
            this.props.updateIntroState({});
        } else {
            this.setState({
                index: newIndex
            }, () => {
                this.scroll.scrollTo({ y: 0, animated: false })
            });
        }
    }
    getText(index) {
        let texts = [
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                <Text style={IntroStyles.doubleSize}>Welcome,{"\n"}</Text>
                and congratulations on having been invited to use The Reductiscope. The Reductiscope Method harnesses your love of food to help you achieve your weight goals. In the following screens we will explain the method.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                Many weight maintenance systems want you to give up the foods that you love, or to treat them as temporary indulgences. They remove the joy from eating and replace it with shame. Here in the Reductiscope we embrace joy, and there is no shame.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                The Reductiscope operates by first having you rank several categories of foods and drinks according to how much you love them. These
                <Text style={IntroStyles.blueText}> “Foods of Joy” </Text>
                are the tools that will help you achieve your weight goal.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                Next, the Reductiscope calculates a
                <Text style={IntroStyles.goldText}> “Target Weight” </Text>
                by applying some basic information about you through the Reductiscope
                <Text style={IntroStyles.goldText}> “Target Weight” </Text>
                calculator. This
                <Text style={IntroStyles.goldText}> Target Weight </Text>
                is your ultimate weight goal. And now, a word about Target Weights.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                We at The Reductiscope recognize that the calculated
                <Text style={IntroStyles.goldText}> Target Weights </Text>
                might seem low. They are based on a combination of several studies of “ideal weights” that were published over the past few decades. We encourage you to discuss any
                <Text style={IntroStyles.goldText}> Target Weight </Text>
                with your medical professional. The Reductiscope needs a single end-goal, and we find the calculated
                <Text style={IntroStyles.goldText}> Target Weight </Text>
                to be as good a choice as any. If you prefer, you can choose to substitute your own
                <Text style={IntroStyles.goldText}> Target Weight </Text>
                -- though it can’t be lower than the calculated
                <Text style={IntroStyles.goldText}> Target Weight</Text>.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                Next Reductiscope creates a series of Levels between your current weight and your
                <Text style={IntroStyles.goldText}> Target Weight </Text>.
                 Each
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                is assigned a Level.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                When you begin you are at Level 1, which represents any weight above the Level 2 weight. When you are at Level 1 you can’t have any of your
                <Text style={IntroStyles.blueText}> Foods of Joy</Text>.
                Your life will not be joyless without these, but you will miss them. You will seek more joy.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                ...and because you seek joy, you will do what is necessary to reach Level 2. You will walk a little more, eat a little less (and a little better). Soon enough, you will reach Level 2. On that magic morning, you will see the Reductiscope telling you that you can have the Level 2
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                -- and joyous it will be. However, if you have too much of that
                <Text style={IntroStyles.blueText}> Food of Joy</Text>,
                when you weigh in the next morning, you will find that you have lost the right to have it. So, instead, you will enjoy that food in moderation, savoring the exquisite pleasure that comes from a food you love. This moderation will allow you to keep having that
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                while proceeding on to even greater joy when you reach Level 3.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                And at Level 3 you will now have the Level 2
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                AND the Level 3 Food of Joy. Never have these foods tasted so good. However, as you achieve each new level, the stakes get higher. Now, if you exceed the Level 3 target weight, you will lose BOTH the Level 2 and Level 3
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                until you once again are at or below the Level 3 target. That is because the Reductiscope collapses each level when you achieve it. Every
                <Text style={IntroStyles.blueText}> Food of Joy </Text>
                you have previously earned is at risk if you subsequently go above the target for the last level you achieved.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                And so it proceeds, all the way down, Level by Level, with an increasing
                <Text style={IntroStyles.blueText}> cornucopia of Joy </Text>
                earned at each level. Meanwhile, you will have noticed other changes as well. Food – especially the
                <Text style={IntroStyles.blueText}> Foods of Joy </Text>
                – have never tasted so good. You will purchase new clothes. People will start commenting (but you will not share your secret, other than perhaps to say you are eating better).
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                Eventually, you reach your Target Weight – an achievement that seemed ridiculously out of reach when you started. If your weight subsequently exceeds your Target Weight, you will lose the right to have any of the
                <Text style={IntroStyles.blueText}> Foods of Joy </Text>
                until you are once again at or below your Target Weight.
            </Text>,
            <Text style={{ ...IntroStyles.explanationText, fontFamily: this.props.fonts.regLetterFont }}>
                And that’s it. Well, there are other rules and explanations, such as the
                <Text style={IntroStyles.brownText}> Vacation Exception</Text>, the
                <Text style={IntroStyles.blueText}> Don’t Be A Jerk About It rule</Text>, and the
                <Text style={IntroStyles.redText}> Tell Others But Keep It a Secret rule</Text>.
            </Text>
        ];
        return (texts[index]);
    }
    prevIndex() {
        let newIndex = this.state.index - 1;
        if (newIndex < 0) {
            this.props.setLandingState(null);
        } else {
            this.setState({
                index: newIndex
            }, () => {
                this.scroll.scrollTo({ y: 0 })
            });
        }
    }
    render() {
        let textEl = this.getText(this.state.index);
        return (
            <ScrollView ref={ref => this.scroll = ref} style={IntroStyles.explanationWrap}>
                <TouchableOpacity style={IntroStyles.backPress} onPress={() => this.prevIndex()}>
                    <FontAwesomeIcon
                        icon='angle-left'
                        size={0.075 * Dimensions.get('window').width}
                        color={"rgba(100, 100, 100, 0.7)"}
                    />
                </TouchableOpacity>
                {textEl}
                <TouchableOpacity
                    style={IntroStyles.explanationNext}
                    onPress={() => this.nextIndex()}
                >
                    <Text style={IntroStyles.explanationNextText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}
class AlcoholPage extends Component {
    render() {
        return (
            <View style={IntroStyles.introPage}>
                <View style={{ ...IntroStyles.introBody, ...IntroStyles.centerPage }}>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ alcohol: true })}
                    >
                        <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ alcohol: false })}
                    >
                        <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>
                            No
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class CarbsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carbRanks: props.carbRanks
        }
    }
    updateCarbRanks(ranks) {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ carbRanks: ranks })
    }
    render() {
        let carbLabels = ["Breads", "Pasta/Rice", "Potatoes", "Dessert", "Soft Drinks", "Snack Carbs", "Cereals", "Hard Alcohol", "Beer/Wine"];
        if (!this.props.alcohol) {
            carbLabels = ["Breads", "Pasta/Rice", "Potatoes", "Dessert", "Soft Drinks", "Snack Carbs", "Cereals"];
        }
        return (
            <View style={IntroStyles.carbPage}>
                <InteractionArea
                    update={choices => this.updateCarbRanks(choices)}
                    choices={this.state.carbRanks}
                    options={Array(carbLabels.length).fill().reduce((res, curr, i) => {
                        if (this.state.carbRanks.indexOf(i) < 0) {
                            res.push(i);
                        }
                        return res;
                    }, [])}
                    labels={carbLabels}
                    itemStyle={{ fontFamily: this.props.fonts.regLetterFont }}
                />
                {this.state.carbRanks.indexOf(null) < 0 ?
                <TouchableOpacity
                    style={{...IntroStyles.buttonTouchable, ...IntroStyles.button1}}
                    onPress={() => this.props.updateIntroState({ carbRanks: this.state.carbRanks, viewChoices: false })}
                >
                    <Text style={IntroStyles.introNav}>NEXT: Find Your Ideal Weight</Text>
                </TouchableOpacity>
            : null}
            </View>
        )
    }
}
class HeightUnitsPage extends Component {
    render() {
        return (
            <View style={IntroStyles.introPage}>
                <View style={{ ...IntroStyles.introBody, ...IntroStyles.centerPage }}>
                    <Text style={{ fontFamily: this.props.fonts.regLetterFont, textAlign: "center" }}>
                        Height should be measured in:
                    </Text>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ heightUnits: "Feet / Inches" })}
                    >
                        <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>
                            Feet / Inches
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ heightUnits: "Centimeters" })}
                    >
                        <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>
                            Centimeters
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class HeightPage extends Component {
    constructor(props) {
        super(props);
        let h = props.heightInches;
        let h1 = 0;
        let h2 = 0;
        let h3 = 0;
        if (h !== null) {

            if (props.heightUnits === "Centimeters") {
                h = h * 2.54;
                h = "" + h;
                h1 = parseInt(h.charAt(0), 10);
                h2 = parseInt(h.charAt(1), 10);
                h3 = parseInt(h.charAt(2), 10);
            } else {
                h1 = Math.floor(h / 12);
                h2 = h - h1 * 12;
                h3 = 0;
            }
        }
        this.state = {
            heightError: "",
            height: [h1, h2, h3],
        }
    }
    updateHeight(height, index) {
        height = parseInt(height);
        let currHeight = this.state.height;
        currHeight[index] = height;
        this.setState({
            height: currHeight
        })
    }
    getHeight() {
        let height;
        if (this.props.heightUnits === "Centimeters") {
            height = calcHeightInches(this.props.heightUnits, parseInt('' + this.state.height[0] + '' + this.state.height[1] + '' + this.state.height[2]))
        } else {
            height = calcHeightInches(this.props.heightUnits, this.state.height[0], this.state.height[1]);
        }
        return (height);
    }
    render() {
        return (
            <View style={{ ...IntroStyles.introPage }}>
                <View style={{ ...IntroStyles.introBody, ...IntroStyles.centerPage }}>
                    <Text style={{ fontFamily: this.props.fonts.regLetterFont, textAlign: "center", fontSize: 25, margin: 10 }}>
                        {
                            this.props.heightUnits === "Centimeters" ?
                                '' + this.state.height[0] + '' + this.state.height[1] + '' + this.state.height[2] + " " + this.props.heightUnits
                                :
                                '' + this.state.height[0] + " Feet " + this.state.height[1] + " Inches"
                        }
                    </Text>
                    {
                        this.props.heightUnits === "Centimeters" ?
                            <View style={IntroStyles.pickerContainer}>
                                <Picker
                                    style={IntroStyles.sideBySide}
                                    selectedValue={this.state.height[0]}
                                    onValueChange={val => this.updateHeight(val, 0)}
                                >
                                    {
                                        Array(10).fill().map((x, i) => {
                                            return (
                                                <Picker.Item key={i} label={'' + i} value={i} />
                                            )
                                        })
                                    }
                                </Picker>
                                <Picker
                                    style={IntroStyles.sideBySide}
                                    selectedValue={this.state.height[1]}
                                    onValueChange={val => this.updateHeight(val, 1)}
                                >
                                    {
                                        Array(10).fill().map((x, i) => {
                                            return (
                                                <Picker.Item key={i} label={'' + i} value={i} />
                                            )
                                        })
                                    }
                                </Picker>
                                <Picker
                                    style={IntroStyles.sideBySide}
                                    selectedValue={this.state.height[2]}
                                    onValueChange={val => this.updateHeight(val, 2)}
                                >
                                    {
                                        Array(10).fill().map((x, i) => {
                                            return (
                                                <Picker.Item key={i} label={'' + i} value={i} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                            :
                            <View style={IntroStyles.pickerContainer}>
                                <Picker
                                    style={IntroStyles.sideBySide}
                                    selectedValue={this.state.height[0]}
                                    onValueChange={val => this.updateHeight(val, 0)}
                                >
                                    {
                                        Array(10).fill().map((x, i) => {
                                            return (
                                                <Picker.Item key={i} label={'' + i} value={i} />
                                            )
                                        })
                                    }
                                </Picker>
                                <Picker
                                    style={IntroStyles.sideBySide}
                                    selectedValue={this.state.height[1]}
                                    onValueChange={val => this.updateHeight(val, 1)}
                                >
                                    {
                                        Array(12).fill().map((x, i) => {
                                            return (
                                                <Picker.Item key={i} label={'' + i} value={i} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View>
                    }
                    {this.state.height[0] + this.state.height[1] + this.state.height[2] !== 0 ?
                        <TouchableOpacity
                            style={IntroStyles.buttonTouchable}
                            onPress={() => this.props.updateIntroState({ heightInches: this.getHeight() })}
                        >
                            <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}> Next</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        )
    }
}
class SexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sexAbout: false
        }
    }
    render() {
        return (
            <View style={IntroStyles.introPage}>
                <View style={{ ...IntroStyles.introBody, ...IntroStyles.centerPage }}>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ sex: "female" })}
                    >
                        <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>
                            Female
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ sex: "male" })}
                    >
                        <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>
                            Male
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ sex: "other" })}
                    >
                        <Text style={{ ...IntroStyles.button3, ...IntroStyles.CTA }}>
                            Other
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class WeightUnitsPage extends Component {
    render() {
        return (
            <View style={{ ...IntroStyles.introPage }}>
                <View style={{ ...IntroStyles.introBody, ...IntroStyles.centerPage }}>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ weightUnits: "Pounds" })}
                    >
                        <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>
                            Pounds
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ weightUnits: "Kilograms" })}
                    >
                        <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>
                            Kilograms
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
class InitialWeightPage extends Component {
    constructor(props) {
        super(props);
        let weight = [0, 0, 0, 0, 0];
        if (this.props.initialWeightKg) {
            let w = displayWeightFromKg(this.props.initialWeightKg, this.props.weightUnits);
            let w1 = parseInt(w.charAt(0), 10);
            let w2 = parseInt(w.charAt(1), 10);
            let w3 = parseInt(w.charAt(2), 10);
            let w4 = parseInt(w.charAt(4), 10);
            let w5 = parseInt(w.charAt(5), 10);
            weight = [w1, w2, w3, w4, w5];
        }
        this.state = {
            pickerIndex: weight,
            weightError: ""
        }
    }
    updateWeight(weight, index) {
        let currWeight = this.state.pickerIndex;
        currWeight[index] = weight;
        this.setState({
            pickerIndex: currWeight
        })
    }
    getWeight() {
        return `${this.state.pickerIndex[0]}${this.state.pickerIndex[1]}${this.state.pickerIndex[2]}.${this.state.pickerIndex[3]}${this.state.pickerIndex[4]}`;
    }
    render() {
        let digit1 = this.state.pickerIndex[0];
        let digit2 = this.state.pickerIndex[1];
        let digit3 = this.state.pickerIndex[2];
        let digit4 = this.state.pickerIndex[3];
        let digit5 = this.state.pickerIndex[4];
        
        if (digit1 === 0) {
            digit1 = "";
            if (digit2 === 0) {
                digit2 = "";
            }
        }
        let weightDisplay = `${digit1}${digit2}${digit3}.${digit4}${digit5} ${this.props.weightUnits}`;
        
        return (
            <View style={{ ...IntroStyles.introPage }}>
                <View style={{ ...IntroStyles.introBody, marginTop: 15 }}>
                    <Text style={{ fontFamily: this.props.fonts.regLetterFont, textAlign: "center", fontSize: 25, margin: 10 }}>
                        {weightDisplay}
                    </Text>
                    <View style={IntroStyles.pickerContainer}>
                        <View style={IntroStyles.pickerBarDecimal}>
                            <Text style={IntroStyles.pickerBarDecimalItem}>.</Text>
                        </View>
                        <Picker
                            style={IntroStyles.sideBySide}
                            selectedValue={this.state.pickerIndex[0]}
                            onValueChange={val => this.updateWeight(val, 0)}
                        >
                            {
                                Array(10).fill().map((x, i) => {
                                    return (
                                        <Picker.Item key={i} label={'' + i} value={i} />
                                    )
                                })
                            }
                        </Picker>
                        <Picker
                            style={IntroStyles.sideBySide}
                            selectedValue={this.state.pickerIndex[1]}
                            onValueChange={val => this.updateWeight(val, 1)}
                        >
                            {
                                Array(10).fill().map((x, i) => {
                                    return (
                                        <Picker.Item key={i} label={'' + i} value={i} />
                                    )
                                })
                            }
                        </Picker>
                        <Picker
                            style={IntroStyles.sideBySide}
                            selectedValue={this.state.pickerIndex[2]}
                            onValueChange={val => this.updateWeight(val, 2)}
                        >
                            {
                                Array(10).fill().map((x, i) => {
                                    return (
                                        <Picker.Item key={i} label={'' + i} value={i} />
                                    )
                                })
                            }
                        </Picker>
                        <Picker
                            style={IntroStyles.sideBySide}
                            selectedValue={this.state.pickerIndex[3]}
                            onValueChange={val => this.updateWeight(val, 3)}
                        >
                            {
                                Array(10).fill().map((x, i) => {
                                    return (
                                        <Picker.Item key={i} label={'' + i} value={i} />
                                    )
                                })
                            }
                        </Picker>
                        <Picker
                            style={IntroStyles.sideBySide}
                            selectedValue={this.state.pickerIndex[4]}
                            onValueChange={val => this.updateWeight(val, 4)}
                        >
                            {
                                Array(10).fill().map((x, i) => {
                                    return (
                                        <Picker.Item key={i} label={'' + i} value={i} />
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    {this.state.pickerIndex[0] + this.state.pickerIndex[1] + this.state.pickerIndex[2] + this.state.pickerIndex[3] + this.state.pickerIndex[4] > 0 ?
                        <TouchableOpacity
                            style={{ ...IntroStyles.buttonTouchable, marginTop: 10 }}
                            onPress={() => this.props.updateIntroState({ initialWeightKg: convertWeight(this.getWeight(), this.props.weightUnits) })}
                        >
                            <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>Next</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        )
    }
}
class ChooseIdealWeightPage extends Component {
    constructor(props) {
        super(props);
        let weightString = displayWeightFromKg(props.idealWeightKg, props.weightUnits);
        let pickerIndex = [
            parseInt(weightString.substring(0, 1), 10),
            parseInt(weightString.substring(1, 2), 10),
            parseInt(weightString.substring(2, 3), 10),
            parseInt(weightString.substring(4, 5), 10),
            parseInt(weightString.substring(5, 6), 10)
        ];
        this.state = {
            pickerIndex: pickerIndex
        }
    }
    chooseOwnWeight = () => {
        this.props.updateIntroState({ chooseOwnIdealWeight: true });
    }
    updateWeight(weight, index) {
        let currWeight = this.state.pickerIndex;
        currWeight[index] = weight;
        this.setState({
            pickerIndex: currWeight
        })
    }
    getWeight() {
        return `${this.state.pickerIndex[0]}${this.state.pickerIndex[1]}${this.state.pickerIndex[2]}.${this.state.pickerIndex[3]}${this.state.pickerIndex[4]}`;
    }
    render() {
        let digit1 = this.state.pickerIndex[0];
        let digit2 = this.state.pickerIndex[1];
        let digit3 = this.state.pickerIndex[2];
        let digit4 = this.state.pickerIndex[3];
        let digit5 = this.state.pickerIndex[4];

        if (digit1 === 0) {
            digit1 = "";
            if (digit2 === 0) {
                digit2 = "";
            }
        }

        let weightDisplay = `${digit1}${digit2}${digit3}.${digit4}${digit5} ${this.props.weightUnits}`;
        return (
            <View style={IntroStyles.introPage}>
                <View style={IntroStyles.introBody}>
                    <InAndOut
                        style={IntroStyles.chooseIdealWeightButtons}
                        animations={[
                            { key: "marginTop", start: 0, end: -25 }
                        ]}
                        direction={this.props.chooseOwnIdealWeight ? "forward" : "backward"}
                        duration={200}
                    >
                        <InAndOut
                            style={{ fontFamily: this.props.fonts.regLetterFont, textAlign: "center" }}
                            text={roundWeightStringFromKg(idealWeightKg(this.props.heightInches, this.props.sex), this.props.weightUnits)}
                            animations={[
                                { key: "opacity", start: 1, end: 0 },
                                { key: "fontSize", start: 25, end: 0 }
                            ]}
                            direction={this.props.chooseOwnIdealWeight ? "forward" : "backward"}
                            duration={200}
                        />
                        <TouchableOpacity
                            style={IntroStyles.buttonTouchable}
                            onPress={() => this.props.updateIntroState({ chooseOwnIdealWeight: false })}
                        >
                            <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA }}>
                                {this.props.chooseOwnIdealWeight ?
                                    "Use " + roundWeightStringFromKg(idealWeightKg(this.props.heightInches, this.props.sex), this.props.weightUnits)
                                    : "Accept"
                                }
                            </Text>
                        </TouchableOpacity>
                        {this.props.chooseOwnIdealWeight ?
                            <Text style={IntroStyles.customizingText}>Choose your ideal weight</Text>
                            :
                            <TouchableOpacity
                                style={IntroStyles.buttonTouchable}
                                onPress={() => this.chooseOwnWeight()}
                            >
                                <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>Customize</Text>
                            </TouchableOpacity>
                        }
                    </InAndOut>
                    <InAndOut
                        direction={this.props.chooseOwnIdealWeight ? "forward" : "backward"}
                        style={IntroStyles.customizeIdealWeight}
                        animations={[
                            { key: "height", start: 0, end: 0.8 * Dimensions.get("window").height },
                            { key: "opacity", start: 0, end: 1 }
                        ]}
                        duration={200}
                    >
                        <Text style={{ fontFamily: this.props.fonts.regLetterFont, textAlign: "center", fontSize: 25, margin: 10 }}>
                            {weightDisplay}
                        </Text>
                        <View style={{ ...IntroStyles.pickerContainer, ...IntroStyles.chooseOwnPicker }}>
                            <View style={IntroStyles.pickerBarDecimal}>
                                <Text style={IntroStyles.pickerBarDecimalItem}>.</Text>
                            </View>
                            <Picker
                                style={IntroStyles.sideBySide}
                                selectedValue={this.state.pickerIndex[0]}
                                onValueChange={val => this.updateWeight(val, 0)}
                            >
                                {
                                    Array(10).fill().map((x, i) => {
                                        return (
                                            <Picker.Item key={i} label={'' + i} value={i} />
                                        )
                                    })
                                }
                            </Picker>
                            <Picker
                                style={IntroStyles.sideBySide}
                                selectedValue={this.state.pickerIndex[1]}
                                onValueChange={val => this.updateWeight(val, 1)}
                            >
                                {
                                    Array(10).fill().map((x, i) => {
                                        return (
                                            <Picker.Item key={i} label={'' + i} value={i} />
                                        )
                                    })
                                }
                            </Picker>
                            <Picker
                                style={IntroStyles.sideBySide}
                                selectedValue={this.state.pickerIndex[2]}
                                onValueChange={val => this.updateWeight(val, 2)}
                            >
                                {
                                    Array(10).fill().map((x, i) => {
                                        return (
                                            <Picker.Item key={i} label={'' + i} value={i} />
                                        )
                                    })
                                }
                            </Picker>
                            <Picker
                                style={IntroStyles.sideBySide}
                                selectedValue={this.state.pickerIndex[3]}
                                onValueChange={val => this.updateWeight(val, 3)}
                            >
                                {
                                    Array(10).fill().map((x, i) => {
                                        return (
                                            <Picker.Item key={i} label={'' + i} value={i} />
                                        )
                                    })
                                }
                            </Picker>
                            <Picker
                                style={IntroStyles.sideBySide}
                                selectedValue={this.state.pickerIndex[4]}
                                onValueChange={val => this.updateWeight(val, 4)}
                            >
                                {
                                    Array(10).fill().map((x, i) => {
                                        return (
                                            <Picker.Item key={i} label={'' + i} value={i} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={IntroStyles.buttonTouchable}
                            onPress={() => this.props.updateIntroState({ idealWeightKg: convertWeight(this.getWeight(), this.props.weightUnits) })}
                        >
                            <Text style={{ ...IntroStyles.button1, ...IntroStyles.CTA }}>
                                {"Use " + weightDisplay}
                            </Text>
                        </TouchableOpacity>
                    </InAndOut>
                </View>
            </View>
        )
    }
}
class LevelPage extends Component {
    render() {
        let currentWeight = this.props.initialWeightKg
        let toLoseKg = currentWeight - this.props.idealWeightKg;
        let incrementKg = toLoseKg / 7;
        let carbRanks = this.props.carbRanks;
        return (
            <View style={{...IntroStyles.introPage, flex: 1}}>
                <View style={{ ...IntroStyles.stage, ...IntroStyles.stage1 }}>
                    <View style={IntroStyles.stageTitleWrapper}>
                        <Text style={{ ...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 1</Text>

                        <Text style={{ ...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
                            {roundWeightStringFromKg(this.props.initialWeightKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight - 2 * incrementKg, this.props.weightUnits)}
                        </Text>
                    </View>
                    <View style={IntroStyles.section}>
                        <Text style={{ ...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may (always) have</Text>
                        <Text style={{ ...IntroStyles.levelDescription, fontFamily: this.props.fonts.regLetterFont }}>
                            Anything that isn’t a Food of Joy:  For example, meats, dairy products, eggs, vegetables, nuts, and legumes are always allowed.
                        </Text>
                    </View>
                </View>
                <View style={{ ...IntroStyles.stage, ...IntroStyles.stage2 }}>
                    <View style={IntroStyles.stageTitleWrapper}>
                        <Text style={{ ...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 2</Text>
                        <Text style={{ ...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
                            {roundWeightStringFromKg(currentWeight - 2 * incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight - 3 * incrementKg, this.props.weightUnits)}
                        </Text>
                    </View>
                    <Text style={{ ...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
                    <View style={IntroStyles.levelDescription}>
                        {allowedCarbs(1, carbRanks, this.props.fonts.regLetterFont)}
                    </View>
                </View>
                <View style={{ ...IntroStyles.stage, ...IntroStyles.stage3 }}>
                    <View style={IntroStyles.stageTitleWrapper}>
                        <Text style={{ ...IntroStyles.stageTitle, fontFamily: this.props.fonts.regLetterFont }}>Level 3</Text>
                        <Text style={{ ...IntroStyles.stageRange, fontFamily: this.props.fonts.regLetterFont }}>
                            {roundWeightStringFromKg(currentWeight - 3 * incrementKg, this.props.weightUnits)} - {roundWeightStringFromKg(currentWeight - 3 * incrementKg, this.props.weightUnits)}
                        </Text>
                    </View>
                    <Text style={{ ...IntroStyles.levelSectionHeader, fontFamily: this.props.fonts.regLetterFont }}>You may have:</Text>
                    <View style={IntroStyles.levelDescription}><Text>To be revealed on reaching Level 2</Text></View>
                </View>
                <TouchableOpacity
                    style={IntroStyles.buttonTouchable}
                    onPress={() => this.props.updateIntroState({ viewedLevels: true })}
                >
                    <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA, backgroundColor: 'rgb(233, 19, 133)' }}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class InitialValuePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0
        }
    }
    handleValueChange(val) {
        this.setState({ val: parseInt(val) })
    }
    render() {
        let idealWeightValue = this.props.initialValue;
        if (!idealWeightValue) {
            idealWeightValue = 0;
        }
        return (
            <View style={IntroStyles.introPage}>
                <View style={IntroStyles.promptArea}>
                    <Text style={{ ...IntroStyles.promptText, fontFamily: this.props.fonts.regLetterFont }}>
                        (This helps you be accountable by making your goal tangible)
                    </Text>
                </View>

                <Text style={{ ...IntroStyles.promptTitle, fontFamily: this.props.fonts.regLetterFont }}>
                    {"How important would it be to you to weigh " + roundWeightStringFromKg(this.props.idealWeightKg, this.props.weightUnits, true) + "?"}
                </Text>
                <View style={IntroStyles.ratingGuide}>
                    <Text style={{ ...IntroStyles.zeroValue, fontFamily: this.props.fonts.regLetterFont }}>
                        0 = It doesn't matter to me at all
                    </Text>
                    <Text style={{ ...IntroStyles.fullValue, fontFamily: this.props.fonts.regLetterFont }}>
                        100 = It's the most important thing to me
                    </Text>
                </View>
                <View style={IntroStyles.sliderArea}>
                    <View style={IntroStyles.sliderVisual}>
                        <Text style={{ fontFamily: this.props.fonts.regLetterFont }}>
                            {this.state.val}
                        </Text>
                    </View>
                    <Slider
                        maximumValue={100}
                        onValueChange={val => this.handleValueChange(val)}
                    />
                </View>

                <View style={IntroStyles.bottomArea}>
                    <TouchableOpacity
                        style={IntroStyles.buttonTouchable}
                        onPress={() => this.props.updateIntroState({ initialValue: this.state.val })}
                    >
                        <Text style={{ ...IntroStyles.button2, ...IntroStyles.CTA, backgroundColor: 'rgb(233, 19, 133)' }}>
                            NEXT: Pick your plan
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class IntroPlansPage extends Component {
    render() {
        let fontStyle = {};
        if (this.props.fontFamily) {
            fontStyle = { fontFamily: 'raleway-bold' };
        }

        return (
            <View style={IntroStyles.introPage}>
                <Text style={{ ...IntroStyles.plansText, ...fontStyle }}>
                    You can use Reductiscope completely for free (but we think you’re going to be happy to pay us)
                </Text>

                <View style={IntroStyles.optionArea}>
                    <TouchableOpacity
                        onPress={() => this.props.updateIntroState({ plan: 1 })}
                        style={{ ...IntroStyles.paymentOption, ...IntroStyles.paymentOptionOne }}
                    >
                        <Text style={{ ...IntroStyles.optionHeader, ...fontStyle }}>Classic</Text>
                        <Text style={IntroStyles.optionText}>
                            Pay something now, and something when you achieve your ideal weight.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.updateIntroState({ plan: 2 })}
                        style={{ ...IntroStyles.paymentOption, ...IntroStyles.paymentOptionTwo }}
                    >
                        <Text style={{ ...IntroStyles.optionHeader, ...fontStyle }}>Slow Burn</Text>
                        <Text style={IntroStyles.optionText}>Pay some now, some later</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.updateIntroState({ plan: 3 })}
                        style={{ ...IntroStyles.paymentOption, ...IntroStyles.paymentOptionThree }}
                    >
                        <Text style={{ ...IntroStyles.optionHeader, ...fontStyle }}>I Need More Proof</Text>
                        <Text style={IntroStyles.optionText}>Pay only at the end</Text>
                        <Text style={IntroStyles.optionText}>(Or not at all).</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class SignupPage extends Component {
    constructor(props) {
        super(props);
        let email = "";
        let password = "";
        this.state = {
            email: email,
            password: password
        }
    }
    signup() {
        Keyboard.dismiss();
        this.props.register(this.state.email, this.state.password, this.props.alcohol, this.props.carbRanks, this.props.weightUnits, this.props.heightUnits, this.props.heightInches, this.props.initialWeightKg, this.props.idealWeightKg, this.props.initialValue, this.props.sex)
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={IntroStyles.inner}>
                    <View style={IntroStyles.inputArea}>
                        <TextInput
                            style={IntroStyles.signupInput}
                            placeholder='Email'
                            onChangeText={text => {
                                this.props.removeErrors();
                                this.setState({ email: text })
                            }}
                            value={this.state.email}
                            autoFocus={true}
                            autoCapitalize='none'
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={IntroStyles.signupInput}
                            placeholder='Password'
                            onChangeText={text => {
                                this.props.removeErrors();
                                this.setState({ password: text })
                            }}
                            value={this.state.password}
                            autoCapitalize='none'
                        />
                        <Button
                            buttonStyle={IntroStyles.registerSubmit}
                            onPress={() => this.signup()}
                            title="Sign up!"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}