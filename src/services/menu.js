import {requestWithToken} from "../utils/request";

export async function queryMenusByLoginName(loginName) {
  return requestWithToken(`/api/menus/${loginName}`);
}

export async function queryTreeData() {
  return requestWithToken('/api/menu/tree');
}

export async function queryMenuChildren(menuId) {
  return requestWithToken(`/api/menu/children/${menuId}`);
}

export async function removeMenuByMenuId(params) {
  return requestWithToken('/api/menu', {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}
