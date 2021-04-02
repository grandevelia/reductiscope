import { StyleSheet, Dimensions } from "react-native";

let maxDim = Math.max(Dimensions.get("window").height, Dimensions.get("window").width);
let minDim = Math.min(Dimensions.get("window").height, Dimensions.get("window").width)

export default HistoryStyles = StyleSheet.create({
    /*container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },*/
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
    },
    heading: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },
    chartContainer: {
        height: Dimensions.get("window").height,
        width: "100%",
    }
})