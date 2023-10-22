import { imageUpload } from "../../untils/imageUpload";
import { postDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "./globalTyles";

export const createDiary = ({ content, images, arrId, auth }) => async (dispatch) => {
    let media = [];
    try {
        if (images.length > 0) media = await imageUpload(images);
        const res = await postDataAPI(
            "/diary",
            { text: content, media, recipients: arrId },
            auth.token
        );
        console.log(res)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: err.response.data.msg },
        });
    }
};
