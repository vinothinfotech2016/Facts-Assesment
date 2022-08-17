import { CustomLabel } from "../shared/widgets/CustomLabel";

export const formNewProductMasterSchema = {
  type: "object",
  required: [
    "productName",
    "productDiscription",
    "leftLogo",
    "centerLogo",
    "centerText",
    "rightImage",
    "rightName",
    "rightRole",
    "designURL",
  ],
  properties: {
    productName: {
      type: "string",
      label: "Product Name",
    },
    productDiscription: {
      type: "string",
      label: "Product Discription",
    },
    divider1: {
      type: "string",
    },
    header1: { type: "string", label: "Layout-Left" },
    leftLogo: {
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
    centerLogo: {
      type: "array",
      label: "Upload Logo",
      items: {
        type: "object",
      },
    },
    centerText: {
      type: "string",
      label: "Upload Logo",
    },
    divider3: {
      type: "string",
    },
    header3: { type: "string", label: "Layout-Right" },
    rightImage: {
      type: "array",
      label: "Upload image",
      items: {
        type: "object",
      },
    },
    rightName: {
      type: "string",
      label: "Name",
    },
    rightRole: {
      type: "string",
      label: "Role",
    },
    divider4: {
      type: "string",
    },
    header4: { type: "string", label: "Product menu design url" },
    designURL: {
      type: "string",
      label: "Product menu design url",
    },
  },
};

export const formNewProductMasterUiSchema = () => ({
  productName: {},
  productDiscription: {},
  divider1: {
    "ui:widget": "customDivider",
  },
  header1: { "ui:widget": "customLable" },
  leftLogo: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
  divider2: {
    "ui:widget": "customDivider",
  },
  header2: { "ui:widget": "customLable" },
  centerLogo: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
  centerText: { xs: 6 },
  divider3: {
    "ui:widget": "customDivider",
  },
  header3: { "ui:widget": "customLable" },
  rightImage: { xs: 6, "ui:widget": "FileWidget", uploadFile: true },
  rightName: { xs: 6 },
  rightRole: { xs: 6 },
  divider4: {
    "ui:widget": "customDivider",
  },
  header4: { "ui:widget": "customLable" },
  designURL: {},
});
