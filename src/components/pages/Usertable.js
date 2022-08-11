import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "../shared/CustomSearchbar";
import { paths } from "../navigation/routePaths";

export const Usertable = (props) => {
  const navigate = useNavigate();
  return (
    <Box>
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
              }}
            >
              <Box
                style={{
                  display: "flex",
                  marginRight: "30px",
                }}
              >
                <SearchAppBar />
              </Box>
              <Button
                variant="contained"
                color="success"
                style={{
                  background: "#59B961 0% 0% no-repeat padding-box",
                  width: "85px",
                  height: "42px",
                  borderRadius: "4px",
                }}
                onClick={() => navigate(paths.MYUSERFORM)}
              >
                NEW
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
