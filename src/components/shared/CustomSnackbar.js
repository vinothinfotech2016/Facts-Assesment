import { Alert, Snackbar } from "@mui/material";
import React from "react";

function CustomSnackbar(props) {
  const { open, setOpen, message } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomSnackbar;
