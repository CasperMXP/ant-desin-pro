import {query as queryRoutes} from '@/services/route';

/**
 * 参考文档 https://dvajs.com/api/#model
 */
export default {
  namespace: 'route',

  state: {
    routes: [],
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *fetchRoutes(_, { call, put }) {
      const response = yield call(queryRoutes);
      console.log('call route service')
      console.log(response)
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
      console.log(state)
      console.log(action)
      return {
        ...state,
        routes: action.payload,
      };
    },
  },
};
