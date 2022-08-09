import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box, Typography } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";
import { ProductMaster } from "./ProductMaster";
import { FormMaster } from "./FormMaster";
import { MenuTable } from "./MenuTable";

const Home = (props) => {
  return (
    <Box>
      <NavBar user={props.user} navigate={props.navigate} />
      <Box sx={{display:'flex'}}>
        <Box sx={{width:'15%'}}>
          <CustomStepper
            navigate={props.navigate}
            stepperVal={initValue.stepper}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center',  width: "85%" }}>
          <Typography>Home</Typography>
          <Routes>
            <Route path="/productTable" element={<ProductMaster/>} />
            <Route path="/formTable" element={<FormMaster/>}  />
            <Route path="/menuTable" element={<MenuTable/>}  />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
