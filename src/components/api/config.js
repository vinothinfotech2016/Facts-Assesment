import axios from "axios";
import { store } from "../../redux";
import { closeLoaderAction, openLoaderAction } from "../../redux/actions";

const appApi = axios.create({
  baseURL: "http://localhost:3000",
});

appApi.interceptors.request.use((request) => {
  store.dispatch(openLoaderAction());
  return request;
});

appApi.interceptors.response.use(
  (response) => {
    store.dispatch(closeLoaderAction());
    return response;
  },
  (error) => {
    store.dispatch(closeLoaderAction());
    return Promise.reject(error);
  }
);

export default appApi;
