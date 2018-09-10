import {requestWithToken} from '@/utils/request';

export async function queryCurrent(loginName) {
  return requestWithToken(`/api/user/current/${loginName}`);
}

export async function queryUsers() {
  return requestWithToken('/api/users/');
}



