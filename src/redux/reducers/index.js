import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import mode from "./modeReducer";
import profile from "./profileUserReducer";
import status from "./statusReducer";

export default combineReducers({ auth, notify, mode, profile, status });
