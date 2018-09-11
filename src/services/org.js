import { stringify } from 'qs';
import { requestWithToken } from '../utils/request';

export async function queryOrg(params) {
  return requestWithToken(`/api/orgs?${stringify(params)}`);
}

export async function removeOrg(params) {
  return requestWithToken('/api/org', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOrg(params) {
  return requestWithToken('/api/org', {
    method: 'PUT',
    body: {
      ...params,
      method: 'PUT',
    },
  });
}

export async function updateOrg(params) {
  return requestWithToken('/api/org', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryOrgTree() {
  return requestWithToken('/api/org/tree');
}
