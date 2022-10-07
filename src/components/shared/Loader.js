import { CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Loader(props) {

  const {open} = props

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: 100,
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal
          open={open}
          sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border:"none"
          }}
        >
        <CircularProgress />
        </Modal>
      </Box>
    </>
  );
}

export default Loader;
