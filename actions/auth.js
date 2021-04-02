import { AsyncStorage } from 'react-native';
import { apiTarget } from '../settings.js';
import { setError, removeErrors } from './errors.js';

export const getUserToken = () => {
	return (dispatch => {
		return (
			AsyncStorage.getItem('token')
			.then(token => {
				if (token) {
					dispatch({ type: "TOKEN_LOADED", token: token });
					return true;
				} else {
					throw "Could not find token";
				}
			})
			.catch((err) => {
				return (dispatch({ type: 'AUTHENTICATION_ERROR' }));
			})
		)
	})
}

export const loadUser = () => {
	return (dispatch, getState) => {
		dispatch({ type: "USER_LOADING" });
		const token = getState().auth.token;
		let headers = {
			"Content-Type": "application/json"
		};
		if (token) {
			headers["Authorization"] = "Token " + token;
		}

		return fetch(apiTarget + "api/auth/user-info/", { headers, })
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
				dispatch({ type: 'USER_LOADED', user: res.data });
				return res.data;
			} else if (res.status >= 400 && res.status < 500) {
				dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
			}
		})
	}
}

export const login = (email, password) => {
	return dispatch => {
		let headers = {
			"Content-Type": "application/json"
		};
		let body = JSON.stringify({ email, password });
		return fetch(apiTarget + "api/auth/login/", { headers, body, method: "POST" })
		.then(res => {
			if (res.status < 500) {
				return res.json().then(data => {
					return { status: res.status, data }
				})
			} else {
				throw res;
			}
		})
		.then(res => {
			if (res.status === 200) {
				dispatch({
					type: 'LOGIN_SUCCESSFUL',
					data: res.data
				});
				return res.data;
			} else if (res.status === 403 || res.status === 401 || res.status === 400) {
				dispatch({ type: 'AUTHENTICATION_ERROR' });
				dispatch(setError("Invalid credentials"));
			}
		})
	}
}

export const register = (email, password, alcohol, carb_ranks, weight_units, height_units,
	height_inches, weight_kg, ideal_weight_kg, monetary_value, sex) => {
	return dispatch => {
		let headers = {
			"Content-Type": "application/json"
		};
		if (!email) {
			return dispatch(setError("Email is required"));
		} else if (!password) {
			return dispatch(setError("Password is required"));
		}
		//return fetch(apiTarget + "api/auth/admin-delete/", {headers, method: "POST"})
		monetary_value = Math.round(parseInt(monetary_value * 100, 10));
		let body = JSON.stringify({
			email, weight_kg, password, alcohol, carb_ranks, weight_units, height_units,
			height_inches, ideal_weight_kg, monetary_value, sex
		});
		return fetch(apiTarget + "api/auth/register/", { headers, body, method: "POST" })
		.then(res => {
			if (res.status < 500) {
				return res.json().then(data => {
					return { status: res.status, data }
				})
			}
			throw res;
		})
		.then(res => {
			if (res.status === 200) {
				dispatch(removeErrors());
				return dispatch(login(email, password))
			}
			throw res;
		})
		.catch(err => {
			let errDat = "Error";
			if (err.data.email) {
				errDat = err.data.email[0];
				if (errDat === "user with this email already exists.") {
					errDat = "Email already registered.";
				} else {
					errDat = "Invalid Email";
				}
			}
			dispatch({ type: 'AUTHENTICATION_ERROR', email: email });
			dispatch(setError(errDat));
		})
	}
}

export const logout = () => {
	return (dispatch, getState) => {
		let headers = { "Content-Type": "application/json" };
		let { token } = getState().auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}

		return fetch(apiTarget + "api/auth/logout/", { headers, body: "", method: "POST" })
		.then(res => {
			if (res.status === 204) {
				return { status: res.status, data: {} };
			} else if (res.status < 500) {
				return res.json().then(data => {
					return { status: res.status, data };
				})
			} else {
				throw res;
			}
		})
		.then(res => {
			if (res.status === 204) {
				dispatch({ type: 'LOGOUT_SUCCESSFUL' });
				return res.data;
			} else if (res.status === 403 || res.status === 401) {
				dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
				dispatch(setError(res.data));;
			}
		})
	}
}

