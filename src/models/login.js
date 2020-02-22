import router from 'umi/router';
import { stringify } from 'querystring';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { userLogin } from '@/services/login';
import { logout } from '@/services/user';
import { message } from 'antd';
import { setAuthority } from '@/utils/authority';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      if (response.code == 0) {
        setAuthority(response.data);
        console.log(response);
        router.push('/welcome');
      } else {
        message.warn(response.msg);
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout({ payload, callback }, { call, put }) {
      const response = yield call(logout);
      if (!response) {
        return;
      }
      if (response.code == 0) {
        callback();
      } else {
        message.warn(response.msg);
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload = {} }) {
      // setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
