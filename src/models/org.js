import {queryOrgChildren} from '@/services/org';

/**
 * 参考文档 https://dvajs.com/api/#model
 */
export default {
  
  namespace: 'org',

  state: {
    orgChildren: [],
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *children({payload}, { call, put }) {
      const response = yield call(queryOrgChildren,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

  },
  /**
   * reducers 处理同步操作，唯一可以修改state的地方，由action触发
   */
  reducers: {
    save(state, action) {
      return {
        ...state,
        orgChildren: action.payload.data,
      };
    },
  },
};
