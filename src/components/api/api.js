import { apiRoutes } from "./apipath";
import appApi from "./config";

export const createCustomer = (data) => {
  return appApi.post(`${apiRoutes.CREATE_CUSTOMER}`, data);
};
export const loginUser = (data) => {
  return appApi.post(`${apiRoutes.USER_LOGIN}`, data);
};

export const getRole = () => {
  return appApi.get(`${apiRoutes.GET_ROLES}`);
};

export const userList = () => {
  return appApi.get(`${apiRoutes.GET_USER}`);
};
