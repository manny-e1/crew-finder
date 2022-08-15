import {
  POST_DATA_SAVE_TITLE,
  POST_DATA_SAVE_OTHERS,
  POST_DATA_SAVE_TALENTS,
} from './types.post_data';

export const postDataReducer = (
  state = { talents: [], titleAndDescription: {}, others: {} },
  action
) => {
  switch (action.type) {
    case POST_DATA_SAVE_TITLE:
      return {
        ...state,
        titleAndDescription: action.payload,
      };
    case POST_DATA_SAVE_TALENTS:
      return {
        ...state,
        talents: [...state.talents, ...action.payload],
      };
    case POST_DATA_SAVE_OTHERS:
      return {
        ...state,
        others: action.payload,
      };
    default:
      return state;
  }
};
