import {
  FETCH_ALL_EXPERIENCES,
  FETCH_ALL_EXPERIENCES_SUCCESS,
  FETCH_ALL_EXPERIENCES_FAIL,
  FETCH_EXPERIENCE_DETAILS,
  FETCH_EXPERIENCE_DETAILS_SUCCESS,
  FETCH_EXPERIENCE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from '../constants/experienceConstants';

const initialState = {
  experiences: [],
  experienceDetails: {},
  isLoading: false,
};
export const experiencesReducers = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_ALL_EXPERIENCES:
      return {
        isLoading: true,
        experiences: [],
      };
    case FETCH_ALL_EXPERIENCES_SUCCESS:
      return {
        isLoading: false,
        experiences: payload.experiences,
        experiencesCount: payload.experiencesCount,
      };
    case FETCH_ALL_EXPERIENCES_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case FETCH_EXPERIENCE_DETAILS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EXPERIENCE_DETAILS_SUCCESS:
      return {
        isLoading: false,
        experience: payload,
      };
    case FETCH_EXPERIENCE_DETAILS_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
