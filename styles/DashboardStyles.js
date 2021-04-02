import { StyleSheet, Dimensions } from "react-native";

export default DashboardStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgb(240,240,240)",
	},
	blur: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	dashboardBody: {
		position: 'absolute',
		width: '100%'
	},
	dashTop: {
		flexDirection: 'row',
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(255,255,255,0)",
		flexWrap: 'wrap'
	},
	weightInputAnimated: {
		position: 'absolute',
		width: Dimensions.get("window").width,
	},
	weightInputButton: {
		width: "100%",
		height: "100%",
	},
	weightTextContainer: {
		position: "absolute",
		width: '100%',
		height: '100%',
		left: 0,
	},
	weightText: {
		color: "rgb(65,65,65)",
		textAlign: "center",
		position: "absolute",
	},
	weightTextUnits: {
		color: "rgb(45,45,45)",
		position: "absolute",
		textAlign: "center",
		backgroundColor: "rgba(255,255,255,0)"
	},
	editIcon: {
		position: "absolute",
		right: '20%',
		top: "20%",
		height: '100%',
		justifyContent: "center"
	},
	levelContainer: {
		flexDirection: "row"
	},
	levelText: {
		color: "rgb(5,5,5)",
		textAlign: "center",
		fontSize: 20
	},
	levelNumber: {
		marginRight: 5,
		marginLeft: 5,
		color: 'rgb(25, 152, 215)',
		fontSize: 20
	},
	weightPromptMain: {
		backgroundColor: "rgba(255,255,255,0)",
		flexGrow: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	weightPromptActions: {
		flexDirection: "row",
		position: 'absolute',
		bottom: 0,
		width: '100%',
		zIndex: 999
	},
	submitButton: {
		color: 'rgb(35, 182, 255)',
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		borderTopWidth: 1,
		borderTopColor: 'rgba(0,0,0,0.2)',
		backgroundColor: "white"
	},
	submitText: {
		color: 'rgb(35, 182, 255)',
		fontWeight: "bold",
		fontSize: 0.05 * Dimensions.get("window").width,
	},
	closeButton: {
		borderTopColor: 'rgba(0,0,0,0.2)',
		borderRightColor: 'rgba(0,0,0,0.2)',
		borderTopWidth: 1,
		borderRightWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		backgroundColor: "white"
	},
	closeText: {
		color: 'rgba(0,0,0,0.75)',
		fontSize: 0.05 * Dimensions.get("window").width,
	},
	pickerBar: {
		backgroundColor: 'rgb(35, 182, 255)',
		height: 0.1 * Dimensions.get("window").height,
		position: 'absolute',
		width: '100%',
		top: 3.5 * 0.85 * Dimensions.get("window").height / 8,
		zIndex: -1
	},
	pickerBarDecimal: {
		height: 0.1 * Dimensions.get("window").height,
		left: "60%",
		position: 'absolute',
		width: '20%',
		top: 3.5 * 0.85 * Dimensions.get("window").height / 8,
		zIndex: -1,
		justifyContent: "center",
	},
	pickerBarDecimalItem: {
		fontSize: 25,
		color: "white"
	},
	weightItem: {
		zIndex: 2,
		backgroundColor: 'transparent',
		margin: 15,
		fontSize: 0.08 * Dimensions.get("window").width,
		textAlign: "center"
	},
	selectedWeight: {
		color: 'white'
	},
	menuContainer: {
		position: "absolute",
		zIndex: 100,
		height: Dimensions.get("window").height,
		width: 0.6 * Dimensions.get("window").width,
		top: 0,
		padding: 5,
		backgroundColor: "white",
		overflow: 'hidden'
	},
	menuHeader: {
		height: "20%",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: 10,
	},
	menuLinkText: {
		fontSize: 16,
		paddingLeft: 10,
	},
	menuItem: {
		borderTopWidth: 1,
		borderTopColor: "rgba(0,0,0,0.2)",
		justifyContent: "flex-start",
		padding: 10
	},
	menuLink: {
		flexDirection: "row",
		alignItems: "center",
	},
	vacationContainer: {
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	vacationButton: {
		flexDirection: "row",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgb(35, 182, 255)',
		padding: 7,
		width: '100%'
	},
	vacationText: {
		paddingLeft: 10,
		color: "white",
		fontSize: 16
	},
	referContainer: {
		paddingTop: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	referButton: {
		flexDirection: "row",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'rgb(255, 182, 35)',
		padding: 7,
		width: '100%'
	},
	referText: {
		paddingLeft: 10,
		color: "white",
		fontSize: 16
	}
});