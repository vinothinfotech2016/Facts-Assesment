export const formNewProductMasterSchema = {
  type: "object",
  required: [
    "name",
    "description",
    "leftLogoUrl",
    "centerLogoUrl",
    "rightLogoUrl",
    "menuDesignUrl",
  ],
  properties: {
    name: {
      type: "string",
      label: "Product Name",
    },
    description: {
      type: "string",
      label: "Product Description",
    },
    divider1: {
      type: "string",
    },
    header1: { type: "string", label: "Layout-Left" },
    leftLogoUrl: {
      type: "array",
      label: "Upload Logo",
      items: {
        type: "string",
      },
    },
    divider2: {
      type: "string",
    },
    header2: { type: "string", label: "Layout-Center" },
    centerLogoUrl: {
      type: "array",
      label: "Upload Logo",
      items: {
        type: "string",
      },
    },
    divider3: {
      type: "string",
    },
    header3: { type: "string", label: "Layout-Right" },

    rightLogoUrl: {
      type: "array",
      label: "Upload image",
      items: {
        type: "string",
      },
    },

    divider4: {
      type: "string",
    },
    header4: { type: "string", label: "Product menu design url" },
    menuDesignUrl: {
      type: "array",
      label: "Upload Logo",
      items: {
        type: "string",
      },
    },
  },
};

export const formNewProductMasterUiSchema = (editId) => ({
  name: {
    "ui:readonly": Boolean(editId),
  },
  description: {},
  divider1: {
    "ui:widget": "customDivider",
  },
  header1: { "ui:widget": "customLable" },
  leftLogoUrl: {
    xs: 6,
    "ui:widget": "FileWidget",
    uploadFile: true,
    editId: editId,
  },
  divider2: {
    "ui:widget": "customDivider",
  },
  header2: { "ui:widget": "customLable" },
  centerLogoUrl: {
    xs: 6,
    "ui:widget": "FileWidget",
    uploadFile: true,
    editId: editId,
  },
  divider3: {
    "ui:widget": "customDivider",
  },
  header3: { "ui:widget": "customLable" },
  rightLogoUrl: {
    xs: 6.01,
    "ui:widget": "FileWidget",
    uploadFile: true,
    editId: editId,
  },
  divider4: {
    "ui:widget": "customDivider",
  },
  header4: { "ui:widget": "customLable" },
  menuDesignUrl: {
    xs: 6,
    "ui:widget": "FileWidget",
    uploadFile: true,
    editId: editId,
  },
});
