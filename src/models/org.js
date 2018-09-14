import { addOrg, queryOrg, queryOrgTree, removeOrg, updateOrg } from '@/services/org';

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
      yield call(addOrg, payload.desc);
      /**
       * 新增后刷新新增是下拉选择组织机构树
       */
      const orgTreeResponse = yield call(queryOrgTree, payload);
      yield put({
        type: 'saveOrgTree',
        payload: orgTreeResponse,
      });
      /**
       * 新增后刷新表格数据
       */
      const response = yield call(queryOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      yield call(removeOrg, payload);
      const orgTableResponse = yield call(queryOrg, payload);
      yield put({
        type: 'save',
        payload: orgTableResponse,
      });
      /**
       * 删除成功后刷新表格
       */
      const response = yield call(queryOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      /**
       * 删除后刷新新增是下拉选择组织机构树
       */
      const orgTreeResponse = yield call(queryOrgTree, payload);
      yield put({
        type: 'saveOrgTree',
        payload: orgTreeResponse,
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateOrg, payload.desc);
      /**
       * 更新成功后刷新表格
       */
      const response = yield call(queryOrg, payload);
      yield put({
        type: 'save',
        payload: response,
      });
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
