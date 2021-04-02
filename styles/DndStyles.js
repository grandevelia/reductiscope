import { StyleSheet } from 'react-native';

export default DndStyles = StyleSheet.create({
    interactionArea: {
        alignItems: "stretch",
        flexGrow: 1
    },
    basicItemContainer: {
        flexGrow: 1,
    },
    basicItem: {
        flexGrow: 1,
        justifyContent: "center"
    },
    option: {
        flexGrow: 1,
        padding: 3,
        margin: 4,
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        borderRadius: 5,
    },
    unselectedOption: {
        borderWidth: 1,
        backgroundColor: "white",
    },
    selectedOption: {
        borderWidth: 0,
		backgroundColor: "rgb(77, 153, 255)",
    },
    selectedOptionText: {
        color: "rgb(255, 255, 255)"
    },
    toMove: {
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        borderWidth: 4,
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: "rgb(67, 225, 68)",
        borderColor: "rgb(27, 205, 28)"
    }
})