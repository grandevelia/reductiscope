const initialState = false;

export default function auth(state = initialState, action) {
	switch (action.type) {
		case 'SET_ERROR':
			let err = action.data
			if (typeof err !== "string") {
				err = "Error";
			}
			return err;

		case 'REMOVE_ERROR':
			return false;

		default:
			return state;
	}
}