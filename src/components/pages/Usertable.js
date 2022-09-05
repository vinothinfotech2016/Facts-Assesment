import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { UserList } from "../constants/User";
import { userList } from "../api/api";

export const Usertable = (props) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    userList()
      .then((res) => {
        // console.log(res, "hello");
        setData(res.data);
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
          label={"MY USERS"}
          newFormPath={clickPaths.USENAVIGATEMYUSERFORM}
        />
        <CustomReactTable
          columnData={UserList()}
          rawData={data}
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
