import axios from 'axios';

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
} from '../constants/action-types';

const register = (newUser) => async (dispatch) => {
  dispatch({
    type: REGISTER_USER,
  });
  try {
    const addRes = await axios.post('/user/register', newUser);
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
    const loginRes = await axios.post('/user/login', cred);
    localStorage.setItem('token', loginRes.data.token);
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
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: token,
    },
  };
  dispatch({
    type: GET_PROFILE,
  });
  try {
    const isAuth = await axios.get('/user/current', config);
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
  localStorage.removeItem('token');
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
    const { data } = await axios.get('/user/users');
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
    const preferences = await axios.get('/user/preferences');
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
