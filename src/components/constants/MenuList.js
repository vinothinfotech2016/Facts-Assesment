import { clickPaths } from "../navigation/routePaths";
import { EditPopover } from "../shared/EditPopover";

export const MenuList = () => [
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
            edit: `${clickPaths.USENAVIGATEMENUMASTER}`,
          }}
        />
      </div>
    ),
  },
  {
    Header: "Menu Name",
    accessor: "menuName",
    id: 2,
    width: 200,
  },
  {
    Header: "Menu Design Type",
    accessor: "menuDesignType",
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
    accessor: "subMenu",
    id: 5,
    width: 200,
  },
];

export const menudata = [
  {
    productName: "EMS",
    menuName: "Dashboard",
    menuDesignType: "Top Nav",
    orderNo: "2",
    subMenu: "6",
  },
];
