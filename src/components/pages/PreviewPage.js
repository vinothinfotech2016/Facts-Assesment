import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RegionSelect from "react-region-select";
import { useLocation, useNavigate } from "react-router";
import {
  getScreenById,
  getScreensByProductId,
  updateScreenFlow,
} from "../api/api";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";

function PreviewPage() {
  const navigate = useNavigate();
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const [screen, setScreen] = useState("");
  const areas = [];
  const [screens, setScreens] = useState([]);
  const [regions, setRegions] = useState(
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

  const [dropDownValue, setDropDownValue] = useState(screens[0]?.id);

  const regionStyle = {
    background: "rgba(0, 0, 0, 0.2)",
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
          <div style={{ position: "absolute", right: 0, top: "-25px" }}>
            <button onClick={() => actionDeleteRegion(regionProps.data.index)}>
              Cancel
            </button>
          </div>
          <div style={{ position: "absolute", right: 0, bottom: "-30px" }}>
            <select
              onChange={(e) => {
                markImageRegion(regionProps.data.index, e.target.value);
              }}
              value={dropDownValue}
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
