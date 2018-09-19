import { requestWithToken } from '@/utils/request';

export async function queryRole(params) {
  return requestWithToken('/api/roles', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function queryRoleType() {
  return requestWithToken('/api/roletypes');
}

export async function addRole(params) {
  return requestWithToken('/api/role', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function updateRole(params) {
  return requestWithToken('/api/role', {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function setUsers(params) {
  return requestWithToken('/api/role/users', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function setMenus(params) {
  return requestWithToken('/api/role/menus', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}
