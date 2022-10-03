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
  getMenusByUserId,
  getProductById,
  updateMenu,
} from "../api/api";
import { snackBarAction } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { snackBarMessages } from "../constants/SnackBarConstants";

export const NewMenu = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const LocalData = JSON.parse(localStorage.getItem("user"));
  const userId = LocalData?.data?.id;
  const [menus, setMenu] = React.useState([]);

  const handleChange = (e) => {
    setUserData({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getMenusByUserId(userId)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editId]);

  useEffect(() => {
    menus.forEach((menu) => {
      if (menu.id === editId) {
        setUserData({
          ...menu,
          hasSubMenu: menu.hasSubMenu === 1 ? "1" : "2",
          subMenus: JSON.parse(menu?.subMenus),
        });
      }
    });
  }, [menus]);

  const update = (value) => {
    updateMenu(value, editId)
      .then((res) => {
        console.log(res);
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
            message: snackBarMessages.MENU_UPDATE_FAILED,
            open: true,
          })
        );
      });
  };

  const add = (value) => {
    createMenu(value)
      .then((res) => {
        console.log(res);
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
            message: snackBarMessages.MENU_CREATION_FAILED,
            open: true,
          })
        );
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
              name="productId"
              onChange={handleChange}
              value={userData.productId || ""}
              disabled={Boolean(editId)}
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
            uiSchema={newMenuUiSchema(editId)}
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
                displayType,
                name,
                hasSubMenu,
                subMenus,
              } = props.formData;

              editId
                ? update({
                    productId,
                    orderNo,
                    displayType,
                    name,
                    hasSubMenu: hasSubMenu === "1" ? true : false,
                    subMenus,
                  })
                : add({
                    productId,
                    orderNo,
                    displayType,
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
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                {editId ? "UPDATE" : "SUBMIT"}
              </Button>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
