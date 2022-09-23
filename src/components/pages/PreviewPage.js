import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import RegionSelect from "react-region-select";
import { useLocation } from "react-router";
import { getScreenById } from "../api/api";
import { ListTopbar } from "../shared/ListTopbar";
import { ListContainer } from "../styled";

function PreviewPage() {
  const search = useLocation().search;
  const searchParam = new URLSearchParams(search);
  const editId = searchParam?.get("editId");
  const [screen, setScreen] = useState("");
  const areas = [];
  const [regions, setRegions] = useState(
    areas?.map((area, index) => ({
      ...area,
      data: { ...area.data, index },
      new: false,
      isChanging: false,
    }))
  );

  const regionStyle = {
    background: "rgba(0, 0, 255, 0.5)",
    zIndex: 99,
  };

  const onChangeRegion = (currentRegions) => {
    setRegions(currentRegions);
    console.log({ currentRegions });
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
        <div style={{ position: "absolute", right: 0, bottom: "-3.8em" }}>
          {/* <input
            type="text"
            name="link"
            onChange={(e) =>
              markImageRegion(regionProps.data.index, e.target.value)
            }
          />
          <button onClick={() => actionDeleteRegion(regionProps.data.index)}>
            Delete
          </button> */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      );
    }
  };

  useEffect(() => {
    getScreenById(editId)
      .then((res) => {
        setScreen(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editId]);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={false}
          download={false}
          filter={false}
          label={"PREVIEW PAGE"}
        />
        <Box>
          <RegionSelect
            regions={regions}
            regionStyle={regionStyle}
            onChange={onChangeRegion}
            regionRenderer={regionRenderer}
            style={{ border: "1px solid black" }}
          >
            <img
              height={"700px"}
              width={"1100px"}
              src={screen?.screenImageUrl}
              alt={screen?.screenName}
            />
          </RegionSelect>
        </Box>
      </ListContainer>
    </>
  );
}

export default PreviewPage;
