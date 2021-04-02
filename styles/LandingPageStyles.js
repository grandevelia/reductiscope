import { StyleSheet } from 'react-native';

export default LoginStyles = StyleSheet.create({
    landingPage: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "white",
        flex: 1,
        flexGrow: 1,
        flexBasis: "auto"
    },
    landingPageInputs: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: "80%",
        left: "10%",
        borderRadius: 3,
        alignItems: "stretch",
        justifyContent: "center",
        paddingTop: "25%",
        paddingBottom: "5%"
    },
    landingHeader: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landingHeaderText: {
        fontSize: 23,
        color: 'rgba(9,12,90,0.7)',
        textAlign: "center"
    },
    landingPageContainer: {
        marginTop: 5,
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
    signup: {
        borderWidth: 3,
        borderColor: 'rgb(233, 19, 133)',
        backgroundColor: 'rgb(233, 19, 133)'
    },
    login: {
        borderWidth: 3,
        borderColor: 'rgb(75, 171, 255)',
        backgroundColor: 'rgb(75, 171, 255)'
    }
})