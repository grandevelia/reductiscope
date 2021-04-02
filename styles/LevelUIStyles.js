import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default LevelUIStyles = StyleSheet.create({
    levelUIContainer: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'column',
        height: 0.6 * Dimensions.get("window").height,
    },
    iconWrap: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
        justifyContent: "space-around"
    },
    icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    allowedIconWrap: {
        borderRadius: 0.175 * Dimensions.get("window").width,
        borderColor: "rgba(70, 70, 70, 0.4)",
        borderWidth: 1,
        width: 0.175 * Dimensions.get("window").width,
        height: 0.175 * Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    objectiveIcon: {
        backgroundColor: "rgb(175, 175, 175)",
        borderRadius: 0.175 * Dimensions.get("window").width,
        borderColor: "rgb(125, 125, 125)",
        borderWidth: 1,
        overflow: "hidden",
        width: 0.175 * Dimensions.get("window").width,
        height: 0.175 * Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5
    },
    iconImage: {
        width: 0.125 * Dimensions.get("window").width,
        height: 0.125 * Dimensions.get("window").width,
        resizeMode: "contain",
        marginBottom: 8,
        marginTop: 8
    },
    lockIcon: {
        position: "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    iconDescription: {
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "rgb(107, 256, 228)",
        padding: 1,
        borderRadius: 5
    },
    allowedSection: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        padding: 5,
        flex: 4,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.2)',
    },
    objectivesSection: {
        padding: 5,
        flex: 4,
        backgroundColor: "white"
    },
    iconContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    iconLabel: {
        fontSize: 0.04 * Dimensions.get("window").width,
        color: 'rgb(50, 50, 50)'
    },
    weightOk: {
        marginLeft: 10,
        marginRight: 10
    },
    weightNotOk: {
        marginLeft: 10,
        marginRight: 10
    },
    XPBarContainer: {
        flex: 1,
        minHeight: 8,
        flexDirection: 'column'
    },
    XPBarOuter: {
        height: '30%',
        minHeight: 3,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.25)"
    },
    XPBarFilled: {
        height: '100%',
        backgroundColor: "rgb(35, 182, 255)",
        borderTopRightRadius: Dimensions.get("window").width,
        borderBottomRightRadius: Dimensions.get("window").width,
    },
    textContainer: {
        flexDirection: "row"
    },
    XPBarText: {
        paddingLeft: "2%",
        paddingBottom: "1.25%",
        color: "rgb(245, 161, 0)",
    },
    toGoText: {
        paddingLeft: '2%'
    },
    multiLine1: {
        position: "absolute",
        top: -0.0625 * Dimensions.get("window").width,
        width: 0.25 * Dimensions.get("window").width,
        textAlign: "center",
        width: "250%"
    },
    multiLine2: {
        position: "absolute",
        top: -0.04 * Dimensions.get("window").width,
        width: 0.25 * Dimensions.get("window").width,
        textAlign: "center",
        width: "250%"
    },
    allAllowedContainer: {
        marginTop: "5%",
        borderColor: "gold",
        borderWidth: 2
    },
    allAllowedBanner: {
        alignItems: "center",
        justifyContent: "center"
    },
    allAllowedText: {
        textAlign: "center",
        fontSize: 0.06 * Dimensions.get("window").width
    }
});