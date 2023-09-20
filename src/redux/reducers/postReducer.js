import { POSTTYPES } from "../actions/postAction";

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
    default:
      return state;
  }
};

export default postReducer;
