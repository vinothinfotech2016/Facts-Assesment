import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
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
import { createCustomer } from "../api/api";
import { useNavigate } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomerForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const customerCreation = (customerdetail) => {
    createCustomer(customerdetail)
      .then(() => {
        navigate(clickPaths.USENAVIGATECUSTOMER);
      })
      .catch((res) => {
        setOpen(true);
        console.log(res);
      });
  };
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
              let customerdetail = {
                ...formData,
                mobileNumber: JSON.stringify(formData.mobileNumber),
                pincode: JSON.stringify(formData.pincode),
              };

              console.log(customerdetail, "customerdetail");
              customerCreation(customerdetail);
              // console.log(props.formData);
              // console.log(customErrorMsg);
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
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
              >
                <Alert severity="error" sx={{ width: "100%" }}>
                  Customer created Successfully
                </Alert>
              </Snackbar>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
