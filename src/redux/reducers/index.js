import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import mode from "./modeReducer";
import profile from "./profileUserReducer";
import status from "./statusReducer";
import postHome from "./postReducer";

export default combineReducers({
  auth,
  notify,
  mode,
  profile,
  status,
  postHome,
});
