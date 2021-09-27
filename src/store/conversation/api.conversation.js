import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_GET_FAIL,
  CONVERSATION_GET_REQUEST,
  CONVERSATION_GET_SUCCESS,
} from './types.conversation';

export const createConversation = (convo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONVERSATION_CREATE_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/conversations', convo, config);
    dispatch({
      type: CONVERSATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONVERSATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getConversations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONVERSATION_GET_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/conversations`, config);
    dispatch({
      type: CONVERSATION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONVERSATION_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
