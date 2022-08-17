import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  // "&:hover": {
  //   backgroundColor: "#f4f4f4",
  // },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //   color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function CustomSearchField() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  // const search = location.search;
  // const searchParam = new URLSearchParams(search);
  // const searchdata = searchParam?.get("search");
  const [value, setValue] = useState("");

  const onSearchChange = (e) => {
    if (e.charCode === 13) {
      navigate({
        pathName: `${pathName}`,
        search: `?${createSearchParams({
          search: e.target.value,
        })}`,
      });
    }
  };

  useEffect(() => setValue(""), [pathName]);

  return (
    <Search style={{ backgroundColor: "#F4F4F4" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        name="searchValue"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => onSearchChange(e)}
        autoComplete="off"
      />
    </Search>
  );
}
