import { CLOSE_LOADER, OPEN_LOADER, SNACK_BAR_MESSAGE } from "./constants";

export const openLoaderAction = () => {
  return {
    type: OPEN_LOADER,
  };
};

export const closeLoaderAction = () => {
  return {
    type: CLOSE_LOADER,
  };
};

export const snackBarAction = (data) => {
  return {
    type: SNACK_BAR_MESSAGE,
    payload: data,
  };
};
