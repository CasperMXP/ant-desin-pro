import {
  queryMenusByLoginName,
  queryTreeData,
  queryMenuChildren,
  removeMenuByMenuId,
  queryMenu,
  addMenu,
  queryButtonsByMenuId,
} from '@/services/menu';

/**
 * 参考文档 https://dvajs.com/api/#model
 */
export default {
  namespace: 'menu',

  state: {
    menuData: [],
    treeData: [],
    menuChildren: [],
    data: {
      list: [],
      pagination: {},
    },
    buttons: [],
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *fetchMenus({ payload }, { call, put }) {
      const response = yield call(queryMenusByLoginName, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchTreeData({ payload }, { call, put }) {
      const response = yield call(queryTreeData, payload);
      yield put({
        type: 'saveTreeData',
        payload: response,
      });
    },
    *children({ payload }, { call, put }) {
      const response = yield call(queryMenuChildren, payload);
      yield put({
        type: 'saveMenuChildren',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeMenuByMenuId, payload);
      yield put({
        type: 'saveMenuChildren',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'saveTableData',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      yield call(addMenu, payload.desc);
      /**
       * 新增后刷新新增是下拉选择组织机构树
       */
      const treeDataResponse = yield call(queryTreeData, payload);
      yield put({
        type: 'saveTreeData',
        payload: treeDataResponse,
      });
      /**
       * 新增后刷新表格数据
       */
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'saveTableData',
        payload: response,
      });
    },
    *getButtonsByMenuId({ payload }, { call, put }) {
      const buttonsResponse = yield call(queryButtonsByMenuId, payload);
      yield put({
        type: 'saveButtons',
        payload: buttonsResponse,
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
        menuData: action.payload.data,
      };
    },
    saveTreeData(state, action) {
      return {
        ...state,
        treeData: action.payload.data,
      };
    },
    saveMenuChildren(state, action) {
      return {
        ...state,
        menuChildren: action.payload.data,
      };
    },
    saveTableData(state, action) {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    saveButtons(state, action) {
      return {
        ...state,
        buttons: action.payload.data,
      };
    },
  },
};
