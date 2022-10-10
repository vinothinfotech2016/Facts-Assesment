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
import { useLocation, useNavigate } from "react-router";
import {
  createMenu,
  getProductById,
  updateMenu,
} from "../api/api";
import { snackBarAction } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { snackBarMessages } from "../constants/SnackBarConstants";
import { CANCEL, SUBMIT, UPDATE } from "../constants/ButtonConstants";

export const NewMenu = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const LocalData = JSON.parse(localStorage.getItem("user"));
  const userId = LocalData?.data?.id;
  const location = useLocation()
  const editData = location?.state

  const handleChange = (e) => {
    setUserData({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
       !editData && setUserData({...userData,productId:res?.data[0]?.id})
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = (value) => {
    updateMenu(value, editData?.id)
      .then((res) => {
        navigate(clickPaths.USENAVIGATEMENUMASTER);
        dispatch(
          snackBarAction({
            color: "success",
            message: snackBarMessages.MENU_UPDATE_SUCCESS,
            open: true,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            color: "error",
            message: error?.response?.data?.error || snackBarMessages.MENU_UPDATE_FAILED,
            open: true,
          })
        );
      });
  };

  const add = (value) => {
    createMenu(value)
      .then((res) => {
        navigate(clickPaths.USENAVIGATEMENUMASTER);
        dispatch(
          snackBarAction({
            color: "success",
            message: snackBarMessages.MENU_CREATION_SUCCESS,
            open: true,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            color: "error",
            message: error?.response?.data?.error || snackBarMessages.MENU_CREATION_FAILED,
            open: true,
          })
        );
      });
  };

  useEffect(()=>{
    editData &&
    setUserData({...editData,subMenus:JSON.parse(editData?.subMenus),
          hasSubMenu: editData.hasSubMenu === 1 ? "1" : "2",
          })
      console.log(editData);
  },[editData])

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
              disabled={Boolean(editData?.id) ||Boolean(!products?.length) }
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
            uiSchema={newMenuUiSchema(editData?.id)}
            widgets={widgets}
            formData={userData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) => customErrorMsg(errors, newMenuSchema)}
            onChange={(e) => {
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={(props) => {
              const {
                productId,
                orderNo,
                name,
                hasSubMenu,
                subMenus,
              } = props.formData;

            editData?.id
                ? update({
                    productId,
                    orderNo,
                    displayType:"Top Navigation",
                    name,
                    hasSubMenu: hasSubMenu === "1" ? true : false,
                    subMenus,
                  })
                : add({
                    productId,
                    orderNo,
                    displayType:"Top Navigation",
                    name,
                    hasSubMenu: hasSubMenu === "1" ? true : false,
                    subMenus,
                  });
            }}
          >
            <div className="btnContainer">
              <Button
                variant="outlined"
                className="btn"
                onClick={() => navigate(clickPaths.USENAVIGATEMENUMASTER)}
              >
               {CANCEL}
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                {editData ? UPDATE : SUBMIT}
              </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
