import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default FoodDetailStyles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: Dimensions.get("window").height,
        zIndex: 99,
        backgroundColor: "white",
        top: 0.125 * Dimensions.get("window").height
    },
    goBack: {
        marginTop: 50
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
    objectiveIcon: {
        borderRadius: 0.3 * Dimensions.get("window").width,
        borderColor: "rgb(125, 125, 125)",
        borderWidth: 1,
        overflow: "hidden",
        width: 0.3 * Dimensions.get("window").width,
        height: 0.3 * Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "white"
    },
    iconImage: {
        width: 0.15 * Dimensions.get("window").width,
        height: 0.15 * Dimensions.get("window").width,
        resizeMode: "contain",
        marginBottom: 8,
        marginTop: 8
    },
    iconDescription: {
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "rgb(107, 256, 228)",
        padding: 1,
        borderRadius: 5
    },
    iconLabel: {
        fontSize: 0.04 * Dimensions.get("window").width,
        color: 'rgb(50, 50, 50)'
    },
    iconWrapper: {
        flex: 0.25,
        width: '100%',
        alignSelf: "center",
        padding: 5,
        alignItems: "center",
        backgroundColor: "rgb(240,240,240)"
    },
    main: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.2)'
    },
    carbWord: {
        fontSize: 20,
        fontWeight: "bold"
    },
    expansionContainer: {
        paddingTop: 10
    },
    carbExpansion: {
        padding: 4,
        flexDirection: "row",
        alignItems: "center"
    },
    expansionText: {
        fontSize: 16
    },
    blueText: {
        color: "rgb(0, 89, 255)",
        fontWeight: "bold"
    },
    bullet: {
        height: 3,
        width: 3,
        borderRadius: 3,
        backgroundColor: "black",
        marginRight: 8
    },
    backgroundWrap: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection: "row"
    },
    backgroundColumn: {
        flex: 1,
        flexDirection: "column"
    },
    imageWrap: {
        width: 0.09 * Dimensions.get("window").width,
        height: 0.09 * Dimensions.get("window").width,
        flex: 1
    },
    backgroundImage: {
        width: 0.08 * Dimensions.get("window").width,
        height: 0.08 * Dimensions.get("window").width,
        tintColor: "rgba(0,0,0,0.2)",
        flex: 1
    }
})