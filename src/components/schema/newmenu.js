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
        { id: "1", name: "Yes" },
        { id: "2", name: "No" },
      ],
      default: "1",
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

export const newMenuUiSchema = (editId) => ({
  orderNo: { xs: 6 },
  name: {
    "ui:readonly": Boolean(editId),
  },

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
