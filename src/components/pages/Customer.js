import React from "react";
import { Box, Typography } from "@mui/material";
// import { Routes, Route } from "react-router-dom";

export const Customer = (props) => {
  return (
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center',  width: "85%" }}>
          <Typography>Customer</Typography>
        </Box>
      </Box>
  );
};
