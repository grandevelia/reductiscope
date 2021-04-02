import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { convertWeight, displayWeightFromKg, carbOptions, lossModeLevel, numLevels, weightFromKg } from './utilities';

import DashboardStyles from './styles/DashboardStyles';
import InAndOut from './InAndOut';
import LevelUI from './LevelUI';
import AppHeader from './AppHeader';
import SettingsScreen from './SettingsScreen';
import ExplanationsScreen from './ExplanationsScreen';
import RulesScreen from './RulesScreen';
import FoodDetail from './FoodDetail';
import ReferScreen from './ReferScreen';
import HistoryScreen from './HistoryScreen';
import HealthAdvisory from './HealthAdvisory';

import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.weightText = React.createRef();

        let user = props.user;
        let weights = props.weights;

        let kgPerLevel = (user.initial_weight_kg - user.ideal_weight_kg) / numLevels;
        let levelMap = Array(numLevels).fill().map((x, i) => {
            return i * kgPerLevel + user.ideal_weight_kg;
        });

        levelMap.reverse();
        levelMap.splice(0, 1); //first level is 2x normal from starting weight (removing first index doubles the interval)
        
        let weightString = displayWeightFromKg(weights[weights.length - 1], user.weight_units);
        let pickerIndex = [
            parseInt(weightString.substring(0, 1), 10),
            parseInt(weightString.substring(1, 2), 10),
            parseInt(weightString.substring(2, 3), 10),
            parseInt(weightString.substring(4, 5), 10),
            parseInt(weightString.substring(5, 6), 10)
        ];
        this.state = {
            pickerIndex: pickerIndex,
            openWeight: null,
            screen: "HOME",
            submissionConfirmation: false,
            triggerScreenChange: false,
            blur: false,
            explanation: false,
            levelMap: levelMap
        }
        this._carousel1 = React.createRef();
        this._carousel2 = React.createRef();
        this._carousel3 = React.createRef();
        this._carousel4 = React.createRef();
        this._carousel5 = React.createRef();
        this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    }
    componentDidUpdate(oldProps) {
        if (oldProps.weights.length !== this.props.weights.length) {
            let user = this.props.user;
            let kgPerLevel = (user.initial_weight_kg - user.ideal_weight_kg) / 8;
            let levelMap = Array(8).fill().map((x, i) => {
                return i * kgPerLevel + user.ideal_weight_kg;
            });
            levelMap.reverse();
            levelMap.splice(0, 1);
            this.setState({
                levelMap: levelMap
            })
        }
    }
    updateScreen = screen => {
        this.setState({
            screen: screen
        }, () => {
            this.unblur();
        })
    }
    toggleExplanation = explanation => {
        this.setState({
            explanation: explanation
        })
    }
    async handleWeightSubmit() {
        let index = this.state.openWeight;

        let newWeight = convertWeight(parseFloat('' +
            this.state.pickerIndex[0] + '' +
            this.state.pickerIndex[1] + '' +
            this.state.pickerIndex[2] + '.' +
            this.state.pickerIndex[3] + '' +
            this.state.pickerIndex[4]), this.props.user.weight_units);
        
        let daysFromNow = this.props.weights.length - 1 - index;
        let currDate = moment().subtract(daysFromNow, "days");

        let id = this.props.ids[index];
        let updateFunc = this.props.addWeight;
        let func_args = [newWeight, currDate.format("YYYY-MM-DD")];
        if (id !== null) {
            //Weight is being changed
            updateFunc = this.props.updateWeight;
            func_args = [newWeight, id];
        }

        await updateFunc(...func_args);
        if (!this.props.errors) {
            this.closeWeightInput();
        }
    }
    openWeightInput(index) {
        this.setState({
            triggerScreenChange: "forward",
            openWeight: index
        });
    }
    weightDidOpen() {
        let index = this.state.openWeight;
        let user = this.props.user;
        let weights = this.props.weights;
        let weightString = displayWeightFromKg(weights[index], user.weight_units);
        
        let pickerIndex = [
            parseInt(weightString.substring(0, 1), 10),
            parseInt(weightString.substring(1, 2), 10),
            parseInt(weightString.substring(2, 3), 10),
            parseInt(weightString.substring(4, 5), 10),
            parseInt(weightString.substring(5, 6), 10)
        ];

        this._carousel1.snapToItem(pickerIndex[0]);
        this._carousel2.snapToItem(pickerIndex[1]);
        this._carousel3.snapToItem(pickerIndex[2]);
        this._carousel4.snapToItem(pickerIndex[3]);
        this._carousel5.snapToItem(pickerIndex[4]);

        this.setState({
            triggerScreenChange: false,
            pickerIndex: pickerIndex,
        });
    }
    weightDidClose() {
        this.setState({
            triggerScreenChange: false,
            openWeight: null
        });
    }
    closeWeightInput() {
        this.setState({
            triggerScreenChange: "backward"
        });
    }
    setWeightIndex = (slider, number) => {
        let newIndices = this.state.pickerIndex;
        newIndices.splice(slider, 1, number);
        if (slider === 0) {
            this._carousel1.snapToItem(number);
        } else if (slider === 1) {
            this._carousel2.snapToItem(number);
        } else if (slider === 2) {
            this._carousel3.snapToItem(number);
        } else if (slider === 3) {
            this._carousel4.snapToItem(number);
        } else {
            this._carousel5.snapToItem(number);
        }
        this.setState({
            pickerIndex: newIndices
        });
    }
    blur() {
        this.setState({
            blur: "forward"
        });
    }
    unblur() {
        this.setState({
            blur: "backward"
        });
    }
    finishBlurChange() {
        this.setState({
            blur: false
        });
    }
    promptVacation() {
        this.setState({
            vacationPrompt: true
        });
    }
    toggleVacation() {
        this.props.toggleVacation();
        this.closeVacation();
    }
    closeVacation() {
        this.setState({
            vacationPrompt: false
        });
    }
    render() {
        let ww = Dimensions.get("window").width;
        let wh = Dimensions.get("window").height;
        let user = this.props.user;
        let dates = this.props.dates;
        let weights = this.props.weights;
        let level = lossModeLevel(user.initial_weight_kg, user.ideal_weight_kg, weights[weights.length - 1]);
        let viewingWeightIndex = Math.max(weights.length - 1, 0);

        let numberStyle = {};
        let letterStyle = {};
        let regLetterStyle = {};
        let ralewayLight = {}
        if (this.props.fonts) {
            numberStyle = { fontFamily: this.props.fonts.numberFont };
            letterStyle = { fontFamily: this.props.fonts.letterFont };
            regLetterStyle = { fontFamily: this.props.fonts.regLetterFont };
            ralewayLight = { fontFamily: this.props.fonts.ralewayLight };
        }
        

        let weightDisplay;
        if (this.state.openWeight === null || this.state.triggerScreenChange !== false) {
            weightDisplay = displayWeightFromKg(weights[viewingWeightIndex], this.props.user.weight_units, false);
        } else {
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
            weightDisplay = `${digit1}${digit2}${digit3}.${digit4}${digit5}`;
        }
        let title;
        let startFontSize = 0.075 * ww;
        let endFontSize = 0.06 * ww;
        if (this.state.explanation !== false) {
            if (this.state.explanation >= 0) {
                title = carbOptions[this.state.explanation];
            } else {
                title = "Foods Other Than Foods of Joy";
            }

        } else if (this.state.screen === "HOME") {
            title = moment(dates[this.state.openWeight]).format("MMMM Do, YYYY");
            if (moment().diff(moment(dates[this.state.openWeight]), "days") === 0) {
                title = "Today";
            }

        } else if (this.state.screen === "SETTINGS") {
            title = "Settings";

        } else if (this.state.screen === "EXPLANATIONS") {
            title = "Explanations";

        } else if (this.state.screen === "REFER") {
            title = "Friends";

        } else if (this.state.screen === "HISTORY") { 
            title = "History";

        } else {
            title = "Rules";

        }
        return (
            <View style={DashboardStyles.container}>
                {moment().diff(moment(user.allergy_warning_date), "days") > 60 ?
                        <HealthAdvisory 
                            regLetterStyle={regLetterStyle} 
                            updateUserSettings={this.props.updateUserSettings} 
                            updateScreen={this.updateScreen}
                        />
                :
                <View style={DashboardStyles.container}>
                    <InAndOut
                        style={DashboardStyles.blur}
                        animations={[
                            { key: "backgroundColor", start: "rgba(0,0,0,0)", end: "rgba(0,0,0,0.8)" },
                            { key: "zIndex", start: -1, end: 99 }
                        ]}
                        duration={0}
                        direction={this.state.blur}
                        finishedForward={() => this.finishBlurChange()}
                        finishedBackward={() => this.finishBlurChange()}
                    >
                        <TouchableOpacity
                            onPress={() => this.unblur()}
                            style={DashboardStyles.blur}
                        />
                    </InAndOut>
                    <InAndOut
                        style={DashboardStyles.menuContainer}
                        animations={[
                            { key: 'left', start: - 0.6 * ww, end: 0 },
                        ]}
                        duration={100}
                        direction={this.state.blur}
                    >
                        <View style={DashboardStyles.menuHeader}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("SETTINGS")}
                            >
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>
                                    {user.email}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={DashboardStyles.menuItem}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("HOME")}
                            >
                                <FontAwesomeIcon
                                    icon='home'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>Home</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={DashboardStyles.menuItem}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("SETTINGS")}
                            >
                                <FontAwesomeIcon
                                    icon='cogs'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                        {/*
                        <View style={DashboardStyles.menuItem}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("HISTORY")}
                            >
                                <FontAwesomeIcon
                                    icon='chart-line'
                                    style={{transform: [{ rotate: "180deg" }, {scaleX: -1}]}}
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>History</Text>
                            </TouchableOpacity>
                        </View>
                        */}
                        <View style={DashboardStyles.menuItem}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("EXPLANATIONS")}
                            >
                                <FontAwesomeIcon
                                    icon='comment'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>Food Explanations</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={DashboardStyles.menuItem}>
                            <TouchableOpacity
                                style={DashboardStyles.menuLink}
                                onPress={() => this.updateScreen("RULES")}
                            >
                                <FontAwesomeIcon
                                    icon='gavel'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                                <Text style={{ ...DashboardStyles.menuLinkText, ...numberStyle }}>Rules</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={DashboardStyles.vacationContainer}>
                            <TouchableOpacity
                                style={DashboardStyles.vacationButton}
                                onPress={this.props.user.vacation ? this.toggleVacation() : () => this.promptVacation()}
                            >
                                <FontAwesomeIcon
                                    icon='plane'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(255, 255, 255)"}
                                />
                                <Text style={{ ...DashboardStyles.vacationText, ...regLetterStyle }}>
                                    {!this.props.user.vacation ? "I'm on vacation!"
                                        : "Undo vacation"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={DashboardStyles.referContainer}>
                            <TouchableOpacity
                                style={DashboardStyles.referButton}
                                onPress={() => this.updateScreen("REFER")}
                            >
                                <FontAwesomeIcon
                                    icon='user-friends'
                                    size={0.065 * Dimensions.get('window').width}
                                    color={"rgb(255, 255, 255)"}
                                />
                                <Text style={{ ...DashboardStyles.referText, ...regLetterStyle }}>
                                    Refer A New User
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </InAndOut>
                    <AppHeader
                        blur={() => this.blur()}
                        changeScreen={screen => this.updateScreen(screen)}
                        title={title}
                        startFontSize={startFontSize}
                        endFontSize={endFontSize}
                        triggerScreenChange={this.state.triggerScreenChange}
                        leftComponent={
                            this.state.explanation === false ?
                                <FontAwesomeIcon
                                    icon='bars'
                                    size={0.085 * Dimensions.get('window').width}
                                    color={"rgb(100, 100, 100)"}
                                />
                                :
                                <FontAwesomeIcon
                                    icon='angle-left'
                                    size={0.075 * Dimensions.get('window').width}
                                    color={"rgb(105, 105, 105)"}
                                />
                        }
                        leftPress={
                            this.state.explanation === false ?
                                () => this.blur()
                                :
                                () => this.toggleExplanation(false)
                        }
                        rightComponent={
                            this.state.explanation !== false ?
                                null
                                : this.state.screen === "HOME" ?
                                    <View style={DashboardStyles.levelContainer}>
                                        <Text style={{ ...DashboardStyles.levelText, ...regLetterStyle }}>Level</Text>
                                        <Text style={{ ...DashboardStyles.levelNumber, ...letterStyle }}>{level}</Text>
                                    </View>
                                    :
                                    <TouchableOpacity onPress={() => this.updateScreen("HOME")} >
                                        <FontAwesomeIcon
                                            icon='home'
                                            size={0.07 * Dimensions.get('window').width}
                                            color={"rgba(20, 20, 20, 0.85)"}
                                        />
                                    </TouchableOpacity>
                        }
                        regLetterStyle={regLetterStyle}
                    />
                    {this.state.screen === "HOME" ?
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                            <FoodDetail
                                explanation={this.state.explanation}
                                toggleExplanation={this.toggleExplanation}
                                letterStyle={regLetterStyle}
                                carbRanks={this.props.user.carb_ranks}
                            />
                            <InAndOut
                                style={DashboardStyles.dashTop}
                                animations={[{ key: 'height', start: '35%', end: '17.5%' }]}
                                finishedForward={() => this.weightDidOpen()}
                                finishedBackward={() => this.weightDidClose()}
                                duration={400}
                                direction={this.state.triggerScreenChange}
                            >
                                <InAndOut
                                    style={DashboardStyles.weightInputAnimated}
                                    animations={[
                                        { key: 'height', start: 0.25 * wh, end: 0.075 * wh },
                                        { key: 'top', start: '30%', end: '70%' },
                                    ]}
                                    duration={400}
                                    direction={this.state.triggerScreenChange}
                                >
                                    <TouchableOpacity
                                        onPress={this.state.openWeight === null ?
                                            () => this.openWeightInput(viewingWeightIndex) : null
                                        }
                                        style={DashboardStyles.weightInputButton}
                                    >
                                        <InAndOut
                                            style={DashboardStyles.weightTextContainer}
                                            animations={[
                                                { key: 'top', start: '0%', end: '0%' },
                                            ]}
                                            duration={400}
                                            direction={this.state.triggerScreenChange}
                                        >
                                            <InAndOut
                                                style={{ ...DashboardStyles.weightText, ...numberStyle }}
                                                animations={[
                                                    { key: 'fontSize', start: 0.175 * ww, end: 0.1 * ww },
                                                    { key: 'width', start: '100%', end: '50%' },
                                                    { key: 'left', start: '0%', end: '0%' }
                                                ]}
                                                text={weightDisplay}
                                                duration={400}
                                                direction={this.state.triggerScreenChange}
                                            />
                                            {this.props.lastDate !== dates[dates.length - 1] &&
                                                <InAndOut
                                                    style={{ ...DashboardStyles.weightText, ...numberStyle }}
                                                    animations={[
                                                        { key: 'fontSize', start: 0.03 * ww, end: 0 * ww },
                                                        { key: 'width', start: '100%', end: '30%' },
                                                        { key: 'left', start: '0%', end: '0%' }
                                                    ]}
                                                    text={"Not Current. From " + this.props.lastDate}
                                                    duration={400}
                                                    direction={this.state.triggerScreenChange}
                                                >
                                                </InAndOut>
                                            }
                                            <InAndOut
                                                style={{ ...DashboardStyles.weightTextUnits, ...numberStyle }}
                                                animations={[
                                                    { key: 'fontSize', start: 0.06 * ww, end: 0.08 * ww },
                                                    { key: 'top', start: 0.275 * ww, end: 0 },
                                                    { key: 'width', start: '100%', end: '40%' },
                                                    { key: 'left', start: '0%', end: '50%' }
                                                ]}
                                                text={user.weight_units === "Kilograms" && this.state.openWeight !== null ? "Kg" : user.weight_units}
                                                duration={400}
                                                direction={this.state.triggerScreenChange}
                                            />
                                            <InAndOut
                                                style={DashboardStyles.editIcon}
                                                animations={[
                                                    { key: 'opacity', start: 1, end: 0 },
                                                ]}
                                                duration={400}
                                                direction={this.state.triggerScreenChange}
                                            >
                                                <FontAwesomeIcon
                                                    icon='edit'
                                                    size={0.1 * Dimensions.get('window').width}
                                                    color={"rgb(35, 182, 255)"}
                                                />
                                            </InAndOut>
                                        </InAndOut>
                                    </TouchableOpacity>
                                </InAndOut>
                            </InAndOut>
                            <InAndOut
                                style={DashboardStyles.dashboardBody}
                                animations={[
                                    { key: 'height', start: '60%', end: '80%' },
                                    { key: 'top', start: '40%', end: '20%' },
                                ]}
                                duration={400}
                                direction={this.state.triggerScreenChange}
                            >
                                <LevelUI
                                    user={this.props.user}
                                    levelMap={this.state.levelMap}
                                    weight={weights[viewingWeightIndex]}
                                    minWeight={Math.min(...weights)}
                                    initialWeight={user.initial_weight_kg}
                                    triggerScreenChange={this.state.triggerScreenChange}
                                    showExplanation={this.toggleExplanation}
                                    numberStyle={numberStyle}
                                    letterStyle={letterStyle}
                                />
                                {/***** Open Weight *****/}
                                <InAndOut
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        //zIndex: 9999
                                    }}
                                    animations={[
                                        { key: 'opacity', start: 0, end: 1 },
                                        { key: 'zIndex', start: -1, end: 9999 }
                                    ]}
                                    direction={this.state.triggerScreenChange}
                                    duration={400}
                                >
                                    <View style={DashboardStyles.weightPromptMain}>
                                        <View style={DashboardStyles.pickerBar} />
                                        <View style={DashboardStyles.pickerBarDecimal}>
                                            <Text style={DashboardStyles.pickerBarDecimalItem}>.</Text>
                                        </View>
                                        <Carousel
                                            ref={(c) => { this._carousel1 = c; }}
                                            vertical={true}
                                            data={Array(10).fill().map((x, i) => { return ({ weight: i }) })}
                                            renderItem={({ item }) => <WeightItem pickerIndex={this.state.pickerIndex[0]} weightObj={item} style={{ ...numberStyle }} />}
                                            sliderHeight={0.85 * wh}
                                            itemHeight={0.85 * wh / 8}
                                            enableMomentum={true}
                                            firstItem={this.state.pickerIndex[0]}
                                            onSnapToItem={num => this.setWeightIndex(0, num)}
                                        />
                                        <Carousel
                                            ref={(c) => { this._carousel2 = c; }}
                                            vertical={true}
                                            data={Array(10).fill().map((x, i) => { return ({ weight: i }) })}
                                            renderItem={({ item }) => <WeightItem pickerIndex={this.state.pickerIndex[1]} weightObj={item} style={{ ...numberStyle }} />}
                                            sliderHeight={0.85 * wh}
                                            itemHeight={0.85 * wh / 8}
                                            enableMomentum={true}
                                            firstItem={this.state.pickerIndex[1]}
                                            onSnapToItem={num => this.setWeightIndex(1, num)}
                                        />
                                        <Carousel
                                            ref={(c) => { this._carousel3 = c; }}
                                            vertical={true}
                                            data={Array(10).fill().map((x, i) => { return ({ weight: i }) })}
                                            renderItem={({ item }) => <WeightItem pickerIndex={this.state.pickerIndex[2]} weightObj={item} style={{ ...numberStyle }} />}
                                            sliderHeight={0.85 * wh}
                                            itemHeight={0.85 * wh / 8}
                                            enableMomentum={true}
                                            firstItem={this.state.pickerIndex[2]}
                                            onSnapToItem={num => this.setWeightIndex(2, num)}
                                        />
                                        <Carousel
                                            ref={(c) => { this._carousel4 = c; }}
                                            vertical={true}
                                            data={Array(10).fill().map((x, i) => { return ({ weight: i }) })}
                                            renderItem={({ item }) => <WeightItem pickerIndex={this.state.pickerIndex[3]} weightObj={item} style={{ ...numberStyle }} />}
                                            sliderHeight={0.85 * wh}
                                            itemHeight={0.85 * wh / 8}
                                            enableMomentum={true}
                                            firstItem={this.state.pickerIndex[3]}
                                            onSnapToItem={num => this.setWeightIndex(3, num)}
                                        />
                                        <Carousel
                                            ref={(c) => { this._carousel5 = c; }}
                                            vertical={true}
                                            data={Array(10).fill().map((x, i) => { return ({ weight: i }) })}
                                            renderItem={({ item }) => <WeightItem pickerIndex={this.state.pickerIndex[4]} weightObj={item} style={{ ...numberStyle }} />}
                                            sliderHeight={0.85 * wh}
                                            itemHeight={0.85 * wh / 8}
                                            enableMomentum={true}
                                            firstItem={this.state.pickerIndex[4]}
                                            onSnapToItem={num => this.setWeightIndex(4, num)}
                                        />
                                    </View>
                                    <InAndOut
                                        style={DashboardStyles.weightPromptActions}
                                        animations={[
                                            { key: 'height', start: 0, end: 0.1025 * wh }
                                        ]}
                                        direction={this.state.triggerScreenChange}
                                        duration={400}
                                    >
                                        <TouchableOpacity
                                            style={DashboardStyles.closeButton}
                                            onPress={() => this.handleWeightSubmit()}
                                        >
                                            <Text style={{ ...DashboardStyles.closeText, ...regLetterStyle }}>Submit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={DashboardStyles.closeButton}
                                            onPress={() => this.closeWeightInput()}
                                        >
                                            <Text style={{ ...DashboardStyles.closeText, ...regLetterStyle }}>Close</Text>
                                        </TouchableOpacity>
                                    </InAndOut>
                                </InAndOut>
                            </InAndOut>
                        </View>
                        : this.state.screen === "SETTINGS" ?
                            <SettingsScreen
                                updateScreen={this.updateScreen}
                                weights={weights}
                                letterStyle={letterStyle}
                                regLetterStyle={regLetterStyle}
                                numberStyle={numberStyle}
                                updateUserSettings={this.props.updateUserSettings}
                                user={user}
                                logout={this.props.logout}
                            />
                        : this.state.screen === "EXPLANATIONS" ?
                            <ExplanationsScreen
                                carbRanks={user.carb_ranks}
                                explanation={this.state.explanation}
                                letterStyle={letterStyle}
                                toggleExplanation={this.toggleExplanation}
                            />
                        : this.state.screen === "RULES" ?
                            <RulesScreen
                                updateScreen={this.updateScreen}
                                weights={weights}
                                letterStyle={letterStyle}
                                regLetterStyle={regLetterStyle}
                                numberStyle={numberStyle}
                                user={user}
                            />
                        : this.state.screen === "REFER" ?
                            <ReferScreen
                                user={user}
                                updateScreen={this.updateScreen}
                                getFriendCode={this.props.getFriendCode}
                                sendFriendCode={this.props.sendFriendCode}
                                friendCode={this.props.friendCode}
                                regLetterStyle={regLetterStyle}
                            />
                        : this.state.screen === "HISTORY" ?
                            <HistoryScreen
                                user={user}
                                updateScreen={this.updateScreen}
                                weights={weights}
                                idealWeight={weightFromKg(user.ideal_weight_kg, user.weight_units)}
                                dates={dates}
                                regLetterStyle={regLetterStyle}
                                levelMap={this.state.levelMap}
                            />
                        : null
                    }
                    
                </View>
                }
            </View>
        );
    }
}
class WeightItem extends React.PureComponent {

    render() {
        let weight = this.props.weightObj.weight;
        let style = { ...DashboardStyles.weightItem, ...this.props.style };
        if (weight === this.props.pickerIndex) {
            style = { ...style, ...DashboardStyles.selectedWeight }
        }
        return (
            <Text style={style}>{weight}</Text>
        )
    }
}