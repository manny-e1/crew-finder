const HIDE = 'HIDE';
const UNHIDE = 'UNHIDE';
const HIDE_EDIT = 'HIDE_EDIT';
const UNHIDE_EDIT = 'UNHIDE_EDIT';
const HIDE_IMAGE_UPLOAD = 'HIDE_IMAGE_UPLOAD';
const UNHIDE_IMAGE_UPLOAD = 'UNHIDE_IMAGE_UPLOAD';

export const hideDiv = () => async (dispatch, getState) => {
  dispatch({
    payload: 'hidden',
    type: HIDE,
  });
};

export const unhideDiv = (application) => async (dispatch, getState) => {
  dispatch({
    payload: {
      hidden: 'flex',
      application,
    },
    type: UNHIDE,
  });
};
export const hideEdit = () => async (dispatch, getState) => {
  dispatch({
    payload: 'hidden',
    type: HIDE_EDIT,
  });
};

export const unhideEdit = () => async (dispatch, getState) => {
  dispatch({
    payload: {
      hidden: 'flex',
    },
    type: UNHIDE_EDIT,
  });
};

export const hideImageUpload = () => async (dispatch, getState) => {
  dispatch({
    payload: 'hidden',
    type: HIDE_IMAGE_UPLOAD,
  });
};

export const unhideDivImageUpload = () => async (dispatch, getState) => {
  dispatch({
    payload: {
      hidden: 'flex',
    },
    type: UNHIDE_IMAGE_UPLOAD,
  });
};

export const hideDivReducer = (
  state = { hidden: true, application: {} },
  action
) => {
  switch (action.type) {
    case HIDE:
      return {
        hidden: action.payload,
        application: {},
      };
    case UNHIDE:
      return {
        hidden: action.payload.hidden,
        application: action.payload.application,
      };
    default:
      return state;
  }
};
export const hideEditReducer = (state = { hidden: true }, action) => {
  switch (action.type) {
    case HIDE_EDIT:
      return {
        hidden: action.payload,
      };
    case UNHIDE_EDIT:
      return {
        hidden: action.payload.hidden,
      };
    default:
      return state;
  }
};
export const hideImageUploadReducer = (state = { hidden: true }, action) => {
  switch (action.type) {
    case HIDE_IMAGE_UPLOAD:
      return {
        hidden: action.payload,
      };
    case UNHIDE_IMAGE_UPLOAD:
      return {
        hidden: action.payload.hidden,
      };
    default:
      return state;
  }
};
