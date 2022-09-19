export const formNewProductMasterSchema = {
  type: "object",
  required: [
    "name",
    "description",
    "leftLogoUrl",
    "centerLogoUrl",
    "centerText",
    "rightImage",
    "profileName",
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
        type: "object",
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
        type: "object",
      },
    },
    centerText: {
      type: "string",
      label: "Text",
    },
    divider3: {
      type: "string",
    },
    header3: { type: "string", label: "Layout-Right" },
    rightImage: {
      type: "string",
      label: "Role",
    },
    profileName: {
      type: "string",
      label: "Name",
    },
    rightLogoUrl: {
      type: "array",
      label: "Upload image",
      items: {
        type: "object",
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
        type: "object",
      },
    },
  },
};

export const formNewProductMasterUiSchema = () => ({
  name: {},
  description: {},
  divider1: {
    "ui:widget": "customDivider",
  },
  header1: { "ui:widget": "customLable" },
  leftLogoUrl: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
  divider2: {
    "ui:widget": "customDivider",
  },
  header2: { "ui:widget": "customLable" },
  centerLogoUrl: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
  centerText: { xs: 6 },
  divider3: {
    "ui:widget": "customDivider",
  },
  header3: { "ui:widget": "customLable" },
  rightImage: { xs: 6 },
  profileName: { xs: 6 },
  rightLogoUrl: { xs: 6.01, "ui:widget": "FileWidget", uploadFile: true },
  divider4: {
    "ui:widget": "customDivider",
  },
  header4: { "ui:widget": "customLable" },
  menuDesignUrl: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
});
