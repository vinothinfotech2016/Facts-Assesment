import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NavBar } from "../shared/NavBar";
import React, { useEffect, useState } from "react";
import {
  getMenusByProductId,
  getProductById,
  getScreenById,
  getScreenByMenu,
} from "../api/api";
import Stepper from "../shared/Stepper";
import ImageMapper from "react-image-mapper";
import { useLocation, useNavigate } from "react-router";
import {  mapPaths } from "../navigation/routePaths";
import StyledTopBar from "../shared/StyledTopBar";

function DeveloperMenu(props) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [menus, setMenus] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [screen, setScreen] = useState("");
  const [imageSize, setImageSize] = useState({ width: 1100, height: 700 });
  const [imageUrl, setimageUrl] = useState("");
  const [areas, setAreas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [imageMap, setImageMap] = useState([]);

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

    useEffect(() => {
    selectedProduct &&
      getMenusByProductId(selectedProduct)
        .then((res) => {
          setMenus(res.data);
          getScreenByMenu(res?.data[0]?.id)
            .then((res) => {
              setScreen(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
  }, [selectedProduct]);

  useEffect(() => {
    getScreenById(location?.state?.id).then((res) => {
      setScreen(res.data);
      setimageUrl(res?.data?.screenImageUrl);
      setAreas(JSON.parse(res?.data?.actionItems));
    });
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setImageSize({ width: 1100, height: 700 });
    };
  }, [location.state]);

  useEffect(() => {
    screen && setimageUrl(screen?.screenImageUrl);
    screen?.actionItems && setAreas(JSON.parse(screen?.actionItems));
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setImageSize({ width: 1100, height: 700 });
    };
  }, [screen]);


  const fetchClickedScale = (area) => {
    setimageUrl("");
    setAreas([]);
    navigate(mapPaths.DEV_MENU, {
      state: { id: area?.data?.id },
    });
  };

  useEffect(() => {
    const maps = areas?.map((area, index) => ({
      _id: index,
      shape: "rect",
      coords: [
        imageSize.width * (area.x / 100),
        imageSize.height * (area.y / 100),
        imageSize.width * ((area.x + area.width) / 100),
        imageSize.height * ((area.y + area.height) / 100),
      ],
      preFillColor: "rgba(0, 0, 0, 0.5)",
      ...area,
    }));
    setImageMap(maps);
  }, [areas.length,imageMap.length]);

  return (
    <>
      <Box>
        <NavBar user={props?.user} navigate={props?.navigate} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <>
              <Grid container>
                <Grid item xs={2}>
               {isClicked &&   <Stepper stepperVal={isClicked && menus} />}
                </Grid>
                {isClicked ? (
                  <Grid item xs={10}>
                    <StyledTopBar
                        label="Prouducts"
                        onClick={()=>{
                          setIsClicked(false)
                        }}
                     />
                    <Box
                      sx={{
                        marginTop: "130px",
                      }}
                    >
                      <div style={{ padding: "20px" }}>
                        {imageSize.width > 0 && (
                          <ImageMapper
                            src={imageUrl}
                            onClick={fetchClickedScale}
                            map={{
                              name: "my-map",
                              areas: imageMap,
                            }}
                            height={700}
                            width={1100}
                          />
                        )}
                      </div>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={isClicked ? 10 : 12} sx={{
                    padding:"20px"
                  }} >
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          marginTop: "4rem",
                          paddingY: "20px",
                        }}
                      >
                        <Typography variant={"h4"}>Products</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={3}
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            {products.map((product) => {
                              return (
                                <Grid item xs={4}>
                                  <Card
                                    sx={{
                                      maxWidth: 345,
                                      border: "1px solid #00000050",
                                    }}
                                    onClick={() => {
                                      setSelectedProduct(product.id);
                                      setIsClicked(true);
                                    }}
                                  >
                                    <CardActionArea>
                                      <CardMedia
                                        component="img"
                                        height="140"
                                        image={product?.centerLogoUrl}
                                        alt={product?.name}
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
                                          {product?.name}
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default DeveloperMenu;
