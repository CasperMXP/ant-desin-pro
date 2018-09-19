import {
  addUser,
  queryAllUsers,
  queryCurrent,
  queryUsers,
  removeUser,
  resetPassword,
  updateUser,
  validUser
} from '@/services/user';

export default {

  namespace: 'user',

  state: {
    currentUser: {},
    data: {
      list: [],
      pagination: {},
    },
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
    *add({ payload }, { call,put }) {
      yield call(addUser, payload.desc);
      /**
       * 新增成功后刷新页面
       */
      const response = yield call(queryUsers,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload }, { call,put }) {
      yield call(updateUser, payload.desc);
      /**
       * 更新成功后刷新表格
       */
      const response = yield call(queryUsers,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload, callback }, { call, put }) {
      yield call(removeUser, payload);
      if (callback) callback();
      /**
       * 删除成功后刷新表格
       */
      const response = yield call(queryUsers,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *valid({ payload, callback }, { call, put }) {
      yield call(validUser, payload);
      if (callback) callback();
      /**
       * 设置有效成功后刷新表格
       */
      const response = yield call(queryUsers,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *resetPassword({ payload, callback }, { call }) {
      yield call(resetPassword, payload);
      if (callback) callback();
    },
    *fetchAllUsers(_, { call, put }) {
      const response = yield call(queryAllUsers);
      yield put({
        type: 'saveUsers',
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
        data: action.payload.data,
      };
    },
    saveUsers(state, action) {
      return {
        ...state,
        users: action.payload.data,
      };
    },
  },
};
