import { GLOBALTYPES } from "./globalTyles";
import { imageUpload } from "../../untils/imageUpload";
import { getDataAPI, postDataAPI, putDataAPI } from "../../untils/fetchData";

export const POSTTYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POST: "GET_POST",
  UPDATE_POST: "UPDATE_POST"
};

export const createPost = ({ content, images, auth }) => async (dispatch) => {
  let media = [];
  try {
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    if (images.length > 0) media = await imageUpload(images);

    const res = await postDataAPI(
      "post",
      { desc: content, img: media },
      auth.token
    );

    dispatch({
      type: POSTTYPES.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    });

    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POSTTYPES.LOADING_POST, payload: true });

    const res = await getDataAPI("post", token);
    dispatch({
      type: POSTTYPES.GET_POST,
      payload: res.data,
    });

    dispatch({ type: POSTTYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const updatePost = ({ content, images, auth, status }) => async (dispatch) => {
  let media = [];
  const newImgUrl = images.filter((img) => !img.url);
  const oldImgUrl = images.filter((img) => img.url);

  if (
    status.desc === content &&
    newImgUrl === 0 &&
    oldImgUrl.length === status.img.length
  )
    return;

  try {
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
    if (newImgUrl.length > 0) media = await imageUpload(newImgUrl);

    const res = await putDataAPI(`post/${status._id}`, {
      desc: content, img: [...oldImgUrl, ...media]
    }, auth.token)

    dispatch({
      type: POSTTYPES.UPDATE_POST,
      payload: { ...res.data.newPost },
    });

    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const likePost = ({ post, auth }) => async (dispatch) => {
  const newPost = { ...post, like: [...post.like, auth.user] }
  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })
  try {
    const res = await putDataAPI(`post/${post._id}/like`, null, auth.token)
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
}

export const unlikePost = ({ post, auth }) => async (dispatch) => {
  const newPost = {...post, like: post.like.filter(lk => lk._id !== auth.user._id)}
  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost })
  try {
    const res = await putDataAPI(`post/${post._id}/unlike`, null, auth.token)
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
}