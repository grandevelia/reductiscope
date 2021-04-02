import { StyleSheet } from "react-native";

export default HealthAdvisoryStyles = StyleSheet.create({
    advisoryWrap: {
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 30
    },
    advisoryTextContainer: {
        flex: 1.25,
    },
    advisoryText: {
        textAlign: "center",
        fontSize: 22
    },
    buttonContainer: {
        alignItems: 'center',
        alignItems: 'stretch'
    },
    button: {
        padding: 10,
        borderRadius: 100000,
        alignItems: "center",
        margin: 10
    },
    accept: {
        backgroundColor: 'rgb(35, 182, 255)'
    },
    continue: {
        backgroundColor: 'rgb(255, 182, 35)'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        paddingTop: "1.25%",
        paddingBottom: "1.25%"
    },
    iconWrap: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
    }

});