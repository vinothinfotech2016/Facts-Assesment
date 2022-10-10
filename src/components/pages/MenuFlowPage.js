import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../redux/actions";
import {
  createMenuFlow,
  getMenuFlowByProduct,
  getMenusByProductId,
  getProductById,
  getScreensByProductId,
} from "../api/api";
import { CustomSelectField } from "../shared";
import { snackBarMessages } from "../constants/SnackBarConstants";
import { SUBMIT } from "../constants/ButtonConstants";
import { ListTopbar } from "../shared/ListTopbar";
import { CustomReactTable } from "../shared/CustomReactTable";
import { ListContainer } from "../styled";
import { menuFlowLists } from "../constants/MenuList";

const useStyles = makeStyles({
  card: {
    "&:hover": {
      backgroundColor: "#00000080",
    },
  },
  CardMedia: {
    "&:hover": {
      backgroundColor: "#00000080",
    },
  },
  errorMsgContainer: {
    width: "100%",
    length: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40px",
  },
});

function MenuFlowPage() {
  const classes = useStyles();
  const [menus, setMenus] = React.useState([]);
  const [screens, setScreens] = React.useState([]);
  const [finalValue, setFinalValue] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [menuFlows, setMenuFlows] = React.useState([]);
  const [createFlow, setCreateFlow] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.data?.id;

    getProductById(userId).then((res) => {
      setProducts(res.data);
      setValue(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    value &&
      getMenuFlowByProduct(value).then((res) => {
        setMenus(res.data?.menus);
        setMenuFlows(res.data?.existingFlows);
        setFinalValue(
          res?.data?.menus?.map((menu) => {
            return {
              menuId: menu.id,
            };
          })
        );
      });
    getScreensByProductId(value).then((res) => {
      setScreens(
        res?.data?.map((screen) => {
          return { ...screen, name: screen?.screenName };
        })
      );
    });
  }, [value]);

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const onChange = (event, index) => {
    const temp = [...finalValue];
    temp[index] = {
      ...finalValue[index],
      screenId: event.target.value,
    };
    setFinalValue(temp);
  };

  const onSubmit = () => {
    createMenuFlow(finalValue)
      .then(() => {
        dispatch(
          snackBarAction({
            open: true,
            color: "success",
            message: snackBarMessages.MENU_FLOW_CREATION_SUCCESS,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            open: true,
            color: "error",
            message: snackBarMessages.MENU_FLOW_CREATION_FAILED,
          })
        );
      });
  };

  const returnScreenandMenu = (inputId, inputArr) => {
    let inputName = "";
    if (inputId) {
      inputName = inputArr.filter((menu) => menu.id === inputId);
    }

    return inputName[0]?.name || "";
  };

  const returnUpdatedFlowData = () => {
    let updatedMenuFlow = menuFlows.map((flow) => {
      return {
        ...flow,
        menuName: returnScreenandMenu(flow.menuId, menus).toUpperCase(),
        screenName: returnScreenandMenu(flow.screenId, screens),
      };
    });
    return updatedMenuFlow;
  };

  const MenuFlowList = () => {
    return (
      <ListContainer>
        <CustomReactTable
          columnData={menuFlowLists()}
          rawData={returnUpdatedFlowData()}
          disableRowSelection={true}
          disablePagination={true}
          // onChangePageSize={onChangePageSize}
          // count={count}
          // pageSize={pageSize}
          // currentPage={currentPage}
          // onPageNumberChange={onPageNumberChange}
          columnSize={false}
          style={{
            th: {
              color: "#0000008A",
              font: "normal normal bold 17px Roboto !important",
              height: "64px !important",
              backgroundColor: "#D2E1FC",
            },
            body: {
              color: "#000000DE",
              font: "normal normal normal 14px Roboto !important",
            },
          }}
        />
      </ListContainer>
    );
  };
  return (
    <>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={3}
        sx={{
          padding: "40px",
        }}
      >
        <Grid item xs={12}>
          <ListTopbar
            searchField={false}
            newForm={true}
            download={false}
            filter={false}
            buttonLabel={createFlow ? "Create Flow" : "Flow List"}
            label={"Menu Flow"}
            onClickNew={() => setCreateFlow(!createFlow)}
            // newFormPath={clickPaths.USENAVIGATECUSTOMERFORM}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelectField
            inputValues={products}
            label={"Select Product"}
            value={value}
            onChange={changeHandler}
          />
        </Grid>
        {createFlow ? (
          <Grid item xs={12}>
            {MenuFlowList()}
          </Grid>
        ) : menus?.length === 0 ? (
          <>
            <Box className={classes.errorMsgContainer}>
              <Typography variant="h4">
                {" "}
                There is no menus for this Product{" "}
              </Typography>
            </Box>
          </>
        ) : (
          menus?.map((menu, index) => {
            return (
              <>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "transparent",
                      height: "100%",
                      color: "#00000099",
                      borderColor: "#00000099",
                      width: "100%",
                    }}
                  >
                    {menu?.name}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <CustomSelectField
                    inputValues={screens}
                    label={"Select Screen"}
                    value={finalValue[index]?.screenId}
                    onChange={(e) => onChange(e, index)}
                  />
                </Grid>
              </>
<<<<<<< HEAD
            );
          })
        )}
        {menus?.length !== 0 && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              margin: "20px",
            }}
          >
            <Button onClick={onSubmit} variant="contained">
              {SUBMIT}
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
=======
              : 
                  menus?.map((menu, index) => {
                    return (
                      <>
                        <Grid
                          key={index}
                          item
                          xs={6}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              border: "2px solid #00000080",
                              backgroundColor: "#00000020",
                              borderRadius: "8px",
                              height: "100%",
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {titleCase(menu?.name)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <CustomSelectField
                            inputValues={screens}
                            label={"Select Screen"}
                            value={finalValue[index]?.screenId}
                            onChange={(e) => onChange(e, index)}
                          />
                        </Grid>
                      </>
                    );
                  })}
            {menus?.length !== 0 &&
                 <Grid item xs={12} sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'flex-end',
                  margin: '20px'
                }} >
                  <Button onClick={onSubmit} variant="contained" >{SUBMIT}</Button>
                </Grid>}
            </Grid> 
   </>
  )
>>>>>>> 1c085340de6bc1de2ef08bdb9774695302dc1f94
}

export default MenuFlowPage;
