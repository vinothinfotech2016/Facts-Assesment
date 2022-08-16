export const newMenuSchema = {
  type: "object",
  required: ["orderNo", "menuName", "menuType", "subMenus", "subMenuNames"],
  properties: {
    orderNo: {
      type: "string",
      label: "Order No",
    },
    menuName: {
      type: "string",
      label: "Menu Name",
    },
    menuType: {
      type: "string",
      label: "Menu Display Type",

      options: [
        { id: "1", name: "Top Navigation" },
        { id: "2", name: "Side Navigation" },
        { id: "3", name: "Profile Menu" },
      ],
      default: "1",
    },
    subMenus: {
      type: "string",
      label: "Sub-menus",
      options: [
        { id: "1", name: "Yes" },
        { id: "2", name: "No" },
      ],
      default: "1",
    },
    subMenuNames: {
      type: "array",
      label: "Enter Sub Menu Names",
      items: {
        type: "object",
        options: [
          { id: "1", name: "Menu 1" },
          { id: "2", name: "Menu 2" },
        ],
      },
      uniqueItems: true,
    },
  },
};

export const newMenuUiSchema = () => ({
  orderNo: { xs: 6 },
  menuName: {},
  menuType: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "20px" },
  },
  subMenus: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "75px" },
  },
  subMenuNames: {
    "ui:widget": "multiSelect",
  },
});
