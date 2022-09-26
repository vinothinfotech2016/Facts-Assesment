import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RegionSelect from "react-region-select";
import { useLocation } from "react-router";
import {
  getScreenById,
  getScreensByProductId,
  updateScreenFlow,
} from "../api/api";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";

function PreviewPage() {
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const [screen, setScreen] = useState("");
  const areas = [];
  const [screens, setScreens] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [regions, setRegions] = useState(
    areas?.map((area, index) => ({
      ...area,
      data: { ...area.data, index },
      new: false,
      isChanging: false,
    }))
  );

  useEffect(() => {
    getScreenById(editId)
      .then((res) => {
        setScreen(res.data);
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

  const regionStyle = {
    background: "rgba(0, 0, 255, 0.5)",
    zIndex: 99,
  };

  const onChangeRegion = (currentRegions) => {
    setRegions(currentRegions);
  };

  const markImageRegion = (markedIndex, markedKey) => {
    const selectedRegion = screens?.find((item) => {
      return item.id === markedKey && item;
    });

    regions[markedIndex].data = {
      targetImageUrl: selectedRegion?.screenImageUrl,
      targetScreenName: selectedRegion?.screenName,
    };
    const finalValue = regions.map((region) => {
      return {
        data: region.data,
        x: region.x,
        y: region.y,
        width: region.width,
        heigth: region.height,
      };
    });
    setSelectedRegions(finalValue);
    console.log(selectedRegions);
  };

  const actionDeleteRegion = (regionIdx) => {
    console.log("​regionIdx", regionIdx);
    console.log(`regions`, regions);
    const filteredRegion = regions.filter(
      (reg) => reg.data.index !== regionIdx
    );
    setRegions(filteredRegion);
  };

  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div>
          <div style={{ position: "absolute", right: 0, top: "-25px" }}>
            <button onClick={() => actionDeleteRegion(regionProps.data.index)}>
              Cancel
            </button>
          </div>
          <div style={{ position: "absolute", right: 0, bottom: "-30px" }}>
            <select
              onChange={(e) =>
                markImageRegion(regionProps.data.index, e.target.value)
              }
              value={regionProps.data.dataType}
            >
              {screens.map((data, index) => {
                return (
                  <option key={index} value={data.id}>
                    {data.screenName}
                  </option>
                );
              })}
            </select>
            {/* <button onClick={() => add()}>Save</button> */}
          </div>
        </div>
      );
    }
  };

  const submit = () => {
    console.log({
      screenName: screen.screenName,
      screenImageUrl: screen.screenImageUrl,
      productId: screen.productId,
      actionItems: selectedRegions,
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
              <Button variant="contained" color="error">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => submit()}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default PreviewPage;
