import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';

import { convertWeight, weightFromKg, planTitles, planDetails, weightStringFromKg } from './utilities';
import InteractionArea from './InteractionArea';
import { Dimensions } from 'react-native';
import SettingsStyles from './styles/SettingsStyles';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class SettingsScreen extends Component {
    state = {
        openSetting: null,
        confirmReset: false
    }
    updateSettings = (key, value) => {

        if (key === "ideal_weight_kg") {
            value = convertWeight(parseFloat(value), this.props.user.weight_units);
        } else if (key === "alcohol") {
            if (value === "Yes") {
                value = true;
            } else if (value === "No") {
                value = false;
            }
        }
        this.props.updateUserSettings(key, value)
        this.setState({ openSetting: null }, () => {
            this.closeSetting();
        })
    }
    resetLevels() {
        //this.props.updateUserSettings("starting_weight", this.props.weights.length-1);
        //this.props.updateUserSettings("mode", 0);
    }
    openSettings = val => {
        this.setState({
            openSetting: val
        })
    }
    closeSetting = () => {
        this.setState({
            openSetting: null
        })
    }
    render() {
        let user = this.props.user;
        return (
            <View style={SettingsStyles.settingsContainer}>
{
                        this.state.openSetting !== null ?
                            <OpenSetting
                                openSetting={this.state.openSetting}
                                updateSettings={this.updateSettings}
                                closeSetting={this.closeSetting}
                                numberStyle={this.props.numberStyle}
                                regLetterFont={this.props.regLetterStyle}
                                user={this.props.user}
                            />
                        : null
                    }
                <ScrollView contentContainerStyle={SettingsStyles.settingsContainerInner}>
                    <View style={SettingsStyles.settingsSection}>
                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("alcohol")}
                        >

                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='cocktail' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Alcohol</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.alcohol ? "Yes" : "No"}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>
                        {
                            true ? //this.props.weights[this.props.weights.length - 1] <= this.props.user.ideal_weight_kg ?

                                <TouchableOpacity
                                    style={SettingsStyles.settingsOption}
                                    onPress={() => this.openSettings("carb_ranks")}
                                >

                                    <View style={SettingsStyles.openSettingBox}>
                                        <FontAwesomeIcon icon='sort-amount-up-alt' style={SettingsStyles.settingsOptionTitle} />
                                        <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Incentive Ranks</Text>
                                    </View>
                                    <View style={SettingsStyles.openSettingBox}>
                                        <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>Change</Text>
                                        <FontAwesomeIcon
                                            icon='angle-right'
                                            size={0.06 * Dimensions.get('window').width}
                                            color={"rgba(20, 20, 20, 0.6)"}
                                        />
                                    </View>
                                </TouchableOpacity>
                                : null
                        }

                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("ideal_weight_kg")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='laugh-beam' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Ideal Weight</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{weightStringFromKg(user.ideal_weight_kg, user.weight_units)}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={SettingsStyles.settingsSection}>
                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("weight_units")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='weight' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Weight Units</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.weight_units}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("height_units")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='ruler' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Height Units</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.height_units}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("sex")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='venus-mars' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Sex</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.sex}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={SettingsStyles.settingsSection}>
                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("email")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='envelope' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Email</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.email}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("value")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='coins' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Value</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{ ...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle }}>{user.monetary_value}</Text>
                                <FontAwesomeIcon
                                    icon='angle-right'
                                    size={0.06 * Dimensions.get('window').width}
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>
                        {/*<TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.openSettings("payment_option")}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='stream' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{...SettingsStyles.settingLabel, ...this.props.regLetterStyle}}>Plan</Text>
                            </View>
                            <View style={SettingsStyles.openSettingBox}>
                                <Text style={{...SettingsStyles.settingsCurrentOption, ...this.props.regLetterStyle}}>{'\"' + planTitles[user.payment_option-1] + '\"'}</Text> 
                                <FontAwesomeIcon
                                    icon='angle-right' 
                                    size={0.06 * Dimensions.get('window').width} 
                                    color={"rgba(20, 20, 20, 0.6)"}
                                />
                            </View>
                        </TouchableOpacity>
                        */
                        }
                    </View>

                    <View style={SettingsStyles.settingsSection}>
                        <TouchableOpacity
                            style={SettingsStyles.settingsOption}
                            onPress={() => this.props.logout()}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='sign-out-alt' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>Log out</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={SettingsStyles.settingsSection}>
                        <TouchableOpacity
                            onPress={() => this.resetLevels()}
                            style={SettingsStyles.settingsOption}
                        >
                            <View style={SettingsStyles.openSettingBox}>
                                <FontAwesomeIcon icon='redo' style={SettingsStyles.settingsOptionTitle} />
                                <Text style={{ ...SettingsStyles.settingLabel, ...this.props.regLetterStyle }}>
                                    Reset levels from current weight
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>*/}
                </ScrollView>
            </View>
        )
    }
}
class OpenSetting extends Component {
    constructor(props) {
        super(props);
        let title = props.openSetting.replace(/_/g, " ");
        if (this.props.openSetting === "ideal_weight_kg") {
            title = "Ideal Weight";
        }
        let val = props.user[props.openSetting];
        if (props.openSetting === "ideal_weight_kg") {
            val = '' + weightFromKg(props.user.ideal_weight_kg, props.user.weight_units)
        }
        if (props.openSetting === "alcohol") {

            if (val) {
                val = "Yes";
            } else {
                val = "No";
            }
        }
        if (props.openSetting === "payment_option") {
            title = "Plan";
            val = parseInt(props.user[props.openSetting]);
        }
        this.state = {
            val: val,
            title: title
        }
    }
    updateVal(val) {
        this.setState({
            val: val
        })
    }
    render() {
        let user = this.props.user;
        let title = this.state.title;
        let lightboxStyle = SettingsStyles.lightboxBody;
        if (this.props.openSetting === "carb_ranks") {
            lightboxStyle = { ...lightboxStyle, paddingTop: 0, flex: 1 };
        }
        return (
            <View style={SettingsStyles.lightboxContainer}>
            <ScrollView contentContainerStyle={SettingsStyles.lightboxScroller}>
                <View style={SettingsStyles.lightboxInner}>
                    <View style={SettingsStyles.lightboxHeader}>
                        <Text
                            style={{
                                ...SettingsStyles.openSettingTitle,
                                ...this.props.regLetterStyle
                            }}
                        >{title}</Text>
                    </View>
                    <View style={lightboxStyle}>
                        {
                            this.props.openSetting === "email" ?
                                <TextInput
                                    onChangeText={text => this.updateVal(text)}
                                    type='text'
                                    placeholder="Your Email"
                                    style={SettingsStyles.settingInput}
                                    value={this.state.val}
                                />
                                : this.props.openSetting === "alcohol" ?
                                    <SettingPicker
                                        selectedValue={this.state.val}
                                        onValueChange={val => this.updateVal(val)}
                                        items={[
                                            "Yes",
                                            "No"
                                        ]}
                                    />
                                    : this.props.openSetting === "carb_ranks" ?
                                        <CarbOrder
                                            alcohol={user.alcohol}
                                            carbRanks={this.state.val}
                                            updateCarbRanks={order => this.updateVal(order)}
                                            updateSettings={this.props.updateSettings}
                                        />
                                        : this.props.openSetting === "weight_units" ?
                                            <SettingPicker
                                                selectedValue={this.state.val}
                                                style={SettingsStyles.settingsSelect}
                                                onValueChange={val => this.updateVal(val)}
                                                items={[
                                                    "Pounds",
                                                    //"Stones",
                                                    "Kilograms"
                                                ]}
                                            />
                                            : this.props.openSetting === "height_units" ?
                                                <SettingPicker
                                                    selectedValue={this.state.val}
                                                    style={SettingsStyles.settingsSelect}
                                                    onValueChange={val => this.updateVal(val)}
                                                    items={[
                                                        "Feet / Inches",
                                                        "Centimeters"
                                                    ]}
                                                />
                                                : this.props.openSetting === "value" ?
                                                    <TextInput
                                                        onChangeText={val => this.updateVal(val)}
                                                        defaultValue={'' + user.monetary_value / 100}
                                                        style={SettingsStyles.settingInput}
                                                        placeholder="Your ideal weight is worth:"
                                                    />
                                                    : this.props.openSetting === "sex" ?
                                                        <SettingPicker
                                                            selectedValue={this.state.val}
                                                            style={SettingsStyles.settingsSelect}
                                                            onValueChange={val => this.updateVal(val)}
                                                            items={[
                                                                "Male",
                                                                "Female",
                                                                "Other"
                                                            ]}
                                                        />
                                                        : this.props.openSetting === "payment_option" ?
                                                            <SettingPicker
                                                                selectedValue={this.state.val}
                                                                style={SettingsStyles.settingsSelect}
                                                                onValueChange={val => this.updateVal(val)}
                                                                items={[
                                                                    { component: PlanOption, title: planTitles[0], details: planDetails[0], style: SettingsStyles.paymentOptionOne, plan: 1 },
                                                                    { component: PlanOption, title: planTitles[1], details: planDetails[1], style: SettingsStyles.paymentOptionTwo, plan: 2 },
                                                                    { component: PlanOption, title: planTitles[2], details: planDetails[2], style: SettingsStyles.paymentOptionThree, plan: 3 },
                                                                ]}
                                                            />
                                                            : this.props.openSetting === "ideal_weight_kg" ?
                                                                <TextInput
                                                                    onChangeText={text => this.updateVal(text)}
                                                                    style={SettingsStyles.settingInput}
                                                                    placeholder="Ideal Weight"
                                                                    keyboardType='numeric'
                                                                    value={'' + this.state.val}
                                                                />
                                                                : null
                        }
                    </View>
                    <View style={SettingsStyles.settingSubmissionArea}>
                        <TouchableOpacity
                            style={SettingsStyles.settingSubmit}
                            onPress={() => this.props.updateSettings(this.props.openSetting, this.state.val)}
                        >
                            <Text
                                style={{
                                    ...SettingsStyles.submitText,
                                    ...this.props.regLetterStyle
                                }}
                            >Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </View>
        )
    }
}
class PlanOption extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = { ...SettingsStyles.paymentOption, ...this.props.style };
        if (this.props.selected) {
            style = { ...style, ...SettingsStyles.selectedPayment }
        }
        return (
            <TouchableOpacity
                onPress={() => this.props.chooseItem()}
                style={style}
            >
                <Text style={{ ...IntroStyles.optionHeader, fontFamily: 'raleway-bold' }}>{this.props.title}</Text>
                <Text style={IntroStyles.optionText}>
                    {this.props.details}
                </Text>
            </TouchableOpacity>
        )
    }
}
class SettingPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.selectedValue
        }
    }
    chooseItem(item) {
        this.setState({
            selectedValue: item
        }, () => {
            this.props.onValueChange(item)
        })
    }
    render() {
        return (
            <View style={{ ...SettingsStyles.settingItemPicker }}>
                {this.props.items.map((item, i) => {
                    if (typeof item !== "object") {
                        let currSelected = false;
                        if (typeof this.props.selectedValue === "string") {
                            if (item.toUpperCase() === this.props.selectedValue.toUpperCase()) {
                                currSelected = true;
                            }
                        } else if (typeof this.props.selectedValue === "number") {
                            if (item === this.props.selectedValue) {
                                currSelected = true;
                            }
                        }
                        return (
                            <TouchableOpacity
                                key={i}
                                style={currSelected ? { ...SettingsStyles.settingItem, ...SettingsStyles.settingItemSelected }
                                    : SettingsStyles.settingItem}
                                onPress={() => this.chooseItem(item)}
                            >
                                <Text style={currSelected ?
                                    { ...SettingsStyles.lightboxSelectedText, ...SettingsStyles.settingItemText }
                                    :
                                    { ...SettingsStyles.settingItemText }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    } else {
                        let Item = item.component;
                        let currSelected = false;
                        if (this.state.selectedValue == item.plan) {
                            currSelected = true;
                        }
                        return <Item selected={currSelected} chooseItem={() => this.chooseItem(item.plan)} key={i} title={item.title} details={item.details} style={item.style} />;
                    }
                })}
            </View>
        )
    }
}
class CarbOrder extends Component {
    render() {
        let carbLabels = ["Breads", "Pasta/Rice", "Potatoes", "Dessert", "Soft Drinks", "Snack Carbs", "Cereals", "Hard Alcohol", "Beer/Wine"];
        if (!this.props.alcohol) {
            carbLabels = ["Breads", "Pasta/Rice", "Potatoes", "Dessert", "Soft Drinks", "Snack Carbs", "Cereals"];
        }
        let carbRanks = this.props.carbRanks;
        return (
            <InteractionArea
                update={choices => this.props.updateCarbRanks(choices)}
                choices={carbRanks}
                options={[]}
                labels={carbLabels}
                containerStyle={SettingsStyles.carbRanks}
            />
        )
    }
}