import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  applicationDetailReducer,
  applicationListReducer,
  postApplicationReducer,
  updateApplicationReducer,
} from './application/reducer.application';
import {
  auditionPostDetailReducer,
  auditionPostListReducer,
} from './auditionPost/reducer.auditionpost';
import {
  createConversationReducer,
  getConversationsReducer,
} from './conversation/reducer.conversation';
import {
  getMessagesReducer,
  sendMessageReducer,
} from './message/reducer.message';
import { postDataReducer } from './post_data_local/reducers.post_data';
import { hideDivReducer } from './ui/hideDiv';
import {
  getAllUsersReducer,
  getUsersReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './user/reducer.user';
const currentUserFromStorage = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

const reducer = combineReducers({
  hideDiv: hideDivReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  getUsers: getUsersReducer,
  getAllUsers: getAllUsersReducer,
  auditionPostList: auditionPostListReducer,
  auditionPostDetail: auditionPostDetailReducer,
  applicationPost: postApplicationReducer,
  applicationList: applicationListReducer,
  applicationDetail: applicationDetailReducer,
  updateApplication: updateApplicationReducer,
  postData: postDataReducer,
  createConversation: createConversationReducer,
  getConversations: getConversationsReducer,
  sendMessage: sendMessageReducer,
  getMessages: getMessagesReducer,
});

const talentsFromLocalStorage = localStorage.getItem('talents')
  ? JSON.parse(localStorage.getItem('talents'))
  : [];

const titleAndDescriptionFromLocalStorage = localStorage.getItem(
  'titleAndDescription'
)
  ? JSON.parse(localStorage.getItem('titleAndDescription'))
  : {};

const othersFromLocalStorage = localStorage.getItem('others')
  ? JSON.parse(localStorage.getItem('others'))
  : {};

const initialState = {
  postData: {
    talents: talentsFromLocalStorage,
    titleAndDescription: titleAndDescriptionFromLocalStorage,
    others: othersFromLocalStorage,
  },
  userLogin: {
    currentUser: currentUserFromStorage,
  },
};

function store() {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState: initialState,
  });
}

export default store;
