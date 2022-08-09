import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, Stack } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { formNewUserSchema, formNewUserUiSchema } from "../constant/newuser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BasicForm = () => {
  const [formData, setFormData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Stack style={{ paddingTop: 70 }}>
        <Box className="container">
          <Box className="newuser">
            <Box className="backicon">
              <ArrowBackIcon />
            </Box>
            <h3>NEW USER</h3>
          </Box>

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
    </>
  );
};
