import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';
import IntroStyles from './styles/IntroStyles.js';

export const iconPaths = [
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
export const carbOrder = [5, 0, 4, 1, 6, 2, 3, 7, 8];
export const carbOptions = [
	"Breads",
	"Pasta",
	"Potatoes",
	"Dessert",
	"Soft Drinks",
	"Snacks",
	"Grains",
	"Hard Alcohol",
	"Beer/Wine"
];
export const numLevels = 8; //7 incentive levels, plus zero level
export const carbList = [
	["Raised Breads", "Flatbreads", "Croissants", "Muffins", "Scones", "Tortillas", "Naan", "Pizza Crust", "Crackers", "etc."],
	["All kinds, separate or part of a dish", "Cous-cous"],
	["Potatoes", "Yams", "Sweet Potatoes", "Casava", "Separate or part of a dish"],
	["Any sugar/sweet treat (no exceptions)"],
	["Soda/pop (diet, too)", "Fruit Juice (even if 100% fruit)"],
	["Chips/Crisps", "Crackers", "Pretzels", "Popcorn", "etc.", "Nuts are allowed, unless coated in sugary or sweet substances."],
	["Rice", "Wheat", "Corn", "Oats", "Cold Breakfast Cereals", "Granola", "Oatmeal", "etc"],
	["Cocktails, spirits, etc. (Other than beer or wine.)"],
	["All kinds, including sherry, prosecco, etc."]
];
export const nonCarbList = [
	"Vegetables (other than potatoes)",
	"Fresh or frozen fruit (no sugar added)",
	"Dairy products",
	"Eggs",
	"Murder Hornets (baked, fried, or other)",
	"Nuts",
	"Beans & Legumes (other than potatoes)",
	"Meat of any kind",
	"Water, coffee, tea",
];
export const maintenanceCarbOrder = [3, 2, 4, 1, 0, 5, 6, 7, 8];
export const maintenanceAvgs = [3, 5, 7, 10, 14, 19];
export const planTitles = ["Classic", "Slow Burn", "I Need More Proof"];
export const planDetails = ["Pay something now, and something when you achieve your ideal weight.",
	"Pay some now, some later", "Pay only at the end (or not at all)"];

export function calcRobinson(heightInches, sex) {
	let baseHeight;
	let baseWeight;
	let weightPerInch;
	if (sex === 'male') {
		baseHeight = 5 * 12;
		baseWeight = 52;
		weightPerInch = 1.9;
	} else {
		baseHeight = 5 * 12;
		baseWeight = 49;
		weightPerInch = 1.7;
	}
	let diffHeight = heightInches - baseHeight;
	return (weightPerInch * diffHeight + baseWeight);
}
export function calcMiller(heightInches, sex) {
	let baseHeight;
	let baseWeight;
	let weightPerInch;
	if (sex === 'male') {
		baseHeight = 5 * 12;
		baseWeight = 56.2;
		weightPerInch = 1.41;
	} else {
		baseHeight = 5 * 12;
		baseWeight = 53.1;
		weightPerInch = 1.36;
	}
	let diffHeight = heightInches - baseHeight;
	return (weightPerInch * diffHeight + baseWeight);
}
export function calcDevine(heightInches, sex) {
	let baseHeight;
	let baseWeight;
	let weightPerInch;
	if (sex === 'male') {
		baseHeight = 5 * 12;
		baseWeight = 50;
		weightPerInch = 2.3;
	} else {
		baseHeight = 5 * 12;
		baseWeight = 45.5;
		weightPerInch = 2.3;
	}
	let diffHeight = heightInches - baseHeight;
	return (weightPerInch * diffHeight + baseWeight);
}
export function calcHamwi(heightInches, sex) {
	let baseHeight;
	let baseWeight;
	let weightPerInch;
	if (sex === 'male') {
		baseHeight = 5 * 12;
		baseWeight = 106;
		weightPerInch = 6;
	} else {
		baseHeight = 5 * 12;
		baseWeight = 100;
		weightPerInch = 5;
	}
	let diffHeight = heightInches - baseHeight;
	return poundsToKg(weightPerInch * diffHeight + baseWeight);
}
export function averageAlgs(heightInches, sex) {
	if (sex === 'other') {
		return (calcRobinson(heightInches, 'female') + calcMiller(heightInches, 'female') + calcDevine(heightInches, 'female') + calcHamwi(heightInches, 'female') + calcRobinson(heightInches, 'male') + calcMiller(heightInches, 'male') + calcDevine(heightInches, 'male') + calcHamwi(heightInches, 'male')) / 8;
	}
	return (calcRobinson(heightInches, sex) + calcMiller(heightInches, sex) + calcDevine(heightInches, sex) + calcHamwi(heightInches, sex)) / 4;
}
export function poundsToKg(pounds) {
	return 0.453592 * pounds;
}
export function kgToPounds(kg) {
	return kg / 0.453592;
}
export function kgToStone(kg) {
	return kgToPounds(kg) / 14;
}
export function convertWeight(primary, units, secondary = 0) {
	if (units === "Stones") {
		return poundsToKg(parseFloat(primary, 10) * 14 + parseFloat(secondary, 10));
	} else if (units === "Pounds") {
		return poundsToKg(parseFloat(primary, 10));
	}
	return primary;
}
export function idealWeightString(weightUnits, heightUnits, sex, primary, secondary) {
	let heightInches = calcHeightInches(heightUnits, primary, secondary);
	let weightKg = averageAlgs(heightInches, sex);

	return weightStringFromKg(weightKg, weightUnits);
}
export function idealWeightKg(heightInches, sex) {
	return averageAlgs(heightInches, sex);
}
export function weightFromKg(weightKg, targetUnit) {
	if (targetUnit === "Stones") {
		let tmp = weightStringFromKg(weightKg).match(/\d/g);
		return 14 * tmp[0] + tmp[1];
	}
	return parseFloat(weightStringFromKg(weightKg, targetUnit));
}
export function weightStringFromKg(weightKg, targetUnit) {

	if (targetUnit === "Pounds") {
		return parseFloat(Math.round(kgToPounds(weightKg) * 100) / 100).toFixed(2) + " pounds";

	} else if (targetUnit === "Stones") {
		let stone = kgToStone(weightKg);
		let remainder = stone % 1;
		if (Math.floor(stone) > 0) {
			return Math.floor(stone) + " st " + Math.round(remainder * 14);
		} else {
			return Math.round(remainder * 14);
		}
	}
	return parseFloat(Math.round(weightKg * 100) / 100).toFixed(2) + " Kilograms";
}
export function roundWeightStringFromKg(weightKg, targetUnit) {

	if (targetUnit === "Pounds") {
		return Math.round(kgToPounds(weightKg)) + " pounds";

	} else if (targetUnit === "Stones") {
		let stone = kgToStone(weightKg);
		let remainder = stone % 1;
		if (Math.floor(stone) > 0) {
			return Math.floor(stone) + " st " + Math.round(remainder * 14);
		} else {
			return Math.round(remainder * 14);
		}
	}
	return Math.round(weightKg) + " Kilograms";
}
export function displayWeightFromKg(weightKg, targetUnit, zeros = true) {
	if (!weightKg){
		return("000.00");
	}
	let w = weightStringFromKg(weightKg, targetUnit).split(" ")[0];
	if (zeros === true) {
		//prepend with 0s if the weightString doesn't fill the available spaces (52.01 -> 052.01)
		let n = 6 - w.length;
		let zeroes = Array(n).fill(0);
		w = [
			...zeroes, ...w.split("")
		].join("");
	}
	return w;
}
export function weightString(weight, units) {
	if (units === "Pounds") {

		return weight + " Pounds";

	} else if (units === "Stones") {

		let tmp = weight / 14;
		let stone = Math.floor(tmp);
		let pounds = (tmp - stone) * 14;
		return stone + " st " + pounds;

	}

	return parseFloat(Math.round(weight * 100) / 100).toFixed(2) + " Kg";
}
export function calcHeightInches(units, primary, secondary) {
	if (units === "Feet / Inches") {
		return 12 * parseInt(primary, 10) + parseInt(secondary, 10);
	} else {
		return parseInt(primary, 10) / 2.54;
	}
}
export const interpolateDates = (weightArr, dateArr, originalIds = false) => {
	/*
	* If originalIds is false, the indexes of interpolated dates will be returned
	* if it is an array of ids, null will be interpolated in between the original ids
	*/

	let indexes;
	if (originalIds === false) {
		indexes = [];
	}
	for (let i = 0; i < dateArr.length - 1; i++) {
		let currDate = dateArr[i];
		let dateDiff = Math.ceil(moment(dateArr[i + 1]).diff(moment(currDate), "days", true));
		if (dateDiff > 1) {
			let currWeight = weightArr[i];
			let nextWeight = weightArr[i + 1];
			let weightPerDay = (nextWeight - currWeight) / dateDiff;

			for (let j = 1; j < dateDiff; j++) {

				let newDate = moment(currDate).add(j, "days");
				dateArr.splice(i + j, 0, newDate.format("YYYY-MM-DD"));
				weightArr.splice(i + j, 0, currWeight + (weightPerDay * j));
				if (originalIds === false) {
					indexes.push(i + j);
				} else {
					originalIds.splice(i + j, 0, null);
				}
			}
			i += dateDiff - 1; //Minus one because i increments after this loop
		}
	}
	if (originalIds === false) {
		return {
			weights: weightArr,
			dates: dateArr,
			ids: indexes
		}
	} else {
		return {
			weights: weightArr,
			dates: dateArr,
			ids: originalIds
		}
	}
}
export const lossModeLevel = (initialWeight, idealWeight, currentWeight) => {
	let numLevels = 8;
	//	Divide by numLevels here since there are numSections - 1 = numLevels increments between the sections
	let kgPerSection = (initialWeight - idealWeight) / numLevels;
	let level = Math.floor((initialWeight - currentWeight) / kgPerSection);

	if (level >= 1) {
		//First level is two increments from initial weight
		level = level - 1;
	} else if (level < 0) {
		//If user has increased in weight, they are still level 0
		level = 0;
	}
	if (level > 7) {
		//Weight loss levels stop at 7
		level = 7;
	}
	return level;
}
export const guessWeightsToNow = (weights, dates, ids = false) => {
	let lastDay = dates[dates.length - 1];
	let lastWeight = weights[dates.length - 1];
	let dayDiff = moment().diff(moment(lastDay), "days");
	for (let i = 1; i <= dayDiff; i++) {
		dates.push(moment(lastDay).add(i, "days").format("YYYY-MM-DD"));
		weights.push(lastWeight);
		if (ids !== false) {
			ids.push(null);
		}
	}
	return {
		weights: weights,
		dates: dates,
		indexes: ids
	}
}
export const allowedCarbs = (end, carbRanks, letterStyle) => {
	let allowed = [];
	for (let i = end - 1; i >= 0; i--) {
		allowed.push(
			<AllowedCarb key={i} i={i} carbRanks={carbRanks} letterStyle={letterStyle} />
		);
	}
	return allowed;
}
class AllowedCarb extends Component {
	render() {
		let i = this.props.i;
		let carbRanks = this.props.carbRanks;
		let letterStyle = this.props.letterStyle;
		return (
			<View style={IntroStyles.iconOuterWrap}>
				<Text style={{ ...IntroStyles.iconLabel, fontFamily: letterStyle }}>{carbOptions[carbRanks[carbOrder[i]]]}</Text>
				<View style={IntroStyles.allowedIconWrap}>
					<Image
						style={IntroStyles.iconImage}
						source={iconPaths[carbRanks[carbOrder[i]]]}
					/>
				</View>
			</View>
		)
	}
}