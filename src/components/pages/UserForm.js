import Form from "@rjsf/core";
import { widgets } from "../../widgets/widgets";
import { Box, Button, responsiveFontSizes, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { customErrorMsg } from "../../template/customErrorMsg";
import { CustomFieldTemplate } from "../../template/fieldTemplate";
import { objectFieldTemplate } from "../../template/objectTemplate";
import React, { useEffect} from "react";
import { formNewUserSchema, formNewUserUiSchema } from "../schema/newuser";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { useLocation, useNavigate } from "react-router";
import { createUsers, getProductById, getRole,  updateUser } from "../api/api";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../redux/actions";
import { snackBarMessages } from "../constants/SnackBarConstants";
import { ADD, CANCEL, UPDATE } from "../constants/ButtonConstants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserForm = (props) => {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState({});
  const [liveValidator, setLiveValidator] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const location = useLocation()
  const editData = location.state
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const mobileRegex = /^[0-9]{10}$/

  useEffect(() => {
    getRole()
      .then((res) => {
        setRole(
          res.data.map((item) => ({
            id: item.id,
            name: item.role,
          }))
        );
      })
      .catch((res) => console.log(responsiveFontSizes));

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.data.id;

    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    if(editData){
    const {
          name,
          email,
          mobileNumber,
          roleId,
          products
        } = editData
        setUserData({
          name,
          email,
          mobileNumber:parseInt(mobileNumber),
          roleId,
          productIds:products
        })
      }
  },[editData])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const add = (values) =>{
          const { name, email, mobileNumber, roleId, password, productIds } =
                values.formData;
              createUsers({
                name,
                email,
                mobileNumber: mobileNumber.toString(),
                roleId,
                password,
                productIds: productIds.map(product =>{
                  return product?.id
                }),
              })
                .then((res) => {
                  console.log(res);
                  navigate(clickPaths.USENAVIGATEMYUSER);
                  dispatch(
                    snackBarAction({
                      color: "success",
                      open: true,
                      message: snackBarMessages.USER_CREATION_SUCCESS,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                  dispatch(
                    snackBarAction({
                      color: "error",
                      open: true,
                      message: snackBarMessages.USER_CREATION_FAILED,
                    })
                  );
                });
  }


  const update = (values) =>{
       const { name, email, mobileNumber, roleId, password, productIds } =
                values.formData;
              updateUser(editData?.id,{
                name,
                email,
                mobileNumber: mobileNumber.toString(),
                roleId,
                password,
                productIds:productIds.map(product =>{
                  return product?.id
                }),
              })
                .then((res) => {
                  console.log(res);
                  navigate(clickPaths.USENAVIGATEMYUSER);
                  dispatch(
                    snackBarAction({
                      color: "success",
                      open: true,
                      message: snackBarMessages.USER_CREATION_SUCCESS,
                    })
                  );
                })
                .catch((error) => {
                  console.log(error);
                  dispatch(
                    snackBarAction({
                      color: "error",
                      open: true,
                      message: snackBarMessages.USER_CREATION_FAILED,
                    })
                  );
               });
              }


  return (
    <>
      <Box>
        <FormTopbar label="New User" listPath={clickPaths.USENAVIGATEMYUSER} />
        <Box className="container">
          <Form
            schema={formNewUserSchema(role, products,editData)}
            uiSchema={formNewUserUiSchema()}
            widgets={widgets}
            formData={userData}
            showErrorList={false}
            liveValidate={liveValidator}
            noHtml5Validate
            ObjectFieldTemplate={objectFieldTemplate}
            FieldTemplate={CustomFieldTemplate}
            transformErrors={(errors) =>
              customErrorMsg(errors, formNewUserSchema())
            }
            onChange={(e) => {
              setUserData({
                ...e.formData,
              });
            }}
            onSubmit={(values) => {
              if(!values?.formData?.email.match(emailRegex)){
                dispatch(snackBarAction({
                  open:true,
                  color:"error",
                  message:snackBarMessages.INVALID_EMAIL
                }))
                return
              }
              if(!values?.formData?.mobileNumber.toString().match(mobileRegex)){
                dispatch(snackBarAction({
                  open:true,
                  color:"error",
                  message:snackBarMessages.INVALID_MOBILE_NUMBER
                }))
                return
              }
            editData ? update(values): add(values)
            }}
          >
            <div className="btnContainer">
              <Button
                variant="outlined"
                className="btn"
                onClick={() => navigate(clickPaths.USENAVIGATEMYUSER)}
              >
             {CANCEL}
              </Button>
              <Button
                type="submit"
                variant="outlined"
                className="btn"
                onClick={() => setLiveValidator(true)}
              >
                {editData ? UPDATE : ADD}
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
              >
                <Alert severity="success" sx={{ width: "100%" }}>
                  User created Successfully
                </Alert>
              </Snackbar>
            </div>
          </Form>
        </Box>
      </Box>
    </>
  );
};
