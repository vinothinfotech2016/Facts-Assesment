import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box } from "@mui/material";
import { initValue } from "../constants/constant";
import { CustomStepper } from "../shared";
import { PrototypeNavigation } from "../navigation/Navigation";

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
        <Box sx={{ marginTop: "56px", width: "85%" }}>
          <PrototypeNavigation />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
