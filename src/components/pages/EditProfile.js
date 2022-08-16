import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import { paths } from "../navigation/routePaths";
import { CustomUploadImage } from "../shared";
import { FormTopbar } from "../shared/FormTopbar";

const EditProfile = (props) => {
  return (
    <>
      <Box>
        <FormTopbar label="Edit Profile" listPath={paths.PROFILE} />
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
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
