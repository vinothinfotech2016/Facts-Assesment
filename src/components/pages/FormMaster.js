import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import CustomMultipleImageUpload from "../shared/CustomMultipleImageUpload";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { CustomSelectField } from "../shared/CustomSelectField";
import {
  createScreen,
  getProductById,
  getScreensByProductId,
} from "../api/api";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { snackBarAction } from "../../redux/actions";
import { snackBarMessages } from "../constants/SnackBarConstants";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";

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
});

export const FormMaster = (props) => {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState({});
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [screens, setScreens] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formats = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/img",
    "image/svg",
  ];

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

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  const storingImage = (event) => {
    if (!formats.includes(event?.target?.files[0]?.type)) {
      dispatch(
        snackBarAction({
          message: snackBarMessages.VALID_FILE,
          open: true,
          color: "error",
        })
      );
      return;
    }
    let img = new Image();
    img.src = window.URL.createObjectURL(event.target.files[0]);
    img.onload = () => {
      if (img.width < 500 && img.height < 500) {
        dispatch(
          snackBarAction({
            message: snackBarMessages.VALID_FILE,
            open: true,
            color: "error",
          })
        );
      } else {
        let reader = new FileReader();
        reader.onload = () => {
          setFiles((prevState) => [...prevState, reader.result]);
          setIsUploaded(true);
        };
        reader.readAsDataURL(event.target.files[0]);
        setImage(event.target.files[0]);
      }
    };
  };

  const imageRemover = (index) => {
    const temp = [...files];
    temp.splice(index, 1);
    setFiles(temp);
    setIsUploaded(false);
  };

  const onSubmit = () => {
    if (text === "") {
      dispatch(
        snackBarAction({
          message: snackBarMessages.TEXT_IS_REQUIRED,
          open: true,
          color: "error",
        })
      );
      return;
    }
    const formData = new FormData();

    formData.append("screenName", text);
    formData.append("productId", value);
    formData.append("screenImageUrl", image);

    createScreen(formData)
      .then((res) => {
        setFiles([]);
        setImage({});
        setText("");
        setIsUploaded(false);
        dispatch(
          snackBarAction({
            message: snackBarMessages.SCREEN_CREATION_SUCCESS,
            open: true,
            color: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          snackBarAction({
            message: snackBarMessages.SCREEN_CREATION_FAILED,
            open: true,
            color: "error",
          })
        );
      });
  };

  useEffect(() => {
    value &&
      getScreensByProductId(value)
        .then((res) => {
          setScreens(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [value, isUploaded]);

  const navigateToPage = (id, path) => {
    navigate({
      pathname: path,
      search: `?${createSearchParams({
        editId: id,
      })}`,
    });
  };

  const navigateToCheckFlow = (id) => {
    navigate(clickPaths.USENAVIGATECHECKPAGE, {
      state: { id },
    });
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
        {/* <CustomMultipleImageUpload label="upload image" /> */}
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
              {isUploaded ? (
                files?.map((file, index) => {
                  return (
                    <>
                      <Grid
                        item
                        xs={3}
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          src={file}
                          alt={index}
                          height={"100px"}
                          width={"100%"}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Box>
                          <TextField
                            size="small"
                            placeholder="Enter Screen name"
                            fullWidth
                            value={text}
                            onChange={(e) => textChangeHandler(e)}
                            sx={{
                              marginY: "10px",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Button
                              color="success"
                              variant="contained"
                              onClick={() => onSubmit()}
                            >
                              submit
                            </Button>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => imageRemover(index)}
                            >
                              cancel
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </>
                  );
                })
              ) : (
                <Grid item xs={3}>
                  <CustomMultipleImageUpload
                    label={"upload image"}
                    onChange={storingImage}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowSpacing={3} columnSpacing={3}>
              {screens.length === 0 ?  
              <>
              <Box
              sx={{
                width:"100%",
                length:"100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
              }}
              >
                <Typography> There is no screens for this Product </Typography>
              </Box>
              </>
              : 
              screens.map((screen, index) => {
                return (
                  <Grid item xs={4}>
                    <Card
                      sx={{ maxWidth: 345, border: "1px solid #00000050" }}
                      className={classes.card}
                      onMouseOver={() => setIsHovered(index)}
                      onMouseLeave={() => setIsHovered("")}
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
                          <Typography gutterBottom variant="h5" component="div">
                            {screen?.screenName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <Box
                        sx={{
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            zIndex: 50,
                            bottom: "90px",
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            display: isHovered === index ? "flex" : "none",
                            "&:hover": {
                              backgroundColor: "#00000090",
                            },
                          }}
                        >
                          {screen?.actionItems === null ||
                          screen?.actionItems === [] ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                navigateToPage(
                                  screen?.id,
                                  clickPaths.USENAVIGATEPREVIEWPAGE
                                )
                              }
                            >
                              define flow
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                onClick={() => navigateToCheckFlow(screen.id)}
                              >
                                check flow
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  navigateToPage(
                                    screen?.id,
                                    clickPaths.USENAVIGATEPREVIEWPAGE
                                  )
                                }
                              >
                                edit flow
                              </Button>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </ListContainer>
    </>
  );
};
