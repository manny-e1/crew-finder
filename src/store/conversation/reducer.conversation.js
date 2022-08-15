import {
  CONVERSATION_CREATE_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_GET_FAIL,
  CONVERSATION_GET_REQUEST,
  CONVERSATION_GET_SUCCESS,
} from './types.conversation';

export const getConversationsReducer = (
  state = { conversations: [] },
  action
) => {
  switch (action.type) {
    case CONVERSATION_GET_REQUEST:
      return { loading: true, conversations: [] };
    case CONVERSATION_GET_SUCCESS:
      return { loading: false, conversations: action.payload };
    case CONVERSATION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createConversationReducer = (
  state = { conversation: {} },
  action
) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true };
    case CONVERSATION_CREATE_SUCCESS:
      console.log('sucess');
      break;
    // return { loading: false, conversations: [...conversations,action.payload]}
    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
