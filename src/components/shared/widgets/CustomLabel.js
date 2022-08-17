import React from 'react';
import { Typography } from '@mui/material';
import { styled } from "@mui/system";

const Header = styled(Typography)({
    fontSize:20,
    color:"#4F4A98",
    fontStyle:'bold',
})

export const CustomLabel = (props) => {
  return (
    <Header>{props.schema.label}</Header>
  )
}