import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const UserList = () => [
  {
    Header: "User Name",
    accessor: "userName",
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
        <EditPopover
          values={props}
          rowId={props.row.original.id}
          toShow={{ edit: true, viewDetails: true }}
          paths={{
            edit: `${clickPaths.USENAVIGATEMYUSERFORM}`,
          }}
        />
      </div>
    ),
  },
  {
    Header: "User Email",
    accessor: "userEmail",
    id: 2,
    width: 200,
  },
  {
    Header: "User Number",
    accessor: "userNumber",
    id: 3,
    width: 200,
  },
  {
    Header: "Role",
    accessor: "role",
    id: 4,
    width: 200,
  },
];

export const userdata = [
  {
    userName: "EMS",
    userEmail: "ahil@gmail.com",
    userNumber: "9688518844",
    role: "Developer",
  },
];