export const updateUserSettings = (key, value) => {
	if (key === 'monetary_value' || key === 'amount_paid') {
		value = Math.round(parseInt(value * 100, 10));
	}
	return (dispatch, getState) => {
		let headers = { "Content-Type": "application/json" };
		let { token } = getState().auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}
		let settings = { [key]: value };
		let body = JSON.stringify(settings);
		return fetch(apiTarget + "api/auth/update-user/", { headers, body, method: "PATCH" })
		.then(res => {
			if (res.status < 500) {
				return res.json().then(data => {
					return { status: res.status, data };
				})
			} else {
				return (dispatch(setError("Error")));
			}
		})
		.then(res => {
			if (res.status === 200) {
				if (key === "alcohol") {
					let carbs = getState().auth.user.carb_ranks;

					if (value === true && carbs.length === 7) {
						carbs = carbs.concat([7, 8])
					} else if (value === false && carbs.length === 9) {
						carbs.splice(carbs.indexOf(8), 1);
						carbs.splice(carbs.indexOf(7), 1);
					}
					return dispatch(updateUserSettings("carb_ranks", carbs));
				}
				return dispatch({ type: 'SETTING_CHANGE', user: res.data });
			} else if (res.status >= 400 && res.status < 500) {
				dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
				dispatch(setError(res.data));
			}
		})
	}
}
export const resetPassword = email => {
	return dispatch => {
		let headers = { "Content-Type": "application/json" };
		let body = JSON.stringify({ email });
		return fetch(apiTarget + "api/auth/forgot-password/", { headers, body, method: "POST" })
		.then(res => {
			if (res.status < 500) {
				return res.json().then(data => {
					return { status: res.status, data };
				})
			}
			throw "Your password could not be reset";

		})
		.then(res => {
			if (res.status === 200) {
				dispatch({ type: "RESET_PASSWORD", email: res.data.email, status: true });
				return res.data
			}
			throw "Your password could not be reset";
		})
		.catch((err) => {
			dispatch(setError(err));
		})
	}
}
export const confirmReset = (email, key) => {
	return dispatch => {
		let headers = { "Content-Type": "application/json" };
		let body = JSON.stringify({ email, key });
		return fetch(apiTarget + "api/auth/confirm-password-reset/", { headers, body, method: "POST" })
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
				dispatch({ type: "RESET_PASSWORD", status: true, email: email, key: key });
				return res.data
			} else {
				dispatch({ type: "RESET_PASSWORD", status: false, email: null });
				throw res;
			}
		})
		.catch(err => {
			return dispatch(setError(err));
		})
	}
}
export const updatePassword = (email, key, password) => {
	return dispatch => {
		let headers = { "Content-Type": "application/json" };
		let body = JSON.stringify({ "email": email, "key": key, "password": password });
		return fetch(apiTarget + "api/auth/update-password/", { headers, body, method: "POST" })
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
					dispatch({ type: "UPDATE_PASSWORD", status: true });
					return res.data
				} else {
					dispatch({ type: "UPDATE_PASSWORD", status: false, reason: res.data });
					throw res;
				}
			})
			.catch(err => {
				return dispatch(setError(err));
			})
	}
}
export const toggleVacation = () => {
	return (dispatch, getState) => {
		let vacationStatus = !getState().auth.user.vacation;
		let headers = { "Content-Type": "application/json" };
		let body = JSON.stringify({ "vacation": vacationStatus })
		let { token } = getState().auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}
		return fetch(apiTarget + "api/auth/update-user/", { headers, body, method: "PATCH" })
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
					return dispatch({ type: 'SETTING_CHANGE', user: res.data });
				} else if (res.status >= 400 && res.status < 500) {
					dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
					throw res.data;
				}
			})
			.catch(err => {
				return dispatch(setError(err));
			})
	}
}
export const getFriendCode = () => {
	return (dispatch, getState) => {
		if (getState().auth.user.available_invites < 1) {
			return dispatch(setError("You're out of invites!"));
		}

		let headers = { "Content-Type": "application/json" };
		let { token } = getState().auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}
		return fetch(apiTarget + "api/auth/get-friend-code/", { headers })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					})
				} else {
					throw "API ERROR";
				}
			})
			.then(res => {
				if (res.status === 200) {
					return dispatch({ type: 'GET_CODE', data: res.data.code });
				} else if (res.status >= 400 && res.status < 500) {
					dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
					throw res.data;
				}
			})
			.catch(err => {
				return dispatch(setError(err));
			})
	}
}
export const sendFriendCode = friendCode => {
	return (dispatch, getState) => {
		let headers = { "Content-Type": "application/json" };
		let body = JSON.stringify({ "friend_activation_key": friendCode })
		let { token } = getState().auth;

		if (token) {
			headers["Authorization"] = "Token " + token;
		}
		return fetch(apiTarget + "api/auth/send-friend-code/", { headers, body, method: "POST" })
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return { status: res.status, data };
					})
				} else {
					throw "API ERROR";
				}
			})
			.then(res => {
				if (res.status === 200) {
					return dispatch({ type: 'SENT_CODE', user: res.data });
				} else if (res.status >= 400 && res.status < 500) {
					throw "API ERROR";
				}
			})
			.catch(err => {
				return dispatch(setError(err));
			})
	}
}