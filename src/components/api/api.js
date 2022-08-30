import { apiRoutes } from "./apipath";
import appApi from "./config";

export const createUser = (data) => {
  return appApi.post(`${apiRoutes.CREATE_USER}`, data);
};
export const loginUser = (data) => {
  return appApi.post(`${apiRoutes.USER_LOGIN}`, data);
};

export const getRole = () => {
  return appApi.get(`${apiRoutes.GET_ROLES}`);
};