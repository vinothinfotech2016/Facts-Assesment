import { Box,  Card, CardActionArea, CardContent,  CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getProductById, getScreensByProductId } from '../api/api';
import { clickPaths } from '../navigation/routePaths';
import { CustomSelectField } from '../shared';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { snackBarAction } from '../../redux/actions';
import { snackBarMessages } from '../constants/SnackBarConstants';


const useStyles = makeStyles({
  errorMsgContainer:{
        width:"100%",
       length:"100%",
       display:"flex",
       alignItems:"center",
       justifyContent:"center",
       marginTop:"40px"
  },
  button:{
    borderRight:"1px solid #00000050 !important",
    borderRadius:"0 !important",
    padding:"10px 47px !important"
  }
});


function ScreenFlowPage() {
const classes = useStyles()
const [screens , setScreens] = React.useState([])
const [products, setProducts] = React.useState([])
const [value, setValue] = React.useState("")
const navigate = useNavigate()
const dispatch = useDispatch()


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
                  <Grid item xs={4} key={index} >
                    <Card
                      sx={{ maxWidth: 345, border: "1px solid #00000050" }}
                    >
                       <Box sx={{
                                width:"100%",
                              }}  >
                              <Box
                              sx={{
                                width:"100%",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-evenly",
                                borderBottom:"1px solid #00000050"
                              }}
                              >
                                <IconButton className={classes.button}  onClick={() =>{
                                      if(screen?.actionItems === null){
                                        dispatch(snackBarAction({
                                          open:"true",
                                          color:"error",
                                          message:snackBarMessages.SCREENFLOW_DOES_NOT_EXIST
                                        }))
                                        return
                                      }
                                      navigateToCheckFlow(screen.id)}        
                                }>
                                  <VisibilityIcon/>
                                </IconButton>
                                 <IconButton className={classes.button}  onClick={() =>
                                  navigateToPage(
                                    screen?.id,
                                    clickPaths.USENAVIGATEPREVIEWPAGE
                                  )
                                } >
                                <EditIcon />
                               </IconButton> 
                               <IconButton className={classes.button}>
                                  <DeleteIcon />
                                </IconButton>
                                </Box>
                      </Box>
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
                    </Card>
                  </Grid>
                );
              })}
            </Grid>   
   </>
  )
}

export default ScreenFlowPage