import { combineReducers } from 'redux';
import auth from "./auth";
import weights from "./weights";
import notifications from "./notifications";
import errors from "./errors";

const reductiscope = combineReducers({
	auth, weights, notifications, errors
})

export default reductiscope