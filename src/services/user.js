import {requestWithToken} from '@/utils/request';

export async function queryCurrent(loginName) {
  return requestWithToken(`/api/user/current/${loginName}`);
}

export async function queryUsers(params) {
  return requestWithToken('/api/users', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function addUser(params) {
  return requestWithToken('/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function updateUser(params) {
  return requestWithToken('/api/user', {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}

export async function removeUser(params) {
  return requestWithToken('/api/user', {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function validUser(params) {
  return requestWithToken('/api/user/valid', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function resetPassword(params) {
  return requestWithToken('/api/user/resetPassword', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

