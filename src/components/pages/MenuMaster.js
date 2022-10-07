import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { MenuList } from "../constants/MenuList";
import { getMenusByProductId, getProductById } from "../api/api";
import { Grid } from "@mui/material";
import { CustomSelectField } from "../shared";


export const MenuMaster = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [inputValues, setInputValues] = React.useState([]);
  const [products , setProducts] = React.useState([])
  const [dropDownValue , setDropDownValue] = React.useState("")

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.data?.id;

    getProductById(userId)
      .then((res) => {
        setInputValues(res.data);
        setProducts(res.data)
        setDropDownValue(res.data[0]?.id)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(()=>{
    dropDownValue &&
    getMenusByProductId(dropDownValue).then(res =>{
      setTableData(res.data)
    }).catch(error =>{
      console.log(error);
    })
  },[dropDownValue])

  const changeHandler =(e) =>{
    setDropDownValue(e.target.value)
  } 

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={true}
          download={false}
          filter={false}
          label={"MENU MASTER"}
          newFormPath={clickPaths.USENAVIGATEMENUMASTERFORM}
        />
      <Grid container rowSpacing={3} columnSpacing={3} >
        <Grid item xs={12} >
           <CustomSelectField
              inputValues={products}
              label={"Select Product"}
              value={dropDownValue}
              onChange={changeHandler}
            />
        </Grid>
        <Grid item xs={12} >
        <CustomReactTable
          columnData={MenuList(inputValues,tableData)}
          rawData={tableData}
          disableRowSelection={true}
          disablePagination={true}
          // onChangePageSize={onChangePageSize}
          // count={count}
          // pageSize={pageSize}
          // currentPage={currentPage}
          // onPageNumberChange={onPageNumberChange}
          columnSize={false}
          style={{
            th: {
              color: "#0000008A",
              font: "normal normal bold 17px Roboto !important",
              height: "64px !important",
              backgroundColor: "#D2E1FC",
            },
            body: {
              color: "#000000DE",
              font: "normal normal normal 14px Roboto !important",
            },
          }}
        />
        </Grid>
        </Grid>
      </ListContainer>
    </>
  );
};
