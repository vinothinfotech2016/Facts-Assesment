import { Button, Grid, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect} from "react";
import RegionSelect from "react-region-select";
import { useLocation, useNavigate } from "react-router";
import {
  getScreenById,
  getScreensByProductId,
  updateScreenFlow,
} from "../api/api";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import DeleteIcon from '@mui/icons-material/Delete';
import { CANCEL, SUBMIT } from "../constants/ButtonConstants";

const useStyles = makeStyles({
  dropDown:{
    width:"100px",
    height:"30px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    border:"1px solid #00000050",
    borderRadius:"4px"
  },
  deleteBtn:{
    backgroundColor:"#e85454",
    height:"30px",
    borderRadius:"4px",
    color:"#000",
    "&:hover":{
  backgroundColor:"#e85454"
    }
  },
  container:{
    position: "absolute", 
    right: 0, 
    bottom: "-35px",
    display:"flex"
  }
})

function PreviewPage() {
  const classes = useStyles()
  const navigate = useNavigate();
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const [screen, setScreen] = React.useState("");
  const areas = [];
  const [screens, setScreens] = React.useState([]);
  const [regions, setRegions] = React.useState(
    areas?.map((area, index) => ({
      ...area,
      data: {
        id: screens[0]?.id,
        index: index,
      },
      new: false,
      isChanging: false,
    }))
  );

  useEffect(() => {
    getScreenById(editId)
      .then((res) => {
        setScreen(res.data);
        res.data.actionItems && setRegions(JSON.parse(res?.data?.actionItems));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editId]);

  useEffect(() => {
    screen &&
      getScreensByProductId(screen.productId)
        .then((res) => {
          setScreens(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [screen]);

  const [dropDownValue, setDropDownValue] = React.useState(screens[0]?.id);

  const regionStyle = {
    background: "rgba(0, 0, 0, 0)",
    zIndex: 99,
  };

  const onChangeRegion = (currentRegions) => {
    const temp = [...currentRegions];
    temp[currentRegions.length - 1] = {
      ...currentRegions[currentRegions.length - 1],
      data: {
        ...currentRegions[currentRegions.length - 1].data,
        id: screens[0]?.id,
      },
    };
    setRegions(temp);
  };

  const markImageRegion = (markedIndex, markedKey) => {
    const selectedRegion = screens?.find((item) => {
      return item.id === markedKey && item;
    });

    regions[markedIndex].data = {
      ...regions[markedIndex].data,
      id: selectedRegion?.id,
    };
  };

  const actionDeleteRegion = (regionIdx) => {
    const filteredRegion = regions.filter(
      (reg) => reg.data.index !== regionIdx
    );
    setRegions(filteredRegion);
  };

  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div>
          {/* <div style={{ position: "absolute", right: 0, top: "-40px" }}>
            {/* <IconButton className={classes.deleteBtn} onClick={() => actionDeleteRegion(regionProps.data.index)} >
            <DeleteIcon />
            </IconButton> */}
          {/* </div> */} 
          <div className={classes.container} >
            <IconButton className={classes.deleteBtn} onClick={() => actionDeleteRegion(regionProps.data.index)} >
            <DeleteIcon />
            </IconButton>
            <select
              onChange={(e) => {
                markImageRegion(regionProps.data.index, e.target.value);
              }}
              value={dropDownValue}
              className={classes.dropDown}
            >
              {screens.map((data, index) => {
                return (
                  <option key={index} value={data.id}>
                    {data.screenName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      );
    }
  };

  const submit = () => {
    updateScreenFlow(
      {
        screenName: screen.screenName,
        screenImageUrl: screen.screenImageUrl,
        productId: screen.productId,
        actionItems: regions,
      },
      screen.id
    )
      .then((res) => {
        console.log(res);
        navigate(clickPaths.USENAVIGATEFORMMASTER);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormTopbar
            label="Preview Page"
            listPath={clickPaths.USENAVIGATEFORMMASTER}
          />
          <Box
            sx={{
              padding: "20px",
              marginTop: "60px",
            }}
          >
            <RegionSelect
              regions={regions}
              regionStyle={regionStyle}
              onChange={onChangeRegion}
              regionRenderer={regionRenderer}
              style={{
                border: "1px solid black",
                PointerEvent: "none",
              }}
            >
              <img
                height={"700px"}
                width={"1100px"}
                src={screen?.screenImageUrl}
                alt={screen?.screenName}
              />
            </RegionSelect>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginX: "40px",
                marginBottom: "40px",
              }}
            >
              <Button variant="contained" color="error" onClick={()=>navigate(clickPaths.USENAVIGATEFORMMASTER)} >
                {CANCEL}
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => submit()}
              >
                {SUBMIT}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PreviewPage;
