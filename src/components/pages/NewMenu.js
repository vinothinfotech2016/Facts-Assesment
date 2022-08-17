import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React from "react";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { newMenuSchema, newMenuUiSchema } from "../schema/newmenu";
import { DividerLine } from "../shared";
import { useNavigate } from "react-router";

export const NewMenu = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);

  const handleChange = (e) => {
    setUserData({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box>
        <FormTopbar
          label="New Menu"
          listPath={clickPaths.USENAVIGATEMENUMASTER}
        />
        <Box className="container">
          <FormControl fullWidth style={{ marginBottom: "15px" }}>
            <InputLabel>Select Product</InputLabel>
            <Select
              label="Select Product"
              name="productName"
              onChange={handleChange}
              value={userData.productName || ""}
            >
              <MenuItem value={"1"}>Product 1</MenuItem>
              <MenuItem value={"2"}>Product 2</MenuItem>
              <MenuItem value={"3"}>Product 3</MenuItem>
            </Select>
          </FormControl>
          <DividerLine />
          <h3 style={{ color: "#4F4A98" }}>Menu Settings</h3>
          <Form
            schema={newMenuSchema}
            uiSchema={newMenuUiSchema()}
            widgets={widgets}
            formData={userData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) => customErrorMsg(errors, newMenuSchema)}
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
                onClick={() => navigate(clickPaths.USENAVIGATEMENUMASTER)}
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
