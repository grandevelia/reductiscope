import { StyleSheet, Dimensions } from "react-native";

export default SettingsStyles = StyleSheet.create({
	settingsContainer: {
		flex: 1,
		paddingTop: 0.125 * Dimensions.get('window').height,
		backgroundColor: "white",
		position: 'relative'
	},
	settingsHeader: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		padding: 0.025 * Dimensions.get('window').width,
		top: 0,
		backgroundColor: 'white',
		width: '100%',
		height: '10%',
		zIndex: 9999,
		borderColor: 'rgba(0,0,0,0.1)',
		borderBottomWidth: 1
	},
	settingsContainerInner: {
		backgroundColor: "rgb(240,240,240)",
		paddingTop: 20,
		flexGrow: 1
	},
	settingsSection: {
		marginBottom: 20,
		borderColor: "rgba(0,0,0,0.1)",
		borderBottomWidth: 1,
	},
	settingsOption: {
		backgroundColor: "white",
		borderColor: "rgba(0,0,0,0.1)",
		borderTopWidth: 1,
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	settingLabel: {
		marginLeft: 10,
		color: "rgba(0,0,0,0.85)",
		flexWrap: "wrap",
		flexShrink: 1,
		fontSize: 17
	},
	settingsCurrentOption: {
		fontWeight: "bold",
		fontSize: 17,
		color: "rgb(29, 116, 205)",
		marginRight: 7
	},
	openSettingBox: {
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 3,
		flexWrap: "wrap",
		flexShrink: 1,
	},
	openSettingPrompt: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 16,
		fontWeight: "bold",
		color: "rgba(0,0,0,0.5)",
		marginLeft: 10
	},
	lightboxContainer: {
		top: 0.125 * Dimensions.get("window").height,
		left: 0,
		bottom: 0,
		right: 0,
		position: "absolute",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.6)",
		zIndex: 999999,
	},
	lightboxScroller: {
		flexGrow: 1,
		marginTop: "5%",
		marginBottom: "5%"
	},
	lightboxInner: {
		backgroundColor: "white",
		flexGrow: 1,
		borderRadius: 10,
		flexDirection: "column"
	},
	lightboxHeader: {
		backgroundColor: "white",
		width: '100%',
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.1)"
	},
	openSettingTitle: {
		textTransform: 'capitalize',
		fontSize: 15,
		color: "rgba(0,0,0,0.85)",
		textAlign: "center"
	},
	lightboxBody: {
		paddingTop: 20,
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.05)"
	},
	settingItemPicker: {
		width: '100%',
		height: '80%',
	},
	settingItem: {
		padding: 10,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.1)"
	},
	settingItemSelected: {
		backgroundColor: "rgb(77, 153, 255)",
	},
	settingItemText: {
		flexGrow: 1,
		justifyContent: "center"
	},
	paymentOption: {
		borderBottomWidth: 2,
		borderRadius: 3,
		borderColor: "rgba(0,0,0,0.1)",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 15,
		margin: 7,
		flex: 1,
		justifyContent: "center"
	},
	paymentOptionOne: {
		backgroundColor: "rgb(32, 185, 226)"
	},
	paymentOptionTwo: {
		backgroundColor: "rgb(233, 176, 24)"
	},
	paymentOptionThree: {
		backgroundColor: "rgb(239, 105, 86)"
	},
	selectedPayment: {
		borderWidth: 5,
		borderBottomWidth: 5,
		borderColor: "rgb(87, 163, 255)"
	},
	lightboxSelected: {
		backgroundColor: "rgb(77, 153, 255)",
	},
	lightboxSelectedText: {
		color: "white"
	},
	settingSubmissionArea: {
		marginTop: "auto",
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		padding: 10
	},
	settingSubmit: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginTop: 5,
		borderRadius: 25,
		padding: 10,
		borderWidth: 1,
		borderColor: "rgba(0, 0, 0, 0.85)"
	},
	submitText: {
		flexGrow: 1,
		width: '100%',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		color: "rgba(0, 0, 0, 0.85)"
	},
	settingInput: {
		backgroundColor: "white",
		borderBottomColor: "rgba(0,0,0,0.1)",
		borderBottomWidth: 1,
		borderTopColor: "rgba(0,0,0,0.1)",
		borderTopWidth: 1,
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		color: "rgb(67, 143, 245)"
	},
	carbRanks: {
		width: '100%',
		flex: 1
	},
})