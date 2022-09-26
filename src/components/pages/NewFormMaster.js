import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { clickPaths } from "../navigation/routePaths";
import { FormTopbar } from "../shared/FormTopbar";
import { CustomUploadImage } from "../shared/CustomUploadImage";
import RegionSelect from "react-region-select";
import ImageMapper from "react-image-mapper";
import CustomMultipleImageUpload from "../shared/CustomMultipleImageUpload";

export const NewFormMaster = (props) => {
  const [source, setSource] = React.useState("");

  const changeHandler = (value) => {
    setSource(value);
  };

  const removeImage = () => {
    setSource("");
  };

  const areas = [
    // {
    //   data: { link: "https://www.youtube.com/" },
    //   x: 10,
    //   y: 10,
    //   width: 10,
    //   height: 10,
    // },
    // {
    //   data: { link: "http://facebook.com" },
    //   x: 20,
    //   y: 20,
    //   width: 10,
    //   height: 10,
    // },
  ];

  const imageUrl = source;

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      console.log("image size", { width: image.width, height: image.height });
      setImageSize({ width: image.width, height: image.height });
    };
  }, []);

  const [regions, setRegions] = useState(
    areas.map((area, index) => ({
      ...area,
      data: { ...area.data, index },
      new: false,
      isChanging: false,
    }))
  );
  const [imageMap, setImageMap] = useState([]);

  useEffect(() => {
    const tx = imageSize.width * (20 / 100);
    const bx = imageSize.width * ((20 + 50) / 100);
    const ty = imageSize.height * (20 / 100);
    const by = imageSize.height * ((20 + 50) / 100);
    const area = {
      name: "flower",
      shape: "rect",
      coords: [tx, ty, bx, by],
      preFillColor: "rgba(0, 0, 0, 0.7)",
      fillColor: "yellow",
    };
    const maps = areas.map((area, index) => ({
      _id: index,
      shape: "rect",
      coords: [
        imageSize.width * (area.x / 100),
        imageSize.height * (area.y / 100),
        imageSize.width * ((area.x + area.width) / 100),
        imageSize.height * ((area.y + area.height) / 100),
      ],
      href: area.data.link,
      preFillColor: "rgba(0, 0, 0, 0.5)",
    }));
    console.log(`maps`, maps);
    setImageMap(maps);
  }, [imageSize]);

  const regionStyle = {
    background: "rgba(0, 0, 255, 0.5)",
    zIndex: 99,
  };

  const onChangeRegion = (currentRegions) => {
    setRegions(currentRegions);
    console.log({ currentRegions });
  };

  const actionDeleteRegion = (regionIdx) => {
    console.log("​regionIdx", regionIdx);
    console.log(`regions`, regions);
    const filteredRegion = regions.filter(
      (reg) => reg.data.index !== regionIdx
    );
    setRegions(filteredRegion);
  };

  const markImageRegion = (markedIndex, markedKey) => {
    regions[markedIndex].value = markedKey;
    console.log(regions, "regions");
    // let markeRegions = regions?.map((regIndex) => {
    //   if (regIndex === markedIndex) {
    //     regions[regIndex]["value"] = markedKey;
    //   }
    // });
    // setRegions(markeRegions);
  };

  const regionRenderer = (regionProps) => {
    if (!regionProps.isChanging) {
      return (
        <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
          <input
            type="text"
            name="link"
            onChange={(e) =>
              markImageRegion(regionProps.data.index, e.target.value)
            }
          />
          <button onClick={() => actionDeleteRegion(regionProps.data.index)}>
            Delete
          </button>
        </div>
      );
    }
  };
  const fetchClickedScale = (a, b, c) => {
    console.log(a, b, c, "clicked pointer");
  };
  return (
    <>
      <RegionSelect
        regions={regions}
        regionStyle={regionStyle}
        onChange={onChangeRegion}
        regionRenderer={regionRenderer}
        style={{ border: "1px solid black" }}
      >
        <img src={imageUrl} alt={"sample"} />
      </RegionSelect>
    </>
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, flexShrink: 1, width: "50%" }}>
        <div className="container" style={{ position: "relative" }}>
          {imageSize.width > 0 && (
            <ImageMapper
              src={imageUrl}
              onClick={fetchClickedScale}
              map={{ name: "my-map", areas: imageMap }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
