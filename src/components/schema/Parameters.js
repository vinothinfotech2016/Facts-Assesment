export const parameterSchema = {
  type: "object",
  required: ["formType"],
  properties: {
    formType: {
      type: "string",
      label: "Form type",
      options: [
        { id: "1", name: "Form type 1" },
        { id: "1", name: "Form type 2" },
        { id: "1", name: "Form type 3" },
      ],
    },
  },
};

export const parameterUiSchema = () => ({
  formType: {
    "ui:widget": "SelectWidget",
  },
});
