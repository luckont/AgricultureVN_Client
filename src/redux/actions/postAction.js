import { GLOBALTYPES } from "./globalTyles";
import { imageUpload } from "../../untils/imageUpload";
import { getDataAPI, postDataAPI } from "../../untils/fetchData";

export const POSTTYPES = {
    CREATE_POST: "CREATE_POST",
    LOADING_POST: "LOADING_POST",
    GET_POST: "GET_POST"
};

export const createPost = ({ content, images, auth }) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } })
        if (images.length > 0) media = await imageUpload(images)

        const res = await postDataAPI("post", { desc: content, img: media }, auth.token)

        dispatch({ type: POSTTYPES.CREATE_POST, payload: {...res.data.newPost, user: auth.user} })

        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg }
        })
    }
};

export const getPosts = (token) => async (dispatch) => {
   try {
    dispatch({ type: POSTTYPES.LOADING_POST, payload: true })

    const res = await getDataAPI("post", token)
    dispatch({
        type: POSTTYPES.GET_POST,
        payload: res.data
    })

    dispatch({ type: POSTTYPES.LOADING_POST, payload: false })
   } catch (err) {
    dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg }
    })
   }
}