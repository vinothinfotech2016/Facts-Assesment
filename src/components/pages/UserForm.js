import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { formNewUserSchema, formNewUserUiSchema } from "../schema/newuser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { paths } from "../navigation/routePaths";

export const UserForm = (props) => {
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Box>
        <Button
          className="newuser"
          onClick={() => props.navigate(`${paths.MYUSER}`)}
        >
          <Box className="backicon">
            <ArrowBackIcon />
          </Box>
          <h3>NEW USER</h3>
        </Button>
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
            onSubmit={(props) => {
              console.log(props.formData);
              console.log(customErrorMsg);
            }}
          >
            <div className="btnContainer">
              <Button variant="outlined" className="btn">
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
