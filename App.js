import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { AppLoading, Linking } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font'
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import { connect } from 'react-redux';
import { auth, weights, errors } from "./actions";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reductiscope from "./reducers";
import { iconPaths } from './utilities';

import { Dimensions } from 'react-native';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine, faExclamationTriangle, faUpload, faUserFriends, faDrumstickBite, faCheck, faArrowLeft, faPlane, faGavel, faComment, faBars, faLock, faEdit, faSortAmountUpAlt, faStream, faHome, faCogs, faCocktail, faAngleLeft, faAngleRight, faLaughBeam, faWeight, faRuler, faVenusMars, faEnvelope, faCoins, faSignOutAlt, faRedo } from '@fortawesome/free-solid-svg-icons';

library.add(faChartLine, faExclamationTriangle, faUpload, faUserFriends, faDrumstickBite, faCheck, faArrowLeft, faPlane, faGavel, faComment, faBars, faLock, faEdit, faSortAmountUpAlt, faStream, faHome, faCogs, faCocktail, faAngleLeft, faAngleRight, faLaughBeam, faWeight, faRuler, faVenusMars, faEnvelope, faCoins, faSignOutAlt, faRedo);

function cacheImages(images) {
	return images.map(image => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});
}

function cacheFonts(fonts) {
	return fonts.map(font => Font.loadAsync(font));
}

let store = createStore(reductiscope, applyMiddleware(thunk));
const mainStyle = { position: "absolute", width: "100%", top: 0, left: 0, height: 20, backgroundColor: "white", zIndex: 999999999 }
class RootContainerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fonts: {},
			isReady: false,
			hasError: false,
			email: false
		}
	}
	_handleUrl = url => {
		if (typeof url === "object") {
			//If app is already open, url will be inside of an object
			url = url["url"];
		}
		let { path, queryParams } = Linking.parse(url);
		//console.log(`Linked to app with path: ${path} and data: ${JSON.stringify(queryParams)}`);
	};

	static getDerivedStateFromError(error) {
		console.log(error)
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
	}
	async componentDidMount() {
		Linking.getInitialURL().then((ev) => {
			if (ev) {
				this._handleUrl(ev);
			}
		}).catch(err => {
			console.warn('An error occurred', err);
		});
		Linking.addEventListener('url', this._handleUrl);
		await this.props.getUserToken()

		if (this.props.auth.token) {
			if (!this.props.auth.user) {
				await this.props.loadUser();
			}
		}
		if (this.props.auth.user) {
			this.props.fetchWeights();
		}
	}
	async componentDidUpdate(prevProps) {
		if (prevProps.auth.token !== this.props.auth.token) {
			await this.props.getUserToken();

			if (this.props.auth.token) {
				if (!this.props.auth.user) {
					await this.props.loadUser();
				}
			}
			if (this.props.auth.user) {
				this.props.fetchWeights();
			}
		}
	}
	async _loadAssetsAsync() {
		const imageAssets = cacheImages([
			...iconPaths
		]);
		const fontAssets = cacheFonts([
			{ 'raleway': require('./assets/fonts/Raleway/Raleway-ExtraLight.ttf') },
			{ 'raleway-light': require('./assets/fonts/Raleway/Raleway-Light.ttf') },
			{ 'raleway-reg': require('./assets/fonts/Raleway/Raleway-Regular.ttf') },
			{ 'raleway-bold': require('./assets/fonts/Raleway/Raleway-Bold.ttf') }
		]);
		await Promise.all([...imageAssets, ...fontAssets]);
	}
	doneLoading() {
		this.setState({
			fonts: {
				numberFont: 'raleway',
				ralewayLight: "raleway-light",
				regLetterFont: 'raleway-reg',
				letterFont: 'raleway-bold'
			}
		})
	}
	clearLogin = () => {
		this.setState({ email: false });
	}
	goToLogin(email) {
		this.props.removeErrors();
		this.setState({
			email: email
		})
	}
	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <Text>Something went wrong.</Text>;
		}
		if (Object.keys(this.state.fonts).length === 0) {
			return (
				<AppLoading
					startAsync={this._loadAssetsAsync}
					onFinish={() => this.doneLoading()}
					onError={console.warn}
				/>
			);
		}
		let errors = false;
		if (this.props.errors !== false) {
			errors = this.props.errors;
		}
		return (
			<View style={Styles.container}>
				<StatusBar />
				<View style={mainStyle} />
				{!this.props.auth.user ?
					<LandingPage
						login={this.props.login}
						register={this.props.register}
						errors={errors}
						reset={this.props.auth.reset}
						resetPassword={this.props.resetPassword}
						email={this.props.auth.email}
						fonts={this.state.fonts}
						setError={this.props.setError}
						removeErrors={this.props.removeErrors}
						registrationSuccess={this.props.auth.registrationSuccess}
						email={this.state.email}
						clearLogin={this.clearLogin}
					/>
				:
					<Dashboard
						user={this.props.auth.user}
						errors={errors}
						removeErrors={this.props.removeErrors}
						weights={this.props.weights.weights}
						dates={this.props.weights.dates}
						getFriendCode={this.props.getFriendCode}
						sendFriendCode={this.props.sendFriendCode}
						friendCode={this.props.auth.friendCode}
						lastDate={this.props.weights.lastDate}
						ids={this.props.weights.ids}
						addWeight={this.props.addWeight}
						updateWeight={this.props.updateWeight}
						updateUserSettings={this.props.updateUserSettings}
						logout={this.props.logout}
						fonts={this.state.fonts}
					/>
				}
				{errors !== false ?
					<TouchableOpacity style={Styles.feedback} onPress={() => this.props.removeErrors()}>
						<Text style={Styles.invalid}>
							{errors}
						</Text>
						{
							errors === "Email already registered." && this.props.auth.email !== false ?
							<TouchableOpacity style={Styles.goTo} onPress={() => this.goToLogin(this.props.auth.email)}>
								<Text style={Styles.invalid}>
									Log in?
								</Text>
							</TouchableOpacity>
							:null
						}
					</TouchableOpacity>
					: null
				}
			</View>
		);
	}
}

Styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: 'center',
	},
	feedback: {
		position: 'absolute',
		bottom: 0,
		width: Dimensions.get("window").width,
		height: 0.1 * Dimensions.get("window").height,
		left: 0,
		color: "white",
		backgroundColor: "rgb(245, 76, 89)",
		alignItems: "center",
		justifyContent: "space-evenly",
		flexDirection: "row"
	},
	invalid: {
		color: "white",
		fontSize: 18
	},
	goTo: {
		borderWidth: 1,
		borderColor: "white",
		alignItems: "center",
		justifyContent: "center",
		padding: "2.5%"

	}
});

const mapStateToProps = state => {
	return {
		auth: state.auth,
		weights: state.weights,
		notification: state.notifications,
		errors: state.errors
	}
}
const mapDispatchToProps = dispatch => {
	return {
		setError: err => {
			return dispatch(setError(err))
		},
		removeErrors: () => {
			return dispatch(errors.removeErrors());
		},
		getUserToken: () => {
			return dispatch(auth.getUserToken());
		},
		loadUser: () => {
			return dispatch(auth.loadUser());
		},
		getFriendCode: () => {
			return dispatch(auth.getFriendCode());
		},
		sendFriendCode: friendCode => {
			return dispatch(auth.sendFriendCode(friendCode));
		},
		resetPassword: email => {
			return dispatch(auth.resetPassword(email));
		},
		fetchWeights: () => {
			return dispatch(weights.fetchWeights());
		},
		addWeight: (weightKg, date) => {
			return dispatch(weights.addWeight(weightKg, date))
		},
		updateWeight: (weightKg, id) => {
			return dispatch(weights.updateWeight(weightKg, id));
		},
		addNotification: message => {
			return dispatch(notifications.addNotification(message));
		},
		updateUserSettings: (key, value) => {
			return dispatch(auth.updateUserSettings(key, value))
		},
		login: (email, password) => {
			return dispatch(auth.login(email, password));
		},
		logout: () => {
			return dispatch(auth.logout());
		},
		register: (email, password, alcohol, carbRanks, weightUnits, heightUnits, heightInches, weightKg, idealWeightKg, idealWeightValue, sex) => {
			return dispatch(auth.register(email, password, alcohol, carbRanks, weightUnits, heightUnits, heightInches, weightKg, idealWeightKg, idealWeightValue, sex));
		},
		toggleVacation: () => {
			return dispatch(auth.toggleVacation());
		}
	}
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RootContainer {...this.props} />
			</Provider>
		)
	}
}