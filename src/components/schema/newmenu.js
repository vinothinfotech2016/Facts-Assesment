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
      type: "string",
      label: "Sub-menus",
      options: [
        { id: true, name: "Yes" },
        { id: false, name: "No" },
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
  name: {},
  displayType: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "20px" },
  },
  hasSubMenu: {
    "ui:widget": "radio",
    labelStyle: { marginRight: "75px" },
  },
  subMenuNames: {
    "ui:widget": "multiSelect",
  },
});
