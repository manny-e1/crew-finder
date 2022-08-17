import axios from '../../axios';
import { logout } from '../user/api.user';
import {
  AUDITIONPOST_LIST_REQUEST,
  AUDITIONPOST_LIST_SUCCESS,
  AUDITIONPOST_LIST_FAIL,
  AUDITIONPOST_DETAIL_REQUEST,
  AUDITIONPOST_DETAIL_SUCCESS,
  AUDITIONPOST_DETAIL_FAIL,
  AUDITIONPOST_DELETE_REQUEST,
  AUDITIONPOST_DELETE_SUCCESS,
  AUDITIONPOST_DELETE_FAIL,
  POSTAUDITION_REQUEST,
  POSTAUDITION_SUCCESS,
  POSTAUDITION_FAIL,
} from './types.auditionpost';

// const url = 'http://localhost:5000';

export const listAuditionPosts = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDITIONPOST_LIST_REQUEST,
    });

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser.token);
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    let response;
    if (typeof query === 'string' && query.startsWith('?search'))
      response = await axios.get(`/auditionPosts/search${query}`, config);
    else response = await axios.get(`/auditionPosts${query}`, config);
    dispatch({
      type: AUDITIONPOST_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUDITIONPOST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postAudition = (auditionPost) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTAUDITION_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/auditionPosts', auditionPost, config);
    dispatch({
      type: POSTAUDITION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTAUDITION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const auditionPostDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDITIONPOST_DETAIL_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/auditionPosts/${id}`, config);
    dispatch({
      type: AUDITIONPOST_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUDITIONPOST_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAuditionPost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUDITIONPOST_DELETE_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    const { data } = await axios.delete(`/auditionPosts/${id}`, config);

    dispatch({
      type: AUDITIONPOST_DELETE_SUCCESS,
      payload: data,
    });
    dispatch(listAuditionPosts(''));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, no token') {
      dispatch(logout());
    }
    dispatch({
      type: AUDITIONPOST_DELETE_FAIL,
      payload: message,
    });
  }
};
