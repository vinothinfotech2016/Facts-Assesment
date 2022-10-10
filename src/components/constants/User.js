import { clickPaths } from "../navigation/routePaths";
import MenuPopover from "../shared/MenuPopover";


export const userList = (roles,data) => [
  {
    Header: "User Name",
    accessor: "name",
    sticky: "left",
    id: 1,
    width: 300,
    Cell: (props) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {props.value}
        <MenuPopover Menu={data} index={props.row.id} path={clickPaths.USENAVIGATEMYUSERFORM} />
      </div>
    ),
  },
  {
    Header: "User Email",
    accessor: "email",
    id: 2,
    width: 200,
  },
  {
    Header: "User Number",
    accessor: "mobileNumber",
    id: 3,
    width: 200,
  },
  {
    Header: "Role",
    accessor: "roleId",
    id: 4,
    width: 200,
    Cell:(props =>{
      return roles.find(item => item.id === props.value)?.role
    })
  },
];
