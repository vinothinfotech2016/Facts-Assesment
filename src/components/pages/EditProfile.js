import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { clickPaths } from "../navigation/routePaths";
import { CustomUploadImage } from "../shared";
import { FormTopbar } from "../shared/FormTopbar";

const EditProfile = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <FormTopbar
          label="Edit Profile"
          listPath={clickPaths.USENAVIGATEPROFILE}
        />
        <Box className="container">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField label="Name*" />
            </Grid>
            <Grid item xs={6}>
              <CustomUploadImage label={"Profile Image"} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Mobile No*" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Email*" />
            </Grid>
          </Grid>
          <Box className="btnContainer">
            <Button
              variant="outlined"
              className="btn"
              onClick={() => navigate(clickPaths.USENAVIGATEPROFILE)}
            >
              CANCEL
            </Button>
            <Button variant="outlined" className="btn">
              UPDATE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
