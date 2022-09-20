import { actions } from "react-table";
import { CLOSE_LOADER, initialState, OPEN_LOADER } from "./constants";

export const reducer = (state = initialState, acion) => {
  switch (actions.type) {
    case OPEN_LOADER:
      return {
        ...state,
        loader: true,
      };
    case CLOSE_LOADER:
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
};
