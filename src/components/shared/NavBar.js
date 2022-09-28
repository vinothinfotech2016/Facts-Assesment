import React, { useEffect } from "react";
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
import { initValue } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { getRole } from "../api/api";

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
  const navigate = useNavigate();
  const [roles, setRoles] = React.useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  let userInfo = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getRole()
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          zIndex: "100",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          color="inherit"
          component="div"
          sx={{
            border: "1px solid #9e9e9e",
            maxHeight: "56px",
            width: "15.5%",
            backgroundColor: "#fff",
          }}
        ></Typography>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: "#fff",
            border: "1px solid #9e9e9e",
            width: "85%",
          }}
        >
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <UserCont onClick={handleOpenUserMenu}>
                <UserTextCont>
                  <Typography sx={{ color: "#000", fontSize: "bold" }}>
                    {userInfo.data.name}
                  </Typography>
                  <Typography sx={{ color: "#9e9e9e", fontSize: "12px" }}>
                    {roles.map((role) => {
                      return role.id === userInfo?.data?.roleId && role.role;
                    })}
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
                      navigate(`${item.route}`);
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
