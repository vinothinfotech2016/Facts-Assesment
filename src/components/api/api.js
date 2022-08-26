import { apiRoutes } from "./apipath";
import appApi from "./config";

export const createUser = (data) => {
  return appApi.post(`${apiRoutes.CREATE_USER}`, data);
};
