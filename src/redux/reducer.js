import {
  CLOSE_LOADER,
  initialState,
  OPEN_LOADER,
  SNACK_BAR_MESSAGE,
} from "./constants";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case SNACK_BAR_MESSAGE:
      return {
        ...state,
        snackBarData: action.payload,
      };
    default:
      return state;
  }
};
