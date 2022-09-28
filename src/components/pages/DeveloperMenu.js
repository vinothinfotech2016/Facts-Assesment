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
import { getMenusByProductId, getProductById } from "../api/api";
import { CustomStepper } from "../shared";

function DeveloperMenu(props) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [menus, setMenus] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const data = [{ name: "some" }, { name: "thing" }];

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
        })
        .catch((error) => {
          console.log(error);
        });
  }, [selectedProduct]);

  return (
    <>
      <Box>
        <NavBar user={props?.user} navigate={props?.navigate} />
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <>
              <Grid container>
                <Grid item xs={2}>
                  <CustomStepper stepperVal={menus} />
                </Grid>
                {isClicked ? (
                  <Box>somthing</Box>
                ) : (
                  <Grid item xs={10}>
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
