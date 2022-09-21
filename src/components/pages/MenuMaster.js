import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { MenuList } from "../constants/MenuList";
import { getMenusByUserId, getProductById } from "../api/api";

export const MenuMaster = (props) => {
  const [tableData, setTableData] = React.useState([]);
  const [inputValues, setInputValues] = React.useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData.data.id;

    getMenusByUserId(userId)
      .then((res) => {
        setTableData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getProductById(userId)
      .then((res) => {
        setInputValues(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={true}
          newForm={true}
          download={false}
          filter={false}
          label={"MENU MASTER"}
          newFormPath={clickPaths.USENAVIGATEMENUMASTERFORM}
        />
        <CustomReactTable
          columnData={MenuList(inputValues)}
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
      </ListContainer>
    </>
  );
};
