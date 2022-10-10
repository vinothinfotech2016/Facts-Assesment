import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getProductById, getScreensByProductId } from '../api/api';
import { CHECKFLOW, DEFINEFLOW, EDITFLOW } from '../constants/ButtonConstants';
import { clickPaths } from '../navigation/routePaths';
import { CustomSelectField } from '../shared';



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


function ScreenFlowPage() {
const classes = useStyles()
const [screens , setScreens] = React.useState([])
const [isHovered , setIsHovered] = React.useState('')
const [products, setProducts] = React.useState([])
const [value, setValue] = React.useState("")
const navigate = useNavigate()


useEffect(() => {
const userData = JSON.parse(localStorage.getItem("user"))
const userId = userData?.data?.id
 
getProductById(userId).then(res =>{
    setProducts(res.data)
    setValue(res.data[0].id)
})
}, [])

useEffect(()=>{
    value &&
    getScreensByProductId(value).then(res =>{
        setScreens(res.data)
    })
},[value])


const titleCase = (word) =>{
const newString = word.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
   return newString
}


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

    const changeHandler = (event) => {
    setValue(event.target.value);
  };



  return (
   <>
            <Grid container rowSpacing={3} columnSpacing={3} sx={{
                padding:"40px"
            }} >
                <Grid item xs={12}>
                    <Typography variant='h4'>Screen Flow</Typography>
                </Grid>
                <Grid item xs={12}>
                <CustomSelectField
                    inputValues={products}
                    label={"Select Product"}
                    value={value}
                    onChange={changeHandler}
                    />
                </Grid>
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
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center"
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
                              {DEFINEFLOW}
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                onClick={() => navigateToCheckFlow(screen.id)}
                              >
                               {CHECKFLOW}
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
                                {EDITFLOW}
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
   </>
  )
}

export default ScreenFlowPage