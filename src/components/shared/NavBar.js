import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { initValue } from "../constent";

const UserCont = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0px;
`;

const UserTextCont = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 7px;
`;

export const NavBar = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h4" color="inherit" component="div">
            DESIGN TOOL
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <UserCont onClick={handleOpenUserMenu}>
                <UserTextCont>
                  <Typography sx={{ color: "#fff", fontSize: "bold" }}>
                    {props.user}
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                    Admin
                  </Typography>
                </UserTextCont>
                <Avatar src="" sx={{ marginLeft: "10px" }} />
              </UserCont>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                setAnchorElUser(null);
              }}
            >
              {initValue.userDropdown.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setAnchorElUser(null);
                      props.navigate(`${item.route}`);
                    }}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
