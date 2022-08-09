import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";



const Home = (props) => {
  return (
    <Box>
      <NavBar user={props.user} navigate={props.navigate} />
      <Box>
        <CustomStepper navigate={props.navigate} stepperVal={initValue.stepper}/>
      </Box>
      <Routes>
        <Route path="home/productTable" element/>
        <Route path="home/formTable" element />
        <Route path="home/menuTable" element />
      </Routes>
    </Box>
  );
};

export default Home;
