import { POSTTYPES } from "../actions/postAction";
import { EditData } from "../actions/globalTyles";

const initialState = {
  posts: [],
  loading: false,
  result: 0,
  page: 2,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTTYPES.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POSTTYPES.LOADING_POST:
      return {
        ...state,
        loading: action.payload,
      };
    case POSTTYPES.GET_POST:
      return {
        ...state,
        posts: action.payload.post,
        result: action.payload.result
      };
      case POSTTYPES.UPDATE_POST:
        return {
          ...state,
          posts: EditData(state.posts, action.payload._id, action.payload)
        };
    default:
      return state;
  }
};

export default postReducer;
