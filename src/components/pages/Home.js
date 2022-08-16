import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box } from "@mui/material";
import { initValue } from "../constants/constant";
import { CustomStepper } from "../shared";
// import { Navigation } from "../navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import { routes } from "../navigation/Routes";

const Home = (props) => {
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

        <Routes>
          {/* {props.children} */}
          {routes.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item}
                element={<item.component />}
              />
            );
          })}
        </Routes>
      </Box>
    </Box>
  );
};

export default Home;
