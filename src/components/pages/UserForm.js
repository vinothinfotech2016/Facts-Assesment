import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { formNewUserSchema, formNewUserUiSchema } from "../schema/newuser";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { useNavigate } from "react-router";
import { createUser } from "../api/api";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const userCreation = (userdetail) => {
    createUser(userdetail)
      .then(() => {
        setOpen(true);
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            User created Successfully
          </Alert>
        </Snackbar>;
        // navigate(clickPaths.USENAVIGATEMYUSER);
        // alert("User Created Successfully");
      })
      .catch((res) => console.log(res));
  };

  return (
    <>
      <Box>
        <FormTopbar label="New User" listPath={clickPaths.USENAVIGATEMYUSER} />
        <Box className="container">
          <Form
            schema={formNewUserSchema}
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
                onClick={() => setLiveValidator(true)}
              >
                SUBMIT
              </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
