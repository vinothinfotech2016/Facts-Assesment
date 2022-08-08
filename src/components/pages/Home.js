import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import CustomStepper from '../shared/CustomStepper';
import { initValue } from "../constent";

export const Home = (props) => {


  return (
    <Box>
      <NavBar user={props.user} navigate={props.navigate} />
      <Box>
        <CustomStepper navigate={props.navigate}/>
      </Box>
      <Routes>
        <Route path="home/indiTable" element={<Table data={initValue.indiUser}/>}/>
        <Route path="home/compTable" element={<Table data={initValue.compUser}/>}/>
      </Routes>
    </Box>
  );
};
