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
  margin-right:7px;
`;

export const NavBar = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    props.navigate("/");
    handleCloseUserMenu();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h4"
            color="inherit"
            component="div"
          >
            Address Book
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
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="Profile(C)" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile(C)</Typography>
              </MenuItem>
              <MenuItem key="My Team" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">My Team</Typography>
              </MenuItem>
              <MenuItem key="Parameters" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Parameters</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
