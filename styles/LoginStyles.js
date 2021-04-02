import { StyleSheet, Dimensions } from 'react-native';

export default LoginStyles = StyleSheet.create({
    loginHeader: {
        flexDirection: "row",
        flex: 1,
    },
    loginHeaderText: {
        fontSize: 20,
        color: 'rgba(9,12,90,0.7)',
        textAlign: "center"
    },
    backPress: {
        flex: 1,
        marginLeft: "-5%"
    },
    rightSide: {
        flex: 1
    },
    loginForm: {
        flex: 1.5,
    },
    inputArea: {
        display: 'flex',
        flexDirection: 'column',
        padding: 5,
        justifyContent: "flex-start",
    },
    loginInput: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 2
    },
    forgotPassContainer: {
        padding: 10,
        marginBottom: 3,
        marginTop: 5,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    forgotPass: {
        fontSize: 12,
        color: "rgba(0,0,0,0.5)",
        display: 'flex',
    },
    loginSubmit: {
        backgroundColor: 'rgb(85, 181, 249)',
        display: 'flex',
        flexGrow: 1,
        padding: 5,
        marginTop: 20,
        marginBottom: 10
    },
    resetOkay: {
        fontSize: 22,
        textAlign: 'center',
        margin: 5
    },
    resetEmail: {
        color: 'rgb(85, 181, 249)',
        fontSize: 22,
    },
    updatePasswordSubmit: {
        backgroundColor: 'rgb(67, 225, 98)',
        color: 'white',
    },
    resetComplete: {
        display: 'flex',
        flexDirection: 'column'
    },
    loginInvalid: {
        color: 'rgba(255, 45, 45, 0.8)'
    },
    keyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
        left: "1.25%",
        width: "97.5%",
    },
    inner: {
        padding: 24,
        paddingBottom: 0.1 * Dimensions.get("window").height,
        flex: 1
    },
    forgotBackPress: {
        position: 'absolute',
        paddingTop: 18
    },
    forgotForm: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column"
    },
})