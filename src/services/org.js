import {requestWithToken} from "../utils/request";

export async function queryOrgChildren(id) {
  return requestWithToken(`/api/org/children/${id}`);
}

