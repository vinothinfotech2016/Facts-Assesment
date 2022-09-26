export const OPEN_LOADER = "openLoader";
export const CLOSE_LOADER = "closeLoader";
export const SNACK_BAR_MESSAGE = "snackBarMessage";

export const initialState = {
  loader: false,
  snackBarData: {
    color: "",
    message: "",
    open: false,
  },
};
