import axios from '../../axios';
import {
  APPLICATION_LIST_REQUEST,
  APPLICATION_LIST_SUCCESS,
  APPLICATION_LIST_FAIL,
  APPLICATION_DETAIL_REQUEST,
  APPLICATION_DETAIL_SUCCESS,
  APPLICATION_DETAIL_FAIL,
  APPLICATION_UPDATE_REQUEST,
  APPLICATION_UPDATE_SUCCESS,
  APPLICATION_UPDATE_FAIL,
  APPLY_REQUEST,
  APPLY_SUCCESS,
  APPLY_FAIL,
} from './types.application';

// const url = 'http://localhost:5000';

export const listApplications =
  (auditionPostId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_LIST_REQUEST,
      });

      const {
        userLogin: { currentUser },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.get(
        `/applications/audition/${auditionPostId}`,
        config
      );
      dispatch({
        type: APPLICATION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPLICATION_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const apply = (application) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLY_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/applications', application, config);
    dispatch({
      type: APPLY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const applicationDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPLICATION_DETAIL_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/applications/${id}`, config);
    dispatch({
      type: APPLICATION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLICATION_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateApplication =
  (id, auditionPostId, updateData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APPLICATION_UPDATE_REQUEST,
      });
      const {
        userLogin: { currentUser },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.put(
        `/applications/${id}`,
        updateData,
        config
      );
      dispatch({
        type: APPLICATION_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch(listApplications(auditionPostId));
    } catch (error) {
      dispatch({
        type: APPLICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
