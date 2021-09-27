import {
  MESSAGE_SEND_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_FAIL,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
} from './types.message';

export const getMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case MESSAGE_GET_REQUEST:
      return { loading: true, messages: [] };
    case MESSAGE_GET_SUCCESS:
      return { loading: false, messages: action.payload };
    case MESSAGE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sendMessageReducer = (state, action) => {
  switch (action.type) {
    case MESSAGE_SEND_REQUEST:
      return { loading: true };
    case MESSAGE_SEND_SUCCESS:
      console.log('sucess');
      break;
    // return { loading: false, messages: [...messages,action.payload]}
    case MESSAGE_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
