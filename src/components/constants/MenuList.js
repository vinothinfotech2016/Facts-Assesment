import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const MenuList = (inputValues) => [
  {
    Header: "Product Name",
    accessor: "productId",
    sticky: "left",
    id: 1,
    width: 300,
    Cell: (props) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {inputValues?.find((item) => item.id === props.value)?.name}
          <EditPopover
            values={props}
            rowId={props.row.original.id}
            toShow={{ edit: true, viewDetails: true }}
            paths={{
              edit: `${clickPaths.USENAVIGATEMENUMASTERFORM}`,
            }}
          />
        </div>
      );
    },
  },
  {
    Header: "Menu Name",
    accessor: "name",
    id: 2,
    width: 200,
  },
  {
    Header: "Menu Design Type",
    accessor: "displayType",
    id: 3,
    width: 200,
  },
  {
    Header: "Order No",
    accessor: "orderNo",
    id: 4,
    width: 200,
  },
  {
    Header: "Sub Menus",
    accessor: "subMenus",
    id: 5,
    width: 200,
    Cell: (props) => {
      return JSON.parse(props?.value)?.toString();
    },
  },
];
