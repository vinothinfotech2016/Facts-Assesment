import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const CustomersList = () => [
  {
    Header: "Product Name",
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
            edit: `${clickPaths.USENAVIGATECUSTOMERFORM}`,
          }}
        />
      </div>
    ),
  },
  {
    Header: "Customer Name",
    accessor: "name",
    id: 2,
    width: 200,
  },
  {
    Header: "Customer Email",
    accessor: "email",
    id: 3,
    width: 200,
  },
  {
    Header: "Customer Number",
    accessor: "mobileNumber",
    id: 4,
    width: 200,
  },
];
