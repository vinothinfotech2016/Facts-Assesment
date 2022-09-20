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
import React, { useEffect } from "react";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { newMenuSchema, newMenuUiSchema } from "../schema/newmenu";
import { DividerLine } from "../shared";
import { useNavigate } from "react-router";
import { createMenu, getProductById } from "../api/api";

export const NewMenu = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [products, setProducts] = React.useState([]);

  const handleChange = (e) => {
    console.log(userData);
    setUserData({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.data?.id;

    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              name="productId"
              onChange={handleChange}
              value={userData.productId || ""}
            >
              {products.map((product) => {
                return (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <DividerLine />
          <h3 className="subheading">Menu Settings</h3>
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
              // console.log(e.formData);
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={(props) => {
              const {
                productId,
                orderNo,
                displayType,
                name,
                hasSubMenu,
                subMenus,
              } = props.formData;

              createMenu({
                productId,
                orderNo,
                displayType,
                name,
                hasSubMenu,
                subMenus,
              })
                .then((res) => {
                  console.log(res);
                  navigate(clickPaths.USENAVIGATEMENUMASTER);
                })
                .catch((error) => {
                  console.log(error);
                });
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
