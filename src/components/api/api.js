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

export const createProduct = (data) => {
  return appApi.post(`${apiRoutes.PRODUCT_CREATION}`, data);
};

export const getProductById = (id) => {
  return appApi.get(`${apiRoutes.GET_PRODUCT_BY_ID}/${id}`);
};

export const updateProduct = (value, id) => {
  return appApi.post(`${apiRoutes.UPDATE_PRODUCT}/${id}`, value);
};

export const createMenu = (value) => {
  return appApi.post(`${apiRoutes.CREATE_MENU}`, value);
};
