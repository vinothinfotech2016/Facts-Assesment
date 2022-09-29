import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  getMenusByProductId,
  getProductById,
  getScreensByProductId,
} from "../api/api";
import { clickPaths } from "../navigation/routePaths";
import { CustomSelectField } from "../shared";
import CustomMultipleImageUpload from "../shared/CustomMultipleImageUpload";
import { ListTopbar } from "../shared/ListTopbar";
import { ListContainer } from "../styled";

function DeveloperCreateFlow() {
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isScreenFlow, setIsScreenFlow] = React.useState(false);
  const [screens, setScreens] = React.useState([]);
  const [menus, setMenus] = React.useState([]);
  const [finalValue, setFinalValue] = React.useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("user"));
    const userId = localData.data.id;

    getProductById(userId)
      .then((res) => {
        setProducts(res.data);
        setValue(res?.data[0]?.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getScreensByProductId(value)
      .then((res) => {
        setScreens(
          res?.data?.map((value) => {
            return {
              ...value,
              name: value.screenName,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    getMenusByProductId(value)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [value]);

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={false}
          download={false}
          filter={false}
          label={"FORM MASTER"}
          newFormPath={clickPaths.USENAVIGATEFORMMASTERFORM}
        />
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12}>
            <CustomSelectField
              inputValues={products}
              label={"Select Product"}
              value={value}
              onChange={changeHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              <Grid item xs={3}>
                <CustomMultipleImageUpload
                  label={"upload image"}
                  //   onChange={storingImage}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant={isScreenFlow ? "outlined" : "contained"}
                  onClick={() => setIsScreenFlow(!isScreenFlow)}
                  sx={{
                    width: "9rem",
                  }}
                >
                  {isScreenFlow ? "Screen Flow" : "Menu Flow"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              {isScreenFlow ? (
                screens.map((screen, index) => {
                  return (
                    <Grid item xs={4}>
                      <Card
                        sx={{ maxWidth: 345, border: "1px solid #00000050" }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={screen?.screenImageUrl}
                            alt={screen?.screenName}
                          />
                          <CardContent
                            sx={{
                              borderTop: "1px solid #00000050",
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {screen?.screenName}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <Box
                          sx={{
                            position: "relative",
                          }}
                        ></Box>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Grid container rowSpacing={3} columnSpacing={3}>
                    {menus.map((menu) => {
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
                                {menu?.name}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <CustomSelectField
                              inputValues={screens}
                              label={"Select Screen"}
                              //   value={}
                              //   onChange={changeHandler}
                            />
                          </Grid>
                        </>
                      );
                    })}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </ListContainer>
    </>
  );
}

export default DeveloperCreateFlow;
