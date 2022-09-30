import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";




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

function StyledTopBar(props) {
const {label , onClick} = props

  return (
  <>
  
   <HeaderContainer>
      <Box
        onClick={onClick}
        sx={{ display: "flex", cursor: "pointer" }}
      >
        <IconBtn />

        <Title>{label}</Title>
      </Box>
    </HeaderContainer>
  
  </>
  )
}

export default StyledTopBar