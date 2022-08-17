import React from "react";
import { Typography } from "@mui/material";
// import { Routes, Route } from "react-router-dom";
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
import { clickPaths } from "../navigation/routePaths";
import { useNavigate } from "react-router";

export const Profile = () => {
  const navigate = useNavigate();
  return (
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
          list
          <Typography variant="h5">Dan Schneider</Typography>
          <Typography>Email</Typography>
          <Typography>Phone Number</Typography>
          <Title>Admin</Title>
        </TextCont>
        <IconCont>
          <ChangePass
            onClick={() => navigate(clickPaths.USENAVIGATERCHANGEPASSWORD)}
          >
            <LockOpenIcon />
          </ChangePass>
          <EditUserIcon
            onClick={() => navigate(clickPaths.USENAVIGATEPROFILEFORM)}
          >
            <EditIcon />
          </EditUserIcon>
        </IconCont>
      </UserCont>
    </MainCont>
  );
};
