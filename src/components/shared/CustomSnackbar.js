import { Alert, Snackbar } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackBarAction } from "../../redux/actions";

function CustomSnackbar() {
  const globalState = useSelector((state) => state);
  const { snackBarData } = globalState;
  const [openAlert, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(snackBarData.open);
  }, [snackBarData]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setTimeout(
      () =>
        dispatch(
          snackBarAction({
            color: "",
            message: "",
            open: false,
          })
        ),
      2200
    );
  };

  return (
    <>
      <Snackbar open={openAlert} onClose={handleClose} autoHideDuration={6000}>
        <Alert
          severity={snackBarData.color || "error"}
          onClose={handleClose}
          sx={{ width: "100%" }}
        >
          {snackBarData.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomSnackbar;
