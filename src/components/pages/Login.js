import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Header } from "../layout/Header";
import { useFormik } from "formik";
import { loginSchema } from "../validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { mapPaths } from "../navigation/routePaths";
import { loginUser } from "../api/api";

function Login(props) {
  const [visible, setVisible] = useState(false);
  const [isTypedEmail, setIsTypedEmail] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: () => loginSchema(isTypedEmail),
    onSubmit: () => {
      let data = {
        email: formik.values.email,
        password: formik.values.password,
      };
      loginUser(data)
        .then(function (response) {
          console.log(response);
          navigate(`${mapPaths.MENU}`);
          localStorage.setItem("user", JSON.stringify(response));
        })
        .catch(function (error) {
          setErrorMsg(error.response.data);
        });
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
            {errorMsg !== "" ? (
              <Alert severity="error">{errorMsg?.error}</Alert>
            ) : (
              ""
            )}
            <Grid item>
              <TextField
                required
                label="Email-id/Mobile"
                name="email"
                InputLabelProps={{ shrink: true }}
                value={formik.values.email}
                onChange={(e) => {
                  const t = e.target.value;
                  setIsTypedEmail(isNaN(e.target.value));
                  formik.handleChange({ ...e, [t]: isNaN(e.target.value) });
                }}
                error={Boolean(
                  formik.errors.email ? formik.errors.email : null
                )}
                helperText={formik.errors.email ? formik.errors.email : null}
                style={{ width: "275px" }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                required
                label="Password"
                name="password"
                InputLabelProps={{ shrink: true }}
                type={visible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.password && formik.touched.password
                    ? formik.errors.password
                    : null
                )}
                helperText={
                  formik.errors.password ? formik.errors.password : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>

            <Grid item>
              <Button variant="outlined" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default Login;
