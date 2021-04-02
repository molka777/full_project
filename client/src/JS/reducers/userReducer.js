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
  UPDATE_USER,
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL,
  SEE_ALL_PREFERENCES,
  ADD_PREFERENCES,
  ADD_PREFERENCES_SUCCESS,
  ADD_PREFERENCES_FAIL,
} from '../constants/action-types';

const initialState = {
  loading: false,
  user: null,
  errors: null,
  preferences: [],
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
        user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.token,
        user: payload.user,
      };

    case GET_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: payload,
        user: payload,
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        // isAuth: false,
        user: null,
        token: null,
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
      };

    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case FETCH_ALL_USERS:
      return {
        isLoading: true,
        users: [],
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        isLoading: false,
        users: payload.users,
      };
    case FETCH_ALL_USERS_FAIL:
      return {
        isLoading: false,
        error: payload,
      };

    case SEE_ALL_PREFERENCES:
      return {
        ...state,
        preferences: payload,
        loading: false,
        isAuth: payload,
      };

    case ADD_PREFERENCES:
      return {
        ...state,
        loading: true,
      };

    case ADD_PREFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          myPreferences: payload.myPreferences,
        },
      };

    case ADD_PREFERENCES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
export default userReducer;
