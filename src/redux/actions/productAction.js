import { GLOBALTYPES } from "./globalTyles";
import { imageUpload } from "../../untils/imageUpload";
import { getDataAPI, postDataAPI } from "../../untils/fetchData";

export const PRODUCTTYPE = {
  CREATE_PRODUCT: "CREATE_PRODUCT",
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_PRODUCT: "GET_PRODUCT",
};

export const createProduct =
  ({ content, price, address, typeProduct, hashtag, images, productName, auth }) =>
  async (dispatch) => {
    let media = [];
    try {
      dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images);
      const res = await postDataAPI(
        "market",
        { desc: content, price, address, typeProduct, productName, hashtag, img: media },
        auth.token
      );
      dispatch({
        type: PRODUCTTYPE.CREATE_PRODUCT,
        payload: { ...res.data.newProduct, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.NOTIFY, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg },
      });
    }
  };

export const getProducts = ({auth}) => async (dispatch) => {
  try {
    const res = await getDataAPI("/market", auth.token);
    console.log(res);

    dispatch({
      type: PRODUCTTYPE.GET_PRODUCTS,
      payload: {...res.data},
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.NOTIFY,
      payload: { err: err.response.data.msg },
    });
  }
};

export const getProduct = ({productDetail, auth, id}) => async (dispatch) => { 
  if (productDetail.every(product => product._id !== id)) {
    try {
      const res = await getDataAPI(`/market/${id}`, auth.token);
      dispatch({
        type: PRODUCTTYPE.GET_PRODUCT,
        payload: res.data.product,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: { err: err.response.data.msg },
      });
    }
  }
}
