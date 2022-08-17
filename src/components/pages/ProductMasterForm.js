import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import {
  formNewProductMasterSchema,
  formNewProductMasterUiSchema,
} from "../schema/newProductMaster";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { useNavigate } from "react-router";

const ProductMasterForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  return (
    <Box>
      <FormTopbar label="New Product" listPath={clickPaths.USENAVIGATEHOME} />
      <Box className="container">
        <Form
          schema={formNewProductMasterSchema}
          uiSchema={formNewProductMasterUiSchema()}
          widgets={widgets}
          formData={userData}
          showErrorList={false}
          liveValidate={liveValidator}
          noHtml5Validate
          ObjectFieldTemplate={objectFieldTemplate}
          FieldTemplate={CustomFieldTemplate}
          transformErrors={(errors) =>
            customErrorMsg(errors, formNewProductMasterSchema)
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
            <Button
              variant="outlined"
              className="btn"
              onClick={() => navigate(clickPaths.USENAVIGATEHOME)}
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
  );
};

export default ProductMasterForm;
