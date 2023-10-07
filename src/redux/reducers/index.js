import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import mode from "./modeReducer";
import profile from "./profileUserReducer";
import status from "./statusReducer";
import postHome from "./postReducer";
import detailPost from "./detailPostReducer";
import suggestions from "./suggestionReducer";
import socket from "./socketReducer";

export default combineReducers({
  auth,
  notify,
  mode,
  profile,
  status,
  postHome,
  detailPost,
  suggestions,
  socket
});
