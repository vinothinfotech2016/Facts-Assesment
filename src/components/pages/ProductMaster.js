import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { productList } from "../constants/ProductList";
import { getProductById } from "../api/api";

export const ProductMaster = (props) => {
  const [tableData, setTableData] = React.useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const {
      data: { id },
    } = userData;

    getProductById(id)
      .then((res) => {
        setTableData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={true}
          download={false}
          filter={false}
          label={"PRODUCT MASTER"}
          newFormPath={clickPaths.USENAVIGATEPRODUCTMASTERFORM}
        />
        <CustomReactTable
          columnData={productList()}
          rawData={tableData}
          disableRowSelection={true}
          disablePagination={true}
          // onChangePageSize={onChangePageSize}
          // count={count}
          // pageSize={pageSize}
          // currentPage={currentPage}
          // onPageNumberChange={onPageNumberChange}
          columnSize={true}
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
