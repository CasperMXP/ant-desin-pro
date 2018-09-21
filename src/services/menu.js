import { requestWithToken } from '../utils/request';

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

export async function queryMenu(params) {
  return requestWithToken('/api/menus', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function addMenu(params) {
  return requestWithToken('/api/menu', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function updateMenuOrButtons(params) {
  return requestWithToken('/api/menu', {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function queryAllLeafMenu() {
  return requestWithToken('/api/menus/leaf');
}

export async function queryMenuButtonTree() {
  return requestWithToken('/api/menu/leafmenubuttontree');
}
