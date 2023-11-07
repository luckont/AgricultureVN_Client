import { PRODUCTTYPE } from "../actions/productAction";

const initialState = {
  products: [],
  product: [],
  result: 0,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTTYPE.CREATE_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case PRODUCTTYPE.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        result: action.payload.result,
      };
    case PRODUCTTYPE.GET_PRODUCT:
      return {
        ...state,
        product: [action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
