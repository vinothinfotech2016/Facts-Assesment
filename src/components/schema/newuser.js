export const formNewUserSchema = (role, products,editData) => ({
  type: "object",
  required: [
    "name",
    "email",
    "mobileNumber",
    "roleId",
    "password",
    "confirmPassword",
    "productIds",
  ],
  properties: {
    name: {
      type: "string",
      label: "User Name",
      name: "name",
    },
    email: {
      type: "string",
      label: "User Email",
    },
    mobileNumber: {
      type: "number",
      label: "User Mobile Number",
    },
    roleId: {
      type: "string",
      label: "Select Role",
      options: role,
    },
    password: {
      type: "string",
      label:editData ?"New Password" : "Password",
    },
    confirmPassword: {
      type: "string",
      label: "Confirm Password",
    },
    productIds: {
      type: "array",
      label: "Select Product(s)",
      items: {
        options: products,
      },
      uniqueItems: true,
    },
  },
});

export const formNewUserUiSchema = () => ({
  name: {},
  email: { xs: 6 },
  mobileNumber: { xs: 6 },
  roleId: {
    "ui:widget": "SelectWidget",
  },
  password: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
  confirmPassword: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
  productIds: {
    "ui:widget": "multiSelect",
  },
});
