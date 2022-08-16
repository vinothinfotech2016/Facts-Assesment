export const newFormMasterSchema = {
  type: "object",
  required: [
    "selectProduct",
    "formName",
    "formDescription",
    "formType",
    "uploadImage",
    "actionItems",
    "formURL",
    "notesForDeveloper",
  ],
  properties: {
    selectProduct: {
      type: "string",
      label: "Select Product",
      options: [
        { id: "1", name: "Product Name 1" },
        { id: "2", name: "Product Name 2" },
        { id: "3", name: "Product Name 3" },
      ],
    },
    divider: {
      type: "string",
    },
    formName: {
      type: "string",
      label: "Form Name",
    },
    formDescription: {
      type: "string",
      label: "Form Description",
    },
    formType: {
      type: "string",
      label: "Form Type (p)",
      options: [
        { id: "1", name: "Type 1" },
        { id: "2", name: "Type 2" },
        { id: "3", name: "Type3" },
      ],
    },
    uploadImage: {
      type: "array",
      label: "Upload from Image",
      // uploadFile: true,
      items: {
        type: "object",
      },
    },
    actionItems: {
      type: "string",
      label: "Select action items",
      items: {
        type: "object",
        options: [
          { id: "1", name: "Action Item 1" },
          { id: "2", name: "Action Item  2" },
          { id: "3", name: "Action Item  3" },
        ],
      },
      uniqueItems: true,
    },
    formURL: {
      type: "string",
      label: "Form URL",
    },
    notesForDeveloper: {
      type: "string",
      label: "Notes for developer",
    },
  },
};

export const newFormMasterUiSchema = () => ({
  selectProduct: {
    "ui:widget": "SelectWidget",
  },
  divider: {
    "ui:widget": "customDivider",
  },
  formName: {},
  formDescription: {},
  formType: {
    xs: 6,
    "ui:widget": "SelectWidget",
  },
  uploadImage: {
    xs: 6,
    "ui:widget": "FileWidget",
    uploadFile: true,
  },
  actionItems: {
    "ui:widget": "multiSelect",
  },
  formURL: {},
  notesForDeveloper: {},
});