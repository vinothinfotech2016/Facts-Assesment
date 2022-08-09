import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { Header } from "../layout/Header";
import { useFormik } from "formik";
import { loginSchema } from "../validation";

function Login(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      props.navigate("/menu");
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Header />
        <Box className="outerbox">
          <Grid
            className="grid-container"
            container
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
            border={1}
            borderRadius={2}
            height="350px"
            width="380px"
          >
            <h3 className="heading">LOGIN</h3>
            <Grid item>
              <TextField
                required
                label="Email-id/Mobile"
                name="email"
                InputLabelProps={{ shrink: true }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.email ? formik.errors.email : null
                )}
                helperText={formik.errors.email ? formik.errors.email : null}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                required
                label="Password"
                name="password"
                InputLabelProps={{ shrink: true }}
                type={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.password ? formik.errors.password : null
                )}
                helperText={
                  formik.errors.password ? formik.errors.password : null
                }
              ></TextField>
            </Grid>

            <Grid item>
              <Button variant="outlined" type="submit">
                {" "}
                Login{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default Login;
