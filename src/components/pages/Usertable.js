import React, { useEffect } from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { userList } from "../constants/User";
import { getRole, getUsers } from "../api/api";

export const Usertable = (props) => {
  const [data, setData] = React.useState([]);
  const [roles , setRoles] = React.useState([])

  useEffect(() => {
    getUsers()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });


      getRole().then(res =>{
        setRoles(res.data)
      }).catch(error =>{
        console.log(error);
      })
  }, []);

  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={false}
          newForm={true}
          download={false}
          filter={false}
          label={"MY USERS"}
          newFormPath={clickPaths.USENAVIGATEMYUSERFORM}
        />
        <CustomReactTable
          columnData={userList(roles , data)}
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
