import { CLOSE_LOADER, OPEN_LOADER } from "./constants";

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
