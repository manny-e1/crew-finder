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

export const applicationListReducer = (
  state = { applications: [] },
  action
) => {
  switch (action.type) {
    case APPLICATION_LIST_REQUEST:
      return { loading: true, applications: [] };
    case APPLICATION_LIST_SUCCESS:
      return { loading: false, applications: action.payload };
    case APPLICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postApplicationReducer = (state = { application: {} }, action) => {
  switch (action.type) {
    case APPLY_REQUEST:
      return { loading: true };
    case APPLY_SUCCESS:
      // console.log("success");
      return { loading: false, application: action.payload };
    case APPLY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const applicationDetailReducer = (
  state = { application: {} },
  action
) => {
  switch (action.type) {
    case APPLICATION_DETAIL_REQUEST:
      return { loading: true, application: {} };
    case APPLICATION_DETAIL_SUCCESS:
      return { loading: false, application: action.payload };
    case APPLICATION_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateApplicationReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLICATION_UPDATE_REQUEST:
      return { loading: true };
    case APPLICATION_UPDATE_SUCCESS:
      return { loading: false, data: action.payload };
    case APPLICATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
