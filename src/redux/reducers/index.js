import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import mode from "./modeReducer";

export default combineReducers({ auth, notify, mode });
