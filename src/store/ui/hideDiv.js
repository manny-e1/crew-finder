const HIDE = 'HIDE';
const UNHIDE = 'UNHIDE';

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
