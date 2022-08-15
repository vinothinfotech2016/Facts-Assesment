import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import {
  changePasswordSchema,
  changePasswordUiSchema,
} from "../schema/ChangePassword";
import { paths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";

export const ChangePassword = (props) => {
  const [password, setPassword] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Box>
        <FormTopbar label="Change Password" listPath={paths.PROFILE} />
        <Box className="container">
          <Form
            schema={changePasswordSchema}
            uiSchema={changePasswordUiSchema()}
            widgets={widgets}
            formData={password}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, changePasswordSchema)
            }
            onChange={(e) => {
              console.log(e.formData);
              setPassword({
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
                UPDATE
              </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
