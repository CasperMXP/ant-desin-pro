import { queryCurrent, queryUsers } from '@/services/user';

export default {

  namespace: 'user',

  state: {
    currentUser: {},
    users: [],
  },

  effects: {
    *fetchCurrent({payload}, { call, put }) {
      const response = yield call(queryCurrent,payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload.data || {},
      };
    },
    save(state, action) {
      return {
        ...state,
        users: action.payload.data.list,
      };
    },
  },
};
