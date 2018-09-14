import { requestWithToken } from '../utils/request';

export async function queryOrg(params) {
  return requestWithToken('/api/orgs', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function changeValidFlag(params) {
  return requestWithToken('/api/org/', {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOrg(params) {
  return requestWithToken('/api/org', {
    method: 'POST',
    body: {
      ...params,
      method: 'POST',
    },
  });
}

export async function updateOrg(params) {
  return requestWithToken('/api/org', {
    method: 'PUT',
    body: {
      ...params,
      method: 'put',
    },
  });
}

export async function queryOrgTree() {
  return requestWithToken('/api/org/tree');
}
