import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled(Box)({
  padding: 20,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  zIndex: 10,
});
const IconBtn = styled(ArrowBackIcon)({
  color: "black",
  marginRight: 6,
});
const Title = styled(Typography)({
  font: "normal normal 400 20px/24px Lato !important",
  fontWeight: "bold !important",
});

export function FormTopbar(props) {
  const { label, listPath } = props;
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <IconButton onClick={() => navigate(listPath ? listPath : -1)}>
        <IconBtn />
      </IconButton>
      <Title>{label}</Title>
    </HeaderContainer>
  );
}
