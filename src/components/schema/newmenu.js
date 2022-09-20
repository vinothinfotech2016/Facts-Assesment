export const newMenuSchema = {
  type: "object",
  required: ["orderNo", "name", "displayType", "hasSubMenu"],
  properties: {
    orderNo: {
      type: "number",
      label: "Order No",
    },
    name: {
      type: "string",
      label: "Menu Name",
    },
    displayType: {
      type: "string",
      label: "Menu Display Type",
      options: [
        { id: "Top Navigation", name: "Top Navigation" },
        { id: "Side Navigation", name: "Side Navigation" },
        { id: "Profile Menu", name: "Profile Menu" },
      ],
      default: "Top Navigation",
    },
    hasSubMenu: {
      type: "boolean",
      label: "Sub-menus",
      options: [
        { id: true, name: "Yes" },
        { id: false, name: "No" },
      ],
      default: true,
    },
    subMenus: {
      type: "array",
      label: "Enter Sub Menu Names",
      items: {
        type: "string",
        options: [],
      },
      uniqueItems: true,
    },
  },
};

export const newMenuUiSchema = () => ({
  orderNo: { xs: 6 },
  name: {},
  displayType: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "20px" },
  },
  hasSubMenu: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "75px" },
  },
  subMenus: {
    "ui:widget": "autoComplete",
  },
});
