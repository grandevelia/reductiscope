import { guessWeightsToNow, interpolateDates } from '../utilities';
import moment from 'moment';
const initialState = {
	weights: [],
	dates: [],
	ids: [],
	lastDate: null
};

export default function weights(state = initialState, action){
	let weights = state.weights;
	let dates = state.dates;
	let ids = state.ids;

	switch (action.type) {

		case 'FETCH_WEIGHTS':
			let weightObj = action.weights;
			let tmpWeights = [];
			let tmpDates = [];
			let tmpIds = [];

			Object.keys(weightObj).map(key => {
				tmpDates.push(weightObj[key]['date_added']);
				tmpWeights.push(weightObj[key]['weight_kg']);
				tmpIds.push(weightObj[key]['id']);
				return "";
			});

			//interpolate missing data
			let interpData = interpWeightData(tmpWeights, tmpDates, tmpIds);
			
			weights = interpData.weights;
			dates = interpData.dates;
			ids = interpData.ids;
			return {...state, weights: weights, dates: dates, ids: ids, lastDate: tmpDates[tmpDates.length - 1]};

		case 'ADD_WEIGHT': {
			/*
			let index = 0; //If date is before all in state, add to beginning
			let newWeightDate = moment(action.weight.date_added);
			for (let i = dates.length; i > 0; i --){
				if (newWeightDate.isAfter(moment(dates[i-1]))){
					index = i;
					break;
				}
			}
			weights.splice(index, 0, action.weight.weight_kg);
			dates.splice(index, 0, action.weight.date_added);
			ids.splice(index, 0, action.weight.id);
			let interpData = interpolateDates(weights, dates, ids);
			weights = interpData.weights;
			dates = interpData.dates;
			ids = interpData.ids;
			*/
			weights.push(action.weight.weight_kg);
			dates.push(action.weight.date_added);
			ids.push(action.weight.id);
			return {...state, weights: weights, dates: dates, ids: ids, lastDate: dates[dates.length - 1]};
		}

		case 'UPDATE_WEIGHT': {
			let index = -1;
			for (let i = 0; i < ids.length; i ++){
				if (ids[i] === action.id){
					index = i;
					break;
				}
			}
			if (index < 0){
				return;
			}
			weights[index] = action.weight_kg;
			let interpData = interpolateDates(weights, dates, ids);
			weights = interpData.weights;
			dates = interpData.dates;
			ids = interpData.ids;
			
			return {...state, weights: weights, dates: dates, ids: ids};
		}
		
		default:
			return state;
	}
}

const interpWeightData = (weights, dates, ids) => {
	let interpData = interpolateDates(weights, dates, ids);

	//Don't use first element of second array to avoid duplicate join point
	tmpWeights = interpData.weights;
	tmpDates = interpData.dates;
	tmpIds = interpData.ids;

	//Ensure weights are present up to current day
	interpData = guessWeightsToNow(tmpWeights, tmpDates, tmpIds);
	weights = interpData.weights;
	dates = interpData.dates;
	ids = interpData.indexes;
	return {weights: weights, dates: dates, ids: ids}
}