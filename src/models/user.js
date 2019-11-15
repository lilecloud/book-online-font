import { queryCurrent, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log('currentUserRespon', response);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *clearCurrentUser(_, { call, put }) {
      yield put({
        type: 'clearCurrent',
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      console.log('state', state, 'action', action);
      return { ...state, currentUser: action.payload };
    },
    clearCurrent(state, action) {
      return {
        ...state,
        currentUser: {},
      };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
