import React from "react";
import { ListTopbar } from "../shared/ListTopbar";
import { clickPaths } from "../navigation/routePaths";
import { ListContainer } from "../styled";
import { CustomReactTable } from "../shared/CustomReactTable";
import { roledata, RolesList } from "../constants/Roles";

export const Roles = (props) => {
  return (
    <>
      <ListContainer>
        <ListTopbar
          searchField={true}
          newForm={true}
          download={false}
          filter={false}
          label={"ROLES"}
          newFormPath={clickPaths.USENAVIGATEROLESFORM}
        />
        <CustomReactTable
          columnData={RolesList()}
          rawData={roledata}
          disableRowSelection={true}
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
