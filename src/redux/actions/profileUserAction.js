import { getDataAPIUser, putDataAPIUser } from "../../untils/fetchData";
import { imageUpload } from "../../untils/imageUpload";
import { GLOBALTYPES } from "./globalTyles";

export const PROFILE_USER = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
};

export const getUserProfile = (auth, id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_USER.LOADING, payload: true });
    const res = await getDataAPIUser(`/${id}`, auth);
    dispatch({
      type: PROFILE_USER.GET_USER,
      payload: res.data,
    });
    dispatch({ type: PROFILE_USER.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const updateUserProfile =
  ({ userData, profilePicture, auth }) =>
    async (dispatch) => {
      if (!userData.username)
        return dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: "Nhập tên đăng nhập !" },
        });
      if (userData.username.length > 25)
        return dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: "Tên đăng nhập quá dài !" },
        });
      if (userData.desc.length > 200)
        return dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: "Thông tin quá dài !" },
        });

      try {
        let avatar;
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: true });

        if (profilePicture) avatar = await imageUpload([profilePicture]);

        const res = await putDataAPIUser(auth.user._id, {
          ...userData,
          profilePicture: profilePicture
            ? avatar[0].url
            : auth.user.profilePicture,
        });

        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            ...auth,
            user: {
              ...auth.user,
              ...userData,
              profilePicture: profilePicture
                ? avatar[0].url
                : auth.user.profilePicture,
            },
          },
        });

        dispatch({ type: GLOBALTYPES.NOTIFY, payload: {success: res.data.msg} });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: err.response.data.msg },
        });
      }
    };
