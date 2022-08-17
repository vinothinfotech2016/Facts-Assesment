import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import {
  customerFormSchema,
  customerFormUiSchema,
} from "../schema/CustomerForm";
import { FormTopbar } from "../shared/FormTopbar";
import { clickPaths } from "../navigation/routePaths";

export const CustomerForm = (props) => {
  const [formData, setFormData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <>
      <Box>
        <FormTopbar
          label="New Customer"
          listPath={clickPaths.USENAVIGATECUSTOMER}
        />
        <Box className="container">
          <Form
            schema={customerFormSchema}
            uiSchema={customerFormUiSchema()}
            widgets={widgets}
            formData={formData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, customerFormSchema)
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
      </Box>
    </>
  );
};
