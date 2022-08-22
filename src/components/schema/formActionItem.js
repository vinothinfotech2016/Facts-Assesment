export const actionItemSchema = {
  type: "object",
  required: ["selectActionItem", "selectForm"],
  properties: {
    selectActionItem: {
      type: "string",
      label: "Select Action Item",
      options: [
        { id: "Action Item 1", name: "Action Item 1" },
        { id: "Action Item 2", name: "Action Item 2" },
        { id: "Action Item 3", name: "Action Item 3" },
      ],
    },

    selectForm: {
      type: "string",
      label: "Select Form",
      options: [
        { id: "Form 1", name: "Form 1" },
        { id: "Form 2", name: "Form 2" },
        { id: "Form 3", name: "Form 3" },
      ],
    },
  },
};

export const actionItemUischema = () => ({
  selectActionItem: {
    "ui:widget": "SelectWidget",
  },
  selectForm: {
    "ui:widget": "SelectWidget",
  },
});
