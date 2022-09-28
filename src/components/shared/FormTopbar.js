import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled(Box)({
  padding: 20,
  margin: "2px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  top: "58px",
  backgroundColor: "white",
  zIndex: 100,
  width: "100%",
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
      <Box
        onClick={() => navigate(listPath ? listPath : -1)}
        sx={{ display: "flex", cursor: "pointer" }}
      >
        <IconBtn />

        <Title>{label}</Title>
      </Box>
    </HeaderContainer>
  );
}
