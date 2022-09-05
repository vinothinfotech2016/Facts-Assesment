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
import { createCustomer, getRole } from "../api/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState([]);

  useEffect(() => {
    getRole()
      .then((res) => {
        console.log(res, "RESPONSE");
        setRole(
          res.data.map((item) => ({
            id: item.id,
            name: item.role,
          }))
        );
        // setRole(() => ({
        //   res.data.map((item) => ({
        //     id: item.id,
        //     name: item.role,
        //   })),
        // }));

        // setRole(res.data);
      })
      .catch((res) => console.log(responsiveFontSizes));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const userCreation = (userdetail) => {
    createCustomer(userdetail)
      .then(() => {
        // navigate(clickPaths.USENAVIGATEMYUSER);
      })
      .catch((res) => {
        setOpen(true);
        console.log(res);
      });
  };

  return (
    <>
      <Box>
        <FormTopbar label="New User" listPath={clickPaths.USENAVIGATEMYUSER} />
        <Box className="container">
          <Form
            schema={formNewUserSchema(role)}
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
              console.log(e.formData);
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={() => {
              let userdetail = {
                ...userData,
                mobileNumber: JSON.stringify(userData.mobileNumber),
              };
              console.log(userdetail, "userdetail");
              userCreation(userdetail);

              // console.log(props.formData);
              // console.log(customErrorMsg);
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
                onClick={() => setLiveValidator(true) }
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
