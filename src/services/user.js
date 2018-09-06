import {requestWithToken,request} from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return requestWithToken('/api/user/current');
}
