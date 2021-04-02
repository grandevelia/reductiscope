import { addNotification } from './notifications';
import { updateUserSettings } from './auth';
import { apiTarget } from '../settings';
import { setError, removeErrors } from './errors.js';
import moment from 'moment';

export const fetchWeights = () => {
	return (dispatch, getState) => {
		let headers = { "Content-Type": "application/json" };
		let { token } = getState().auth;
		if (token) {
			headers["Authorization"] = "Token " + token;
		}

		return fetch(apiTarget + "api/weights/", { headers, })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					})
				} else {
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					return dispatch({ type: 'FETCH_WEIGHTS', weights: res.data });

				} else if (res.status === 401 || res.status === 403) {
					return dispatch({ type: "AUTHENTICATION_ERROR", data: res });
				}
			})
	}
}

export const addWeight = (weight_kg, date_added) => {
	return (dispatch, getState) => {
		let state = getState();
		let user = state.auth.user;
		let dates = state.weights.dates;

		let headers = { "Content-Type": "application/json" };
		let { token } = state.auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}

		let body = JSON.stringify({ weight_kg, date_added });
		return fetch(apiTarget + "api/weights/", { headers, method: "POST", body })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					})
				} else {
					throw res;
				}
			})
			.then(res => {
				if (res.status === 201) {
					//if this new weight is before the user's current starting index, increment the starting index
					if (moment(dates[user.starting_weight]).isAfter(date_added)) {
						dispatch(updateUserSettings("starting_weight", user.starting_weight + 1));
					}

					return dispatch({ type: 'ADD_WEIGHT', weight: res.data });

				} else if (res.status === 401 || res.status === 403) {
					dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
				}
			})
	}
}

export const updateWeight = (weight_kg, id) => {
	return (dispatch, getState) => {
		let state = getState();
		let user = state.auth.user;

		let weights = state.weights.weights;
		let ids = state.weights.ids;

		let updatingStartingWeight = false;
		for (let i = 0; i < weights.length; i++) {
			if (ids[i] === id && i === user.starting_weight) {
				updatingStartingWeight = true;
				break;
			}
		}
		if (updatingStartingWeight && user.ideal_weight_kg >= weight_kg) {
			return dispatch(setError("Starting weight can't be below ideal weight"));
		}
		let headers = {
			"Content-Type": "application/json"
		};
		let { token } = state.auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}
		let body = JSON.stringify({ weight_kg });
		return fetch(apiTarget + 'api/weights/' + id + "/update_weight/", { headers, method: "PATCH", body })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					})
				} else {
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					let user = getState().auth.user;

					if (weights.length) {
						//If the user is in weight loss mode, check for ideal weight breakthrough when last weight is changed
						if (user.mode === "0" && id === ids[ids.length - 1]) {

							//Breakthrough only if the next most recent weight was above ideal weight
							if (weight_kg <= user.ideal_weight_kg && weights[weights.length - 1] > user.ideal_weight_kg) {
								dispatch(addNotification("Congratulations! You've reached your ideal weight. You may now enter Maintenance Mode. Our focus will switch from helping you lose weight to helping you stay where you're at: the perfect weight for you."));
							}
						}
					}
					return dispatch({ type: 'UPDATE_WEIGHT', weight_kg: weight_kg, id: id });
				} else if (res.status === 401 || res.status === 403) {
					dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
				}
			})
	}
}