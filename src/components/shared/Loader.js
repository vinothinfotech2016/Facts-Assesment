import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Loader() {
  return (
    <>
      <Box sx={{ position: "absolute", top: "50vh", left: "50%" }}>
        <CircularProgress />
        loading...
      </Box>
    </>
  );
}

export default Loader;
