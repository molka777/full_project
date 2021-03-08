import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS, 
    REGISTER_USER,  } 
    from "../constants/action-types";

const initialState = {
    loading: false,
    user: null,
    errors: null,
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case REGISTER_USER:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default:
            return state;
    };

}
export default userReducer;