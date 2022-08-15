import axios from '../../axios';
import { logout } from '../user/api.user';

import {
  ENDORSE_USER_REQUEST,
  ENDORSE_USER_SUCCESS,
  ENDORSE_USER_FAIL,
  ENDORSE_DELETE_REQUEST,
  ENDORSE_DELETE_SUCCESS,
  ENDORSE_DELETE_FAIL,
  GET_GIVEN_ENDORSEMENT_REQUEST,
  GET_GIVEN_ENDORSEMENT_SUCCESS,
  GET_GIVEN_ENDORSEMENT_FAIL,
  GET_RECEIVED_ENDORSEMENT_REQUEST,
  GET_RECEIVED_ENDORSEMENT_SUCCESS,
  GET_RECEIVED_ENDORSEMENT_FAIL,
} from './types.endorsement';

export const getGivenEndorsements = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/endorsements/given`, config);
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReceivedEndorsements =
  (endorseeId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_REQUEST,
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
        `/endorsements/received/${endorseeId}`,
        config
      );
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const endorseUser = (endorsement) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENDORSE_USER_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/endorsements', endorsement, config);
    dispatch({
      type: ENDORSE_USER_SUCCESS,
      payload: data,
    });
    dispatch(getGivenEndorsements());
  } catch (error) {
    dispatch({
      type: ENDORSE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEndorsement = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENDORSE_DELETE_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };

    const { data } = await axios.delete(`/endorsements/${id}`, config);

    dispatch({
      type: ENDORSE_DELETE_SUCCESS,
      payload: data,
    });
    dispatch(getGivenEndorsements());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, no token') {
      dispatch(logout ());
    }
    dispatch({
      type: ENDORSE_DELETE_FAIL,
      payload: message,
    });
  }
};
