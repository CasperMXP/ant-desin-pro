import {requestWithToken} from "../utils/request";

export async function queryMenusByLoginName(loginName) {
  return requestWithToken(`/api/menus/${loginName}`);
}

