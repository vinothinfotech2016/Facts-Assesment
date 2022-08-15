import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box, Button } from "@mui/material";
import { initValue } from "../constants/constant";
import { CustomStepper } from "../shared";
import SearchAppBar from "../shared/CustomSearchbar";
export const Customertable = (props) => {
  return (
    <>
      <Box>
        <NavBar user={props.user} navigate={props.navigate} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "15%" }}>
            <CustomStepper
              navigate={props.navigate}
              stepperVal={initValue.stepper}
            />
          </Box>

          <Box className="tabletitlebox">
            <span className="tablehead">Customers</span>
            <Box
              style={{
                display: "flex",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  marginRight: "30px",
                }}
              >
                <SearchAppBar />
              </Box>
              <Button
                variant="contained"
                color="success"
                style={{
                  background: "#59B961 0% 0% no-repeat padding-box",
                  width: "85px",
                  height: "42px",
                  borderRadius: "4px",
                }}
                onClick={() => props.navigate("myuser/newUser")}
              >
                NEW
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
