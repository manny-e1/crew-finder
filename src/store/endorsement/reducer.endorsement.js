import {
  ENDORSE_USER_REQUEST,
  ENDORSE_USER_SUCCESS,
  ENDORSE_USER_FAIL,
  GET_GIVEN_ENDORSEMENT_REQUEST,
  GET_GIVEN_ENDORSEMENT_SUCCESS,
  GET_GIVEN_ENDORSEMENT_FAIL,
  GET_RECEIVED_ENDORSEMENT_REQUEST,
  GET_RECEIVED_ENDORSEMENT_SUCCESS,
  GET_RECEIVED_ENDORSEMENT_FAIL,
} from './types.endorsement';

export const givenEndorsementsReducer = (
  state = { givenEndorsements: [] },
  action
) => {
  switch (action.type) {
    case GET_GIVEN_ENDORSEMENT_REQUEST:
      return { loading: true, givenEndorsements: [] };
    case GET_GIVEN_ENDORSEMENT_SUCCESS:
      return { loading: false, givenEndorsements: action.payload };
    case GET_GIVEN_ENDORSEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const receivedEndorsementsReducer = (
  state = { receivedEndorsements: [] },
  action
) => {
  switch (action.type) {
    case GET_RECEIVED_ENDORSEMENT_REQUEST:
      return { loading: true, receivedEndorsements: [] };
    case GET_RECEIVED_ENDORSEMENT_SUCCESS:
      return { loading: false, receivedEndorsements: action.payload };
    case GET_GIVEN_ENDORSEMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const endoreUserReducer = (state = { endorsement: {} }, action) => {
  switch (action.type) {
    case ENDORSE_USER_REQUEST:
      return { loading: true };
    case ENDORSE_USER_SUCCESS:
      // console.log("success");
      return { loading: false, endorsement: action.payload };
    case ENDORSE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
