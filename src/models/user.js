import { queryCurrent, query as queryUsers, logout } from '@/services/user';
import { setAuthority, removeAuthority } from '@/utils/authority';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

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
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.code == 0) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        setAuthority(response.data);

        yield put(routerRedux.push('/welcome'));
        console.log(response);
      } else {
        message.warn(response.msg);
      }
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log('currentUserRespon', response);
      if (response.code == 401) {
        yield put(
          routerRedux.push({
            pathname: '/user/login',
          }),
        );
        return;
      }
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *clearCurrentUser(_, { call, put }) {
      // removeAuthority();
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
    saveUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
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
