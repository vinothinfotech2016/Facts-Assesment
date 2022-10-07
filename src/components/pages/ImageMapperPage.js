import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useLayoutEffect, } from "react";
import { useLocation } from "react-router";
import { getScreenById } from "../api/api";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import ImageMapper from "react-image-mapper";
import RegionSelect from "react-region-select";

function ImageMapperPage() {
  const location = useLocation();
  const [isMapper, setIsMapper] = React.cloneElementuseState(false);
  const [imageSize, setImageSize] = React.cloneElementuseState({ width: 1100, height: 700 });
  const [imageMap, setImageMap] = React.cloneElementuseState([]);
  const [imageUrl, setimageUrl] = React.cloneElementuseState("");
  const [screen, setScreen] = React.cloneElementuseState({});
  const [areas, setAreas] = React.cloneElementuseState([]);

  useLayoutEffect(() => {
    getScreenById(location.state).then((res) => {
      setScreen(res.data);
      setimageUrl(res?.data?.screenImageUrl);
      setAreas(JSON.parse(res?.data?.actionItems));
    });
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setImageSize({ width: 1100, height: 700 });
    };
  }, []);

  useEffect(() => {
    setTimeout(() => setIsMapper(true), 1000);
  }, []);

  const onChangeRegion = (currentRegions) => {
    console.log(currentRegions);
  };

  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}></div>
      );
    }
  };

  const regions = areas.map((area, index) => ({
    ...area,
    data: { ...area.data, index },
    new: false,
    isChanging: false,
  }));

  const fetchClickedScale = (area) => {
    console.log(area);
  };

  const regionStyle = {
    background: "rgba(0, 0, 0, 0.2)",
    zIndex: 99,
  };

  useEffect(() => {
    const maps = areas.map((area, index) => ({
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
  }, [areas.length]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormTopbar
            label="Image Mapper Page"
            listPath={clickPaths.USENAVIGATEFORMMASTER}
          />
          <Box
            sx={{
              padding: "20px",
              marginTop: "60px",
            }}
          >
            <div style={{ padding: "20px" }}>
              {imageMap.length > 0 ? (
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
              ) : (
                <p>this is sathish</p>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ImageMapperPage;
