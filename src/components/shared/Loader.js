import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Loader() {
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
        <CircularProgress />
      </Box>
    </>
  );
}

export default Loader;
