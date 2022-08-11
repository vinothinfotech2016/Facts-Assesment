export const customerFormSchema = {
  type: "object",
  required: [
    "customerName",
    "customerEmail",
    "customerNumber",
    "address",
    "state",
    "district",
    "pinCode",
    "selectProducts",
    "userId",
    "password",
    "confirmPassword",
  ],
  properties: {
    customerName: {
      type: "string",
      label: "Customer Name",
    },
    customerEmail: {
      type: "string",
      label: "Customer Name",
    },
    customerNumber: {
      type: "number",
      label: "Customer Number",
    },
    address: {
      type: "string",
      label: "Address",
    },
    state: {
      type: "string",
      label: "State",
    },
    district: {
      type: "string",
      label: "District",
    },
    pinCode: {
      type: "number",
      label: "Pincode",
    },
    divider1: {
      type: "string",
    },
    selectProducts: {
      type: "string",
      label: "Select Product(s)",
      options: [
        { id: "1", name: "Product Name 1" },
        { id: "2", name: "Product Name 2" },
        { id: "3", name: "Product Name 3" },
        { id: "4", name: "Product Name 4" },
      ],
    },
    divider2: {
      type: "string",
    },
    userId: {
      type: "string",
      label: "User ID",
    },
    password: {
      type: "string",
      label: "Password",
    },
    confirmPassword: {
      type: "string",
      label: "Confirm Password",
    },
  },
};

export const customerFormUiSchema = () => ({
  customerName: {},
  customerEmail: { xs: 6 },
  customerNumber: { xs: 6 },
  address: {},
  state: { xs: 6 },
  district: { xs: 6 },
  pinCode: { xs: 6 },
  divider1: {
    "ui:widget": "customDivider",
  },
  selectProducts: {
    "ui:widget": "SelectWidget",
  },
  divider2: {
    "ui:widget": "customDivider",
  },
  userId: { xs: 6 },
  password: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
  confirmPassword: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
});
