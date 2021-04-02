import { StyleSheet, Dimensions } from "react-native";

export default IntroStyles = StyleSheet.create({
    introPage: {
        flexGrow: 1,
        alignItems: 'stretch',
        paddingBottom: "2.5%",
        width: "100%",
    },
    carbPage: {
        flexGrow: 1,
        flexShrink: 1,
        paddingLeft: "10%",
        paddingRight: "10%"
    },
    inner: {
        justifyContent: "center",
        padding: 24,
        paddingBottom: 0.1 * Dimensions.get("window").height,
        flex: 1
    },
    userInfoButtons: {
        width: "80%",
        left: "10%"
    },
    introInput: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        height: "12.5%"
    },
    introBody: {
        alignItems: "stretch",
        flexGrow: 1,
    },
    centerPage: {
        justifyContent: "center"
    },
    backButton: {
        width: "25%",
        borderRadius: 20,
        backgroundColor: "rgb(190, 69, 143)",
        padding: 10,
        fontWeight: "bold"
    },
    backText: {
        color: "white",
        textAlign: "center",
    },
    buttonTouchable: {
        margin: 15,
        marginTop: 15,
        marginBottom: 5,
        borderRadius: 20,
        overflow: "hidden"
    },
    CTA: {
        textAlign: "center",
        padding: 12,
        color: "white",
        fontWeight: "bold",
        borderRadius: 20
    },
    button1: {
        backgroundColor: "rgb(233, 19, 133)"
    },
    button2: {
        backgroundColor: "rgb(73, 24, 247)"
    },
    button3: {
        backgroundColor: "rgb(233, 176, 24)"
    },
    errorInput: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: "red"
    },
    introNav: {
        color: "white",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        fontWeight: "bold"
    },
    stageTitleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexGrow: 1
    },
    stageTitle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    stageRange: {
        color: "white",
        fontWeight: "bold"
    },
    allowedIconWrap: {
        borderRadius: 0.175 * Dimensions.get("window").width,
        borderColor: "white",
        borderWidth: 1,
        width: 0.175 * Dimensions.get("window").width,
        height: 0.175 * Dimensions.get("window").width,
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    },
    iconOuterWrap: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconLabel: {
        fontSize: 0.04 * Dimensions.get("window").width,
        color: 'white'
    },
    iconImage: {
        width: 0.125 * Dimensions.get("window").width,
        height: 0.125 * Dimensions.get("window").width,
        resizeMode: "contain",
        marginBottom: 8,
        marginTop: 8,
    },
    section: {
        flexShrink: 1,
    },
    levelDescription: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        color: "white",
        padding: 5,
    },
    stage: {
        borderRadius: 5,
        padding: 7,
        margin: 5,
    },
    stage7: {
        backgroundColor: "rgb(0, 89, 255)"
    },
    stage6: {
        backgroundColor: "rgb(28, 89, 128)"
    },
    stage5: {
        backgroundColor: "rgb(56, 89, 85)"
    },
    stage4: {
        backgroundColor: "rgb(85, 89, 64)"
    },
    stage3: {
        backgroundColor: "rgb(113, 89, 51)"
    },
    stage2: {
        backgroundColor: "rgb(142, 89, 43)"
    },
    stage1: {
        backgroundColor: "rgb(198, 89, 36)"
    },
    scrollBottom: {
        justifyContent: "center",
        alignItems: "center"
    },
    promptArea: {
        marginTop: 20
    },
    promptTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: "rgba(9,12,90,0.9)",
        textAlign: "center"
    },
    promptText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        color: "rgba(9,12,90,0.7)",
        textAlign: "center"
    },
    sliderArea: {
        flex: 1,
        justifyContent: "center",
        width: '80%'
    },
    sliderVisual: {
        alignSelf: "center",
    },
    optionArea: {
        flex: 1,
        flexGrow: 1,
    },
    plansText: {
        padding: 20,
        color: "rgba(0,0,0,0.7)"
    },
    plansPromptArea: {
        backgroundColor: "white",
        padding: 5,
    },
    planHeaderText: {
        fontSize: 27,
        color: "rgb(13, 174, 198)",
        fontWeight: "bold",
        textAlign: "center",
    },
    optionText: {
        color: "white",
    },
    paymentOption: {
        borderBottomWidth: 2,
        borderRadius: 3,
        borderColor: "rgba(0,0,0,0.1)",
        alignItems: "center",
        paddingRight: 15,
        paddingLeft: 15,
        margin: 7,
        flex: 1,
        justifyContent: "center"
    },
    paymentOptionOne: {
        backgroundColor: "rgb(32, 185, 226)"
    },
    paymentOptionTwo: {
        backgroundColor: "rgb(233, 176, 24)"
    },
    paymentOptionThree: {
        backgroundColor: "rgb(239, 105, 86)"
    },
    optionHeader: {
        fontWeight: "bold",
        fontSize: 18,
        color: "rgba(0,0,0,0.6)",
        color: "white",
        marginBottom: 4
    },
    signupInput: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.4)",
        fontSize: 16,
        padding: 5,
        margin: 15
    },
    navigationIcon: {
        position: "absolute",
        left: "0%",
        top: "1.25%",
        width: "15%",
        zIndex: 999
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    sideBySide: {
        flex: 1,
        margin: 1
    },
    customizingText: {
        color: "rgb(233, 19, 133)",
        width: "100%",
        textAlign: "center"
    },
    explanationWrap: {
        flex: 1,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 25
    },
    explanationText: {
        color: "rgb(20, 20, 20)",
        fontWeight: "bold",
        lineHeight: 40,
        textAlign: "center",
        fontSize: 20
    },
    doubleSize: {
        fontSize: 40,
    },
    backPress: {
        marginLeft: -15
    },
    explanationNext: {
        backgroundColor: "rgb(233, 19, 133)",
        borderRadius: 20,
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5,
        marginTop: 20,
        marginBottom: 20
    },
    explanationNextText: {
        color: "white",
        fontWeight: "bold",
        padding: 10
    },
    blueText: {
        color: "rgb(0, 89, 255)",
        fontWeight: "bold"
    },
    brownText: {
        color: "rgb(28, 89, 128)"
    },
    redText: {
        color: "rgb(142, 89, 43)"
    },
    goldText: {
        color: "rgb(212, 162, 11)",
        fontWeight: "bold"
    },
    complete: {
        flex: 1,
        width: "100%",
    },
    completeIcon: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 0.05 * Dimensions.get("window").height,
        marginBottom: 0.05 * Dimensions.get("window").height
    },
    completeButton: {
        backgroundColor: "rgb(15, 203, 4)"
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
    backgroundWrap: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    backgroundImage: {
        width: 0.08 * Dimensions.get("window").width,
        height: 0.08 * Dimensions.get("window").width,
        tintColor: "rgba(0,0,0,0.2)",
        flex: 1
    },
    finishButton: {
        width: "80%",
        alignSelf: "center"
    },
    inputArea: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        paddingBottom: 100,
        justifyContent: "flex-start",
    },
    registerSubmit: {
        backgroundColor: 'rgb(233, 19, 133)',
        display: 'flex',
        flexGrow: 1,
        padding: 5,
        margin: 15,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10000
    },
	pickerBarDecimal: {
		height: 0.1 * Dimensions.get("window").height,
		left: "60%",
		position: 'absolute',
		width: '20%',
		top: "30%",
		zIndex: -1,
        justifyContent: "center"
	},
	pickerBarDecimalItem: {
		fontSize: 25,
	},
})