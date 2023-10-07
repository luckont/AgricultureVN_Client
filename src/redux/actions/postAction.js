import { GLOBALTYPES } from "./globalTyles";
import { imageUpload } from "../../untils/imageUpload";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../untils/fetchData";

export const POSTTYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST"
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

    const res = await getDataAPI("/post", token);
    dispatch({
      type: POSTTYPES.GET_POSTS,
      payload: { ...res.data },
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

    const res = await putDataAPI(
      `/post/${status._id}`,
      {
        desc: content,
        img: [...oldImgUrl, ...media],
      },
      auth.token
    );

    dispatch({
      type: POSTTYPES.UPDATE_POST,
      payload: res.data.newPost,
    });
    dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, like: [...post.like, auth.user] };
  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

  socket.emit("likePost", newPost)

  try {
    await putDataAPI(`/post/${post._id}/like`, null, auth.token);

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const unlikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = {
    ...post,
    like: post.like.filter((lk) => lk._id !== auth.user._id),
  };
  dispatch({ type: POSTTYPES.UPDATE_POST, payload: newPost });

  socket.emit("unlikePost", newPost)

  try {
    await putDataAPI(`/post/${post._id}/unlike`, null, auth.token);

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};
export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
  if (detailPost.every(post => post._id !== id)) {
    try {
      const res = await getDataAPI(`/post/${id}`, auth.token)
      dispatch({ type: POSTTYPES.GET_POST, payload: res.data.post })
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg },
      });
    }
  }
}
export const deletePost = ({ post, auth }) => async (dispatch) => {
  dispatch({ type: POSTTYPES.DELETE_POST, payload: post })
  try {
    await deleteDataAPI(`/post/${post._id}`, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
}
export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
  try {
    await putDataAPI(`/post/savePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
}
export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })

  try {
    await putDataAPI(`/post/unSavePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    })
  }
}