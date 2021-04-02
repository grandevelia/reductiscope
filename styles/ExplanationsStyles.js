import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default ExplanationsStyles = StyleSheet.create({
    carbExplanation: {

    },
    carbOption: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.2)",
        flexDirection: "row"
    },
    topGap: {
        height: 0.125 * Dimensions.get("window").height
    },
    icon: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    objectiveIcon: {
        backgroundColor: "rgb(205, 205, 205)",
        borderRadius: 0.2 * Dimensions.get("window").width,
        borderColor: "rgb(125, 125, 125)",
        borderWidth: 1,
        overflow: "hidden",
        width: 0.2 * Dimensions.get("window").width,
        height: 0.2 * Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5
    },
    iconLabel: {
        fontSize: 17,
        textAlign: "center",
        flexShrink: 1,
        paddingLeft: "5%",
        textAlign: "left",
        width: "77.5%"
    }
})