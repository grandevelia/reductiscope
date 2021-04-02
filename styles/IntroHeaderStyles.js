import { StyleSheet } from "react-native";

export default IntroHeaderStyles = StyleSheet.create({
	introHeader: {
		flexDirection: 'column',
		paddingBottom: 5,
		flexShrink: 1,
		flexGrow: 1
	},
	topSection: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 8,
        flexShrink: 1,
	},
	homePress: {
		alignItems: "flex-end",
		height: "100%",
        flexGrow: 1,
        flexShrink: 1,
		marginRight: "5%"
	},
	backPress: {
        flexGrow: 1,
        flexShrink: 1,
	},
	backContainer: {
		flexGrow: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	backText: {
		color: "rgba(59, 59, 59, 0.8)",
		fontSize: 17
	},
	introHeaderTextContainer: {
		paddingLeft: "2.5%",
		paddingRight: "2.5%",
		borderWidth: 1,
		borderColor: "white",
        flexGrow: 1,
        flexShrink: 1,
	},
	introHeaderText: {
        flexGrow: 1,
        flexShrink: 1,
		textAlign: "center",
		fontSize: 22,
		color: "rgb(29, 32, 110)",
		flexWrap: "wrap"
	},
})