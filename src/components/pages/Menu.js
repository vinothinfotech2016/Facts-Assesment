import { Box } from "@mui/material";
import React from "react";
import { Header } from "../layout/Header";
import { useNavigate } from "react-router-dom";
import { paths } from "../navigation/routePaths";

export const Menu = () => {
  const navigate = useNavigate();
  const handlePortal = () => {
    navigate(`${paths.HOME}`);
  };

  const handlePrototype = () => {
    navigate(`${paths.HOME}`);
  };
  return (
    <>
      <Header />
      <Box className="portal-box" onClick={handlePortal}>
        <span>CONTENT PORTAL</span>
      </Box>
      <Box className="portal-box1" onClick={handlePrototype}>
        <span>PROTOTYPE</span>
      </Box>
    </>
  );
};
