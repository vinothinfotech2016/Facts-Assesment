import { IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import { styled } from '@mui/system';
import { useLocation, useNavigate } from 'react-router';
import { clickPaths } from '../navigation/routePaths';


const Titles = styled(Typography)({
  padding: "14px !important",
  cursor: "pointer !important",
  font: "normal normal normal 16px/19px Rubik !important",
  color: "#000000 !important",
});

function MenuPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const {Menu , index , path} = props
  const navigate = useNavigate()


const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (Menu,index) =>{
    navigate(path, {
      state: Menu[index],
    });
  

  }

  return (
   <>
   <IconButton  onClick={handleClick}>
        <MoreHorizTwoToneIcon />
      </IconButton>
      <Popover
               id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
      <Titles onClick={() => handleEdit(Menu,index)}>Edit</Titles>
      </Popover>
   </>
  )
}

export default MenuPopover