import { AsyncStorage } from 'react-native';

const initialState = {
	token: AsyncStorage.getItem("token"),
	isAuthenticated: null,
	isLoading: true,
	confirmationSent: false,
	key: null,
	user: null,
	email: null,
	reset: null,
	resetKey: "",
	registrationSuccess: false,
	friendCode: null
};

export default function auth(state = initialState, action) {
	switch (action.type) {
		case 'TOKEN_LOADED':
			return { ...state, isLoading: false, token: action.token }

		case 'USER_LOADING':
			return { ...state, isLoading: true };

		case 'USER_LOADED':
			return { ...state, isAuthenticated: true, isLoading: false, user: action.user };

		case 'LOGIN_SUCCESSFUL':

			AsyncStorage.setItem("token", action.data.token);
			return { ...state, ...action.data, isAuthenticated: true, isLoading: false, errors: false };

		case 'CONFIRMATION_SUCCESSFUL':
			AsyncStorage.setItem("token", action.data.token);
			return { ...state, ...action.data, isAuthenticated: true, isLoading: false, errors: false };

		case 'LOGOUT_SUCCESSFUL':
			AsyncStorage.removeItem("token");
			return { ...initialState };

		case 'REGISTRATION_SUCCESSFUL':
			AsyncStorage.setItem("token", action.data.token);
			return {
				...state,
				registrationSuccess: true,
				email: action.data.email,
				confirmationSent: true,
				isAuthenticated: true
			};

		case 'SETTING_CHANGE':
			return { ...state, ...action.user }

		case 'RESET_PASSWORD':
			let key = "";
			if (action.key) {
				key = action.key;
			}
			return { ...state, reset: action.status, email: action.email, key: key }

		case 'CONFIRM_RESET':
			return { ...state, reset: action.status }

		case 'UPDATE_PASSWORD':
			return { ...state, reset: action.status, errors: "Invalid credentials" }

		case 'AUTHENTICATION_ERROR':
			if (AsyncStorage.getItem("token") !== null) {
				AsyncStorage.removeItem("token");
			}
			if (action.email) {
				return { ...state, token: null, user: null, isAuthenticated: false, isLoading: false, email: action.email }
			}
			return { ...state, token: null, user: null, isAuthenticated: false, isLoading: false }

		case 'GET_CODE':
			return { ...state, friendCode: action.data }

		case 'SENT_CODE':
			return { ...state, friendCode: null }

		default:
			return state;
	}
}