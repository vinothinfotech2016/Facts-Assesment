import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box, Typography } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";
import { MainCont } from "../styled";
import { Header } from "../styled";
import { UserCont } from "../styled";
import { ImgCont } from "../styled";
import { TextCont } from "../styled";
import { Title } from "../styled";
import { IconCont } from "../styled";
import { ChangePass } from "../styled";
import { EditUserIcon } from "../styled";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EditIcon from "@mui/icons-material/Edit";

export const Profile = (props) => {
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
        <MainCont>
          <Header>
            <Typography
              variant="h5"
              sx={{ font: "normal normal 600 20px 24px Lato," }}
            >
              PROFILE
            </Typography>
          </Header>
          <UserCont>
            <ImgCont></ImgCont>
            <TextCont>
              <Typography variant="h5">Dan Schneider</Typography>
              <Typography>Email</Typography>
              <Typography>Phone Number</Typography>
              <Title>Admin</Title>
            </TextCont>
            <IconCont>
              <ChangePass>
                <LockOpenIcon />
              </ChangePass>
              <EditUserIcon>
                <EditIcon />
              </EditUserIcon>
            </IconCont>
          </UserCont>
        </MainCont>
      </Box>
    </Box>
  );
};
