import { queryOrg, addOrg, removeOrg, updateOrg, queryOrgTree } from '@/services/org';

/**
 * 参考文档 https://dvajs.com/api/#model
 */
export default {
  namespace: 'org',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    orgTree: [],
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(addOrg, payload.desc);
      yield put({
        type: 'save',
        payload: response,
      });

      const response1 = yield call(queryOrgTree, payload);
      yield put({
        type: 'saveOrgTree',
        payload: response1,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchOrgTree({ payload }, { call, put }) {
      const response = yield call(queryOrgTree, payload);
      yield put({
        type: 'saveOrgTree',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    saveOrgTree(state, action) {
      return {
        ...state,
        orgTree: action.payload.data,
      };
    },
  },
};
