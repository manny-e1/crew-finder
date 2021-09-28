import axios from '../../axios';

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

export const getGivenEndorsements = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_REQUEST,
    });

    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.get(`/endorsements/given`, config);
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_GIVEN_ENDORSEMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReceivedEndorsements =
  (endorseeId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_REQUEST,
      });

      const {
        userLogin: { currentUser },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.get(
        `/endorsements/received/${endorseeId}`,
        config
      );
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_RECEIVED_ENDORSEMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const endorseUser = (endorsement) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ENDORSE_USER_REQUEST,
    });
    const {
      userLogin: { currentUser },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    };
    const { data } = await axios.post('/endorsements', endorsement, config);
    dispatch({
      type: ENDORSE_USER_SUCCESS,
      payload: data,
    });
    dispatch(getGivenEndorsements());
  } catch (error) {
    dispatch({
      type: ENDORSE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const applicationDetail = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: APPLICATION_DETAIL_REQUEST,
//     });
//     const {
//       userLogin: { currentUser },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${currentUser.token}`,
//       },
//     };
//     const { data } = await axios.get(`/applications/${id}`, config);
//     dispatch({
//       type: APPLICATION_DETAIL_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: APPLICATION_DETAIL_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const updateApplication =
//   (id, auditionPostId, updateData) => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: APPLICATION_UPDATE_REQUEST,
//       });
//       const {
//         userLogin: { currentUser },
//       } = getState();

//       const config = {
//         headers: {
//           Authorization: `Bearer ${currentUser.token}`,
//         },
//       };
//       const { data } = await axios.put(
//         `/applications/${id}`,
//         updateData,
//         config
//       );
//       dispatch({
//         type: APPLICATION_UPDATE_SUCCESS,
//         payload: data,
//       });
//       dispatch(listApplications(auditionPostId));
//     } catch (error) {
//       dispatch({
//         type: APPLICATION_UPDATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
