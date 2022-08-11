import React from "react";
import { NavBar } from "../shared/NavBar";
import { Box, Button, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { paths } from "../navigation/routePaths";

export const Usertable = (props) => {
  const navigate = useNavigate();
  return (
    <Box>
      <NavBar user={props.user} navigate={props.navigate} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "84%",
          paddingTop: 3,
          paddingLeft: 3,
        }}
      >
        <span
          style={{
            font: "normal normal 600 18px Lato",
            color: "#333333",
          }}
        >
          MY USERS
        </span>
        <Box
          style={{
            display: "flex",
            width: "50%",
          }}
        >
          <Box
            style={{
              width: "35%",
              marginRight: 30,
              display: "flex",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                height: "6%",
                backgroundColor: "#F4F4F4",
              }}
            >
              <SearchOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField label="SEARCH" variant="standard" />
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="success"
              style={{
                background: "#59B961 0% 0% no-repeat padding-box",
                width: "85px",
                height: "42px",
                borderRadius: "4px",
              }}
              onClick={() => navigate(`${paths.MYUSERFORM}`)}
            >
              NEW
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
