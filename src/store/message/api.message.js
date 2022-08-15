import {
  MESSAGE_SEND_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_FAIL,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
} from './types.message';
import axios from '../../axios';

export const sendMessage = (message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_SEND_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/messages', message, config);
    // console.log(message.conversationId);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: data,
    });
    dispatch(getMessages(message.conversationId));
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMessages = (conversationId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_GET_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/messages/${conversationId}`, config);
    dispatch({
      type: MESSAGE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
