import { PROFILE_USER } from "../actions/profileUserAction";

const initialState = {
    loading: false,
    users: [],
    posts: []
}

const profileUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_USER.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case PROFILE_USER.GET_USER:
            const existingUser = state.users.find(user => user._id === action.payload.user._id);
            if (existingUser) {
                return state;
            } else {
                return {
                    ...state,
                    users: [...state.users, action.payload.user]
                };
            }
        default:
            return state;
    }
}

export default profileUserReducer;
