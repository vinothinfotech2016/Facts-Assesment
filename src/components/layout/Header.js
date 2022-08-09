import React from "react";
import { styled } from "@mui/system";
import { AppBar } from "@mui/material";

const Title = styled("span")({
  font: "Lato,Semibold",
  letterSpacing: 0,
  color: "rgba(112, 112, 112, 0.8)",
  opacity: 1,
  fontSize: 32,
  display: "flex",
  justifyContent: "center",
});

export const Header = () => {
  return (
    <AppBar
      style={{
        background: "white",
        border: "1px solid #707070",
        height: "45px",
      }}
      elevation={0}
      position="fixed"
    >
      <Title>DESIGN TOOL</Title>
    </AppBar>
  );
};
