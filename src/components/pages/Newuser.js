import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, Stack } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { initValue } from "../constent";
import { CustomStepper } from "../shared";
import { NavBar } from "../shared/NavBar";
import { formNewUserSchema, formNewUserUiSchema } from "../schema/newuser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BasicForm = (props) => {
  const [formData, setFormData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Box>
        <NavBar user={props.user} navigate={props.navigate} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "20%" }}>
            <CustomStepper
              navigate={props.navigate}
              stepperVal={initValue.stepper}
            />
          </Box>
          <Stack style={{ paddingTop: 10 }}>
            <Box className="newuser">
              <Box className="backicon">
                <ArrowBackIcon />
              </Box>
              <h3>NEW USER</h3>
            </Box>
            <Box className="container">
              <Form
                schema={formNewUserSchema}
                uiSchema={formNewUserUiSchema()}
                widgets={widgets}
                formData={formData}
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
                  setFormData({
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
          </Stack>
        </Box>
      </Box>
    </>
  );
};
