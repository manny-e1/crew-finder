import {
    AUDITIONPOST_LIST_REQUEST,
    AUDITIONPOST_LIST_SUCCESS,
    AUDITIONPOST_LIST_FAIL,
    AUDITIONPOST_DETAIL_REQUEST,
    AUDITIONPOST_DETAIL_SUCCESS,
    AUDITIONPOST_DETAIL_FAIL,
    POSTAUDITION_REQUEST,
    POSTAUDITION_SUCCESS,
    POSTAUDITION_FAIL
} from './types.auditionpost'

export const auditionPostListReducer = (state = {auditionPosts: []}, action) => {
    switch (action.type) {
        case AUDITIONPOST_LIST_REQUEST:
            return { loading: true, auditionPosts: [] }
        case AUDITIONPOST_LIST_SUCCESS:
            return { loading: false, auditionPosts: action.payload}
        case AUDITIONPOST_LIST_FAIL:
            return { loading: false, error:action.payload}
        default:
            return state
    }
}

export const postAuditionReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case POSTAUDITION_REQUEST:
            return { loading: true }
        case POSTAUDITION_SUCCESS:
            console.log("sucess");
            break;
            // return { loading: false, auditionPosts: [...auditionPosts,action.payload]}
        case POSTAUDITION_FAIL:
            return { loading: false, error:action.payload}
        default:
            return state
    }
}

export const auditionPostDetailReducer = (
    state={auditionPost:{}},
    action
    ) => {
    switch (action.type) {
        case AUDITIONPOST_DETAIL_REQUEST:
            return { loading: true, auditionPost: {} }
        case AUDITIONPOST_DETAIL_SUCCESS:
            return { loading: false, auditionPost: action.payload}
        case AUDITIONPOST_DETAIL_FAIL:
            return { loading: false, error:action.payload}
        default:
            return state
    }
}