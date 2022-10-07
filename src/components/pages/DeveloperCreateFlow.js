import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { snackBarAction } from "../../redux/actions";
import {
  createMenuFlow,
  createScreen,
  getMenusByProductId,
  getProductById,
  getScreensByProductId,
} from "../api/api";
import { snackBarMessages } from "../constants/SnackBarConstants";
import { clickPaths } from "../navigation/routePaths";
import { CustomSelectField } from "../shared";
import CustomMultipleImageUpload from "../shared/CustomMultipleImageUpload";
import { ListTopbar } from "../shared/ListTopbar";
import { ListContainer } from "../styled";


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
  errorMsgContainer:{
        width:"100%",
       length:"100%",
       display:"flex",
       alignItems:"center",
       justifyContent:"center",
       marginTop:"40px"
  }
});


function DeveloperCreateFlow() {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isHovered, setIsHovered] = React.useState("");
  const [screens, setScreens] = React.useState([]);
  const [menus, setMenus] = React.useState([]);
  const [finalValue, setFinalValue] = React.useState([]);
  const dispatch = useDispatch()
  const [toggleValue, setToggleValue] = React.useState("uploadImage")
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState({});
  const navigate = useNavigate()
  const location = useLocation()
  const formats = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/img",
    "image/svg",
  ];

useEffect(()=>{
location?.state?.toggleValue ?
setToggleValue(location?.state?.toggleValue): setToggleValue("uploadImage")
},[location?.state?.toggleValue])


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
    value &&
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

    value &&
      getMenusByProductId(value)
        .then((res) => {
          setMenus(res.data);
          setFinalValue(
            res?.data?.map((menu) => {
              return {
                menuId: menu.id,
              };
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
  }, [value]);

  useEffect(() => {
    setFinalValue(
      finalValue?.map((value) => {
        return {
          ...value,
          screenId: screens[0]?.id,
        };
      })
    );
  }, [screens]);

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const onChange = (event, index) => {

    const temp = [...finalValue]
    temp[index] = {
      ...finalValue[index], screenId: event.target.value
    }
    setFinalValue(temp)
  }

  const onSubmit = () => {
    createMenuFlow(finalValue).then(() => {
      dispatch(snackBarAction({
        open: true,
        color: "success",
        message: snackBarMessages.MENU_FLOW_CREATION_SUCCESS
      }))
      setIsUploaded(true)
    }).catch((error) => {
      console.log(error);
      dispatch(snackBarAction({
        open: true,
        color: "error",
        message: snackBarMessages.MENU_FLOW_CREATION_FAILED
      }))
    })
  }

  const submitScreenFlow = () =>{
   
const formData = new FormData()

if(text !== ""){
formData.append("screenImageUrl",image)
formData.append("screenName",text)
formData.append("productId",value)

createScreen(formData).then(res =>{
  dispatch(snackBarAction({
    open:true,
    message:snackBarMessages.SCREEN_CREATION_SUCCESS,
    color:"success"
  }))
  imageRemover()
}).catch(error =>{
  dispatch(snackBarAction({
    open:true,
    message:snackBarMessages.SCREEN_CREATION_FAILED,
    color:"error"
  }))
})
}
  }

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

const titleCase = (word) =>{
const newString = word.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
   return newString
}

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
              {
                toggleValue === "uploadImage" ? (
                  (
                    <>
                      <Grid item xs={12} >

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
                                        onClick={() => submitScreenFlow()}
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
                              isViewMode={products.length === 0 ? true : false}
                            />
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container rowSpacing={3} columnSpacing={3}>
                          {screens.length === 0 ?  
                             <>
                             <Box
                             className={classes.errorMsgContainer}
                             >
                               <Typography variant="h4" > There is no screens for this Product </Typography>
                             </Box>
                             </>
                             : 
                          screens.map((screen) => {
                            // console.log(screen,"screen");
                            return (
                              <Grid item xs={4}>
                                <Card
                                  sx={{ maxWidth: 345, border: "1px solid #00000050" }}
                                className={classes.card} 
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
                                         {titleCase(screen?.screenName)}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </>
                  )
                ) : (
                  <Grid item xs={12}>
                    { toggleValue === "screenFlow" ? ( 
                    <Grid container rowSpacing={3} columnSpacing={3}>
              {screens.length === 0 ?  
              <>
              <Box
             className={classes.errorMsgContainer}
              >
                <Typography variant="h4" > There is no screens for this Product </Typography>
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
                            {titleCase(screen?.screenName)}
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
                    ) : (
 <Grid container rowSpacing={3} columnSpacing={3}>
                  {
                    menus.length === 0 ?  
              <>
              <Box
                className={classes.errorMsgContainer}
              >
                <Typography variant="h4" > There is no menus for this Product </Typography>
              </Box>
              </>
              : 
                  menus.map((menu, index) => {
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
            {menus.length !== 0 &&
                 <Grid item xs={12} sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: 'flex-end',
                  margin: '20px'
                }} >
                  <Button onClick={onSubmit} variant="contained" >submit</Button>
                </Grid>}
                </Grid>
                    )  }
                  </Grid>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </ListContainer>
    </>
  );
}

export default DeveloperCreateFlow;
