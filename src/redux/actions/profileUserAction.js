import { getDataAPI, putDataAPI } from "../../untils/fetchData";
import { imageUpload } from "../../untils/imageUpload";
import { DeleteData, GLOBALTYPES } from "./globalTyles";

export const PROFILE_USER = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
};

export const getUserProfile = (auth, id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_USER.LOADING, payload: true });
    const res = await getDataAPI(`/user/${id}`, auth);
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

export const updateUserProfile = ({ userData, profilePicture, auth }) => async (dispatch) => {
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

    const res = await putDataAPI(
      `/user/${auth.user._id}`,
      {
        ...userData,
        profilePicture: profilePicture
          ? avatar[0].url
          : auth.user.profilePicture,
      },
      auth.token
    );

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

    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { success: res.data.msg },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const followUser = ({ users, user, auth }) => async (dispatch) => {
  let newUser;
  if (users.every((item) => item._id !== user._id)) {
    newUser = { ...user, followers: [...user.followers, auth.user] };
  } else {
    users.forEach((item) => {
      if (item._id === user._id) {
        console.log(item._id)
        newUser = { ...item, followers: [...item.followers, auth.user] };
      }
    });
  }
  dispatch({
    type: PROFILE_USER.FOLLOW,
    payload: newUser,
  });

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: { ...auth.user, subscribes: [...auth.user.subscribes, newUser] },
    },
  });

  try {
    const res = await putDataAPI(`/user/${user._id}/follow`, null, auth.token);
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { success: res.data.msg },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};
export const unFollowUser = ({ users, user, auth }) => async (dispatch) => {
  let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: DeleteData(item.followers, auth.user._id) };
        }
      });
    }

  dispatch({
    type: PROFILE_USER.UNFOLLOW,
    payload: newUser,
  });

  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: {
        ...auth.user,
        subscribes: DeleteData(auth.user.subscribes, newUser._id),
      },
    },
  });

  try {
    const res = await putDataAPI(
      `/user/${user._id}/unfollow`,
      null,
      auth.token
    );
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { success: res.data.msg },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};
