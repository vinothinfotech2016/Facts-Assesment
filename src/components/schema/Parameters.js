export const parameterSchema = {
  type: "object",
  required: ["formType"],
  properties: {
    formType: {
      type: "string",
      label: "Form type",
      options: [
        { id: "Form type 1", name: "Form type 1" },
        { id: "Form type 2", name: "Form type 2" },
        { id: "Form type 3", name: "Form type 3" },
      ],
      // default: "1",
    },
  },
};

export const parameterUiSchema = () => ({
  formType: {
    "ui:widget": "SelectWidget",
  },
});
