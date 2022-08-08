import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
const Login = () => {
  return (
    <Box className="outerbox">
      <Grid
        container
        // spacing={5}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        border={1}
        borderRadius={2}
        height="350px"
        width="380px"
      >
        <h3>LOGIN</h3>
        <Grid item>
          <TextField label="Email-id/Mobile"></TextField>
        </Grid>
        <Grid item>
          <TextField label="Password" type={"password"}></TextField>
        </Grid>

        <Grid item>
          <Button variant="outlined"> Login </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
