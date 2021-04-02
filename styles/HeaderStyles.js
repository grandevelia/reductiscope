import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default DashboardStyles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 10,
		height: '12.5%',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(0, 0, 0, 0.2)',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		position: 'absolute',
		top: 0,
		width: '100%',
		zIndex: 1,
	},
	dateText: {
		position: 'absolute',
		bottom: 5,
		color: "rgb(50,50,50)",
		right: 0,
		textAlign: 'center',
		justifyContent: 'center',
		width: 0.8 * Dimensions.get("window").width,
		left: "10%"
	}
})