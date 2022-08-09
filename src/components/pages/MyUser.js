import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";
import {Typography} from "@mui/material";

export const MyUser = (props) => {
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
          <Typography>My User</Typography>
        </Box>
      </Box>
    </Box>
  );
};
