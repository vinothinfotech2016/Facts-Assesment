import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box, Typography } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";

export const Roles = (props) => {
  return (
    <Box>
      <NavBar user={props.user} navigate={props.navigate} />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "15%" }}>
          <CustomStepper
            navigate={props.navigate}
            stepperVal={initValue.stepper}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center',  width: "85%" }}>
          <Typography>Roles</Typography>
        </Box>
      </Box>
    </Box>
  );
};
