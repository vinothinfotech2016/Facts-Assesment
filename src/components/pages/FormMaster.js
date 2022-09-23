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

export const FormMaster = (props) => {
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState({});
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [screens, setScreens] = React.useState([]);
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

  const navigateTopreviewPage = (id) => {
    navigate({
      pathname: clickPaths.USENAVIGATEPREVIEWPAGE,
      search: `?${createSearchParams({
        editId: id,
      })}`,
    });
  };

  // const handleEdit = (path) => {
  //   path &&
  //     navigate({
  //       pathname: path,
  //       search: `?${createSearchParams({
  //         editId: rowId,
  //       })}`,
  //     });
  // };

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
              {screens.map((screen) => {
                return (
                  <Grid
                    item
                    xs={4}
                    onClick={() => navigateTopreviewPage(screen?.id)}
                  >
                    <Card sx={{ maxWidth: 345 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={screen?.screenImageUrl}
                          alt={screen?.screenName}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {screen?.screenName}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
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
