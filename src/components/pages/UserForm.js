import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, responsiveFontSizes, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React, { useEffect, useState } from "react";
import { formNewUserSchema, formNewUserUiSchema } from "../schema/newuser";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { useNavigate } from "react-router";
import { createUsers, getProductById, getRole } from "../api/api";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../redux/actions";
import { snackBarMessages } from "../constants/SnackBarConstants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getRole()
      .then((res) => {
        setRole(
          res.data.map((item) => ({
            id: item.id,
            name: item.role,
          }))
        );
      })
      .catch((res) => console.log(responsiveFontSizes));

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.data.id;

    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Box>
        <FormTopbar label="New User" listPath={clickPaths.USENAVIGATEMYUSER} />
        <Box className="container">
          <Form
            schema={formNewUserSchema(role, products)}
            uiSchema={formNewUserUiSchema()}
            widgets={widgets}
            formData={userData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, formNewUserSchema)
            }
            onChange={(e) => {
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={(values) => {
              const { name, email, mobileNumber, roleId, password, userType } =
                values.formData;

              const temp = userType.map((data) => {
                return data.id;
              });
              createUsers({
                name,
                email,
                mobileNumber: mobileNumber.toString(),
                roleId,
                password,
                productIds: temp,
              })
                .then((res) => {
                  console.log(res);
                  navigate(clickPaths.USENAVIGATEMYUSER);
                  dispatch(
                    snackBarAction({
                      color: "success",
                      open: true,
                      message: snackBarMessages.USER_CREATION_SUCCESS,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                  dispatch(
                    snackBarAction({
                      color: "error",
                      open: true,
                      message: snackBarMessages.USER_CREATION_FAILED,
                    })
                  );
                });
            }}
          >
            <div className="btnContainer">
              <Button
                variant="outlined"
                className="btn"
                onClick={() => navigate(clickPaths.USENAVIGATEMYUSER)}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                SUBMIT
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  User created Successfully
                </Alert>
              </Snackbar>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
