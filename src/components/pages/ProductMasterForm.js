import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button } from "@mui/material";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React, { useEffect } from "react";
import {
  formNewProductMasterSchema,
  formNewProductMasterUiSchema,
} from "../schema/newProductMaster";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { useLocation, useNavigate } from "react-router";
import { createProduct, getProductById, updateProduct } from "../api/api";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../redux/actions";
import { snackBarMessages } from "../constants/SnackBarConstants";

const ProductMasterForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const dispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    const id = data.data.id;

    getProductById(id).then((res) => {
      setProducts(res.data);
    });
  }, [editId]);

  useEffect(() => {
    editId &&
      products.forEach((product) => {
        if (product.id === editId) {
          const {
            name,
            description,
            leftLogoUrl,
            rightLogoUrl,
            centerLogoUrl,
            menuDesignUrl,
          } = product;

          setUserData({
            name,
            description,
            leftLogoUrl: [leftLogoUrl],
            rightLogoUrl: [rightLogoUrl],
            centerLogoUrl: [centerLogoUrl],
            menuDesignUrl: [menuDesignUrl],
          });
        }
      });
  }, [products]);

  const add = (formData) => {
    createProduct(formData)
      .then((res) => {
        console.log(res);
        navigate(clickPaths.USENAVIGATEHOME);
        dispatch(
          snackBarAction({
            color: "success",
            message: snackBarMessages.PRODUCT_CREATION_SUCCESS,
            open: true,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            color: "error",
            message: snackBarMessages.PRODUCT_CREATION_FAILED,
            open: true,
          })
        );
      });
  };

  const update = (formData) => {
    updateProduct(formData, editId)
      .then((res) => {
        console.log(res);
        navigate(clickPaths.USENAVIGATEHOME);
        dispatch(
          snackBarAction({
            color: "success",
            message: snackBarMessages.PRODUCT_UPDATE_SUCCESS,
            open: true,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            color: "error",
            message: snackBarMessages.PRODUCT_UPDATE_FAILED,
            open: true,
          })
        );
      });
  };

  return (
    <Box>
      <FormTopbar label="New Product" listPath={clickPaths.USENAVIGATEHOME} />
      <Box className="container">
        <Form
          schema={formNewProductMasterSchema}
          uiSchema={formNewProductMasterUiSchema(editId)}
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
            setUserData({
              ...e.formData,
            });
          }}
          onSubmit={(values) => {
            const {
              name,
              description,
              leftLogoUrl,
              rightLogoUrl,
              centerLogoUrl,
              menuDesignUrl,
            } = values.formData;
            const formData = new FormData();
            const data = JSON.parse(localStorage.getItem("user"));
            const id = data.data.id;

            formData.append("name", name);
            formData.append("description", description);
            formData.append("leftLogoUrl", leftLogoUrl[0]);
            formData.append("rightLogoUrl", rightLogoUrl[0]);
            formData.append("centerLogoUrl", centerLogoUrl[0]);
            formData.append("menuDesignUrl", menuDesignUrl[0]);
            formData.append("createdBy", id);

            editId ? update(formData) : add(formData);
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
              {editId ? "UPDATE" : "SUBMIT"}
            </Button>
          </div>
        </Form>
      </Box>
    </Box>
  );
};

export default ProductMasterForm;
