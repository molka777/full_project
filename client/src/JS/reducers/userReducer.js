import {
    GET_PROFILE,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_USER,
    LOGOUT,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
    UPDATE_USER
}
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
            };
        case LOGIN_USER:
            return {
                ...state,
                loading: true,
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload,
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload
            }

        case GET_PROFILE:
            return {
                ...state,
                loading: true,
            }

        case GET_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload,
            }

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuth: payload,
                user: payload,
            }

        case LOGOUT:
            return {
                ...state,
                loading: false,
                isAuth: false,
                user: null,
                token: null,
            }

        case UPDATE_USER:
            return {
                ...state,
                loading: true,
            }

        case UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload

            }

        case UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                errors: payload,
            }

        default:
            return state;
    };



}
export default userReducer;