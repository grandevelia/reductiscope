import { StyleSheet, Dimensions } from "react-native";

let maxDim = Math.max(Dimensions.get("window").height, Dimensions.get("window").width);
let minDim = Math.min(Dimensions.get("window").height, Dimensions.get("window").width)
export default FoodDetailStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        flex: 1
    },
    newRefer: {
        alignItems: "center",
        flexBasis: '50%',
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.25)",
        paddingBottom: 10
    },
    generateWrap: {
        padding: 5,
        justifyContent: "flex-end",
        flex: 4,
    },
    generateInner: {
        borderRadius: maxDim,
        width: 0.4 * minDim,
        height: 0.4 * minDim,
        borderColor: "rgb(35, 182, 255)",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "rgba(0,0,0,0.05)"
    },
    generateButton: {
        borderRadius: maxDim,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    nRemainingWrap: {
        alignItems: 'center',
        flex: 1
    },
    nRemaining: {
        alignItems: 'center',
    },
    remainingText: {
        fontSize: 25
    },
    friendContainer: {
        flex: 1,
        minHeight: "50%",
        padding: 10
    },
    friendsHeaderArea: {
        padding: 5
    },
    friendsHeader: {
        fontSize: 18,
        padding: 7
    },
    friendArea: {
        borderRadius: maxDim,
        width: 0.2 * minDim,
        height: 0.2 * minDim,
        borderColor: "rgb(35, 182, 255)",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "rgba(0,0,0,0.05)",
        marginLeft: 10,
        marginRight: 10
    },
    friendButtonContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
})