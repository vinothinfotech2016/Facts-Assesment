import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { CustomersList } from "../constants/Customers";
import { userList } from "../api/api";

export const Customertable = (props) => {
  const [tableData, setTableData] = React.useState([]);

  useEffect(() => {
    userList()
      .then((res) => {
        console.log(res.data);
        setTableData(res.data);
      })
      .catch((res) => console.log("responsiveFontSizes"));
  }, []);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={true}
          newForm={true}
          download={false}
          filter={false}
          label={"CUSTOMERS"}
          newFormPath={clickPaths.USENAVIGATECUSTOMERFORM}
        />
        <CustomReactTable
          columnData={CustomersList()}
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
