import {
  POST_DATA_SAVE_TITLE,
  POST_DATA_SAVE_TALENTS,
  POST_DATA_SAVE_OTHERS,
} from './types.post_data';

export const saveTitleAndDescription = (data) => async (dispatch, getState) => {
  dispatch({
    type: POST_DATA_SAVE_TITLE,
    payload: data,
  });
  localStorage.setItem('titleAndDescription', JSON.stringify(data));
};

export const saveTalents = (data) => (dispatch) => {
  dispatch({
    type: POST_DATA_SAVE_TALENTS,

    payload: data,
  });
  localStorage.setItem('talents', JSON.stringify(data));
};

export const saveOthers = (data) => (dispatch) => {
  dispatch({
    type: POST_DATA_SAVE_OTHERS,
    payload: data,
  });
  localStorage.setItem('others', JSON.stringify(data));
};
