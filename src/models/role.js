import { addRole, queryRole, queryRoleType, setUsers, updateRole, setMenus } from '@/services/role';

export default {
  namespace: 'role',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    roleTypes: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchRoleType(_, { call, put }) {
      const response = yield call(queryRoleType);
      yield put({
        type: 'saveRoleType',
        payload: response,
      });
    },
    *add({ payload }, { call, put }) {
      yield call(addRole, payload.desc);
      /**
       * 新增后自动刷新表格
       */
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      yield call(updateRole, payload.desc);
      /**
       * 更新成功后刷新表格
       */
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setUsers({ payload }, { call, put }) {
      yield call(setUsers, payload.desc);
      /**
       * 更新成功后刷新表格
       */
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *setMenus({ payload }, { call, put }) {
      yield call(setMenus, payload.desc);
      /**
       * 更新成功后刷新表格
       */
      const response = yield call(queryRole, payload);
      yield put({
        type: 'save',
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
    saveRoleType(state, action) {
      return {
        ...state,
        roleTypes: action.payload.data,
      };
    },
  },
};
