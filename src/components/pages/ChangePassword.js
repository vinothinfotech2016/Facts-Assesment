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
import { FormTopbar } from "../shared/FormTopbar";
import { clickPaths } from "../navigation/routePaths";
import { useNavigate } from "react-router";
import { CANCEL, UPDATE } from "../constants/ButtonConstants";

export const ChangePassword = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Box>
        <FormTopbar
          label="Change Password"
          listPath={clickPaths.USENAVIGATEPROFILE}
        />
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
            onClick={() => navigate(clickPaths.USENAVIGATEPROFILE)}
          >
            <div className="btnContainer">
              <Button
                variant="outlined"
                className="btn"
                onClick={() => navigate(clickPaths.USENAVIGATEPROFILE)}
              >
                {CANCEL}
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                {UPDATE}
              </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
