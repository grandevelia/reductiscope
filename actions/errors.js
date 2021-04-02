
export const setError = err => {
    return dispatch => {
        return dispatch({ type: "SET_ERROR", data: err })
    }
}
export const removeErrors = () => {
    return dispatch => {
        return dispatch({ type: "REMOVE_ERROR" })
    }
}