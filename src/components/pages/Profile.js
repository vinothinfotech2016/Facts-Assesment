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
  let userInfo = JSON.parse(localStorage.getItem("user"));
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
          <Typography variant="h5">{userInfo.data.name}</Typography>
          <Typography>{userInfo.data.email}</Typography>
          <Typography>{userInfo.data.mobileNumber}</Typography>
          <Title>{userInfo.data.roleId}</Title>
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
