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

export const getMenusByUserId = (id) => {
  return appApi.get(`${apiRoutes.GET_MENU_BY_USER_ID}/${id}`);
};

export const updateMenu = (value, id) => {
  return appApi.put(`${apiRoutes.UPDATE_MENU}/${id}`, value);
};

export const getUsers = () => {
  return appApi.get(`${apiRoutes.USER_LISTING}`);
};

export const createUsers = (value) => {
  return appApi.post(`${apiRoutes.CREATE_USER}`, value);
};

export const createScreen = (value) => {
  return appApi.post(`${apiRoutes.CREATE_SCREEN}`, value);
};

export const getScreensByProductId = (id) => {
  return appApi.get(`${apiRoutes.GET_SCREEN_BY_PRODUCT_ID}/${id}`);
};

export const getScreenById = (id) => {
  return appApi.get(`${apiRoutes.GET_SCREEN_BY_ID}/${id}`);
};

export const updateScreenFlow = (value) => {
  return appApi.put(`${apiRoutes.UPDATE_SCREEN_FLOW}`, value);
};
