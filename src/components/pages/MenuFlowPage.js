import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { snackBarAction } from '../../redux/actions';
import { createMenuFlow, getMenusByProductId, getProductById, getScreensByProductId } from '../api/api';
import { CustomSelectField } from '../shared';
import { snackBarMessages } from '../constants/SnackBarConstants'
import { SUBMIT } from '../constants/ButtonConstants';



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


function MenuFlowPage() {
const classes = useStyles()
const [menus , setMenus] = React.useState([])
const [screens , setScreens] = React.useState([])
const [finalValue, setFinalValue] = React.useState([]);
const [products, setProducts] = React.useState([])
const [value, setValue] = React.useState("")
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
getMenusByProductId(value).then(res =>{
    setMenus(res.data)
    setFinalValue(
            res?.data?.map((menu) => {
              return {
                menuId: menu.id,
              };
            })
          );
})
getScreensByProductId(value).then(res=>{
   setScreens(res?.data?.map(screen =>{
    return {...screen,name:screen?.screenName}
   }))
})
},[value])



const titleCase = (word) =>{
const newString = word.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
   return newString
}

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
    }).catch((error) => {
      console.log(error);
      dispatch(snackBarAction({
        open: true,
        color: "error",
        message: snackBarMessages.MENU_FLOW_CREATION_FAILED
      }))
    })
  }

  return (
   <>
     <Grid container rowSpacing={3} columnSpacing={3} sx={{
                padding:"40px"
            }} >
                <Grid item xs={12}>
                    <Typography variant='h4'>Menu Flow</Typography>
                </Grid>
                <Grid item xs={12}>
                <CustomSelectField
                    inputValues={products}
                    label={"Select Product"}
                    value={value}
                    onChange={changeHandler}
                    />
                </Grid>
          {
                    menus?.length === 0 ?  
              <>
              <Box
                className={classes.errorMsgContainer}
              >
                <Typography variant="h4" > There is no menus for this Product </Typography>
              </Box>
              </>
              : 
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
}

export default MenuFlowPage