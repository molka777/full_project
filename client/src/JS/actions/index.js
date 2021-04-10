import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_USER,
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
} from "../constants/action-types";
import {
  FETCH_ALL_EXPERIENCES,
  FETCH_ALL_EXPERIENCES_SUCCESS,
  FETCH_ALL_EXPERIENCES_FAIL,
  FETCH_EXPERIENCE_DETAILS,
  FETCH_EXPERIENCE_DETAILS_SUCCESS,
  FETCH_EXPERIENCE_DETAILS_FAIL,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  CLEAR_ERRORS,
  UPDATE_EXPERIENCE_FAIL,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
} from "../constants/experienceConstants";

const register = (newUser) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const addRes = await axios.post("/user/register", newUser);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

export default register;

export const login = (cred) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
  });

  try {
    const loginRes = await axios.post("/user/login", cred);
    localStorage.setItem("token", loginRes.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: loginRes.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const getProfile = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const isAuth = await axios.get("/user/current", config);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: isAuth.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT,
  });
};

//Update User
export const updateProfile = (id, updatedProfile) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER,
    });

    const { data } = await axios.put(`/user/profile/${id}`, updatedProfile);
    dispatch({
      type: UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_USERS });
  try {
    const { data } = await axios.get("/user/users");
    dispatch({
      type: FETCH_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};

export const seePreferences = () => async (dispatch) => {
  try {
    const preferences = await axios.get("/user/preferences");
    dispatch({
      type: SEE_ALL_PREFERENCES,
      payload: preferences.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addPreferences = (userId, preferenceId) => async (dispatch) => {
  dispatch({
    type: ADD_PREFERENCES,
  });
  try {
    const { data } = await axios.put(`/user/mypreferences/${userId}`, {
      preferenceId,
    });
    dispatch({
      type: ADD_PREFERENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: ADD_PREFERENCES_FAIL,
      payload: error.response,
    });
  }
};

export const addExperience = (newExperience) => async (dispatch) => {
  dispatch({
    type: ADD_EXPERIENCE,
  });
  try {
    const addRes = await axios.post("api/experience", newExperience);
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: addRes.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: error.response.data,
    });
  }
};
export const getExperiences = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_EXPERIENCES });
    const { data } = await axios.get("/api/experience");
    dispatch({
      type: FETCH_ALL_EXPERIENCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_EXPERIENCES_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getExperienceDetails = (id) => async (dispatch) => {
  dispatch({ type: FETCH_EXPERIENCE_DETAILS });
  try {
    const { data } = await axios.get(`/api/experience/${id}`);
    dispatch({
      type: FETCH_EXPERIENCE_DETAILS_SUCCESS,
      payload: data.experience,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: experienceActions.js ~ line 38 ~ getExperienceDetails ~ error",
      error
    );
    dispatch({
      type: FETCH_EXPERIENCE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  dispatch({ type: DELETE_EXPERIENCE });
  try {
    const { data } = await axios.delete(`/api/experience/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: experienceActions.js ~ line 38 ~ getExperienceDetails ~ error",
      error
    );
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateExperience = (id, updatedExperience) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_EXPERIENCE,
    });

    const { data } = await axios.put(
      `/api/experience/${id}`,
      updatedExperience
    );
    dispatch({
      type: UPDATE_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPERIENCE_FAIL,
    });
  }
};
//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
