import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default RulesStyles = StyleSheet.create({
    rulesContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },
    topGap: {
        height: 0.125 * Dimensions.get("window").height
    },
    sectionHeader: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 6
    },
    headerText: {
        fontSize: 25
    },
    ruleSection: {
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: "row",
        borderLeftWidth: 6,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
    },
    numberContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "10%",
    },
    textContainer: {
        justifyContent: "center",
        width: "90%",
    },
    ruleNumber: {
        color: "rgb(20, 129, 255)",
        fontSize: 20
    },
    ruleText: {
        fontWeight: 'bold',
        color: "rgb(20, 20, 20)",
        fontSize: 15
    },
    ruleTitleText: {
        color: "rgb(20, 129, 255)",
        fontSize: 20,
        marginBottom: 5
    }
})