import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const UserList = () => [
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
  },
];
