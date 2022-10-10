import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const formList = () => [
  {
    Header: "Product Name",
    accessor: "productName",
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
            edit: `${clickPaths.USENAVIGATEFORMMASTER}`,
          }}
        />
      </div>
    ),
  },
  {
    Header: "Form Name",
    accessor: "formName",
    id: 2,
    width: 200,
  },
  {
    Header: "Customer Update",
    accessor: "customerUpdate",
    id: 3,
    width: 200,
  },
];
