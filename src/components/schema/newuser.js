export const formNewUserSchema = (role, products) => ({
  type: "object",
  required: [
    // "userName",
    // "userEmail",
    // "userNumber",
    // "selectRole",
    // "password",
    // "confirmPassword",
    // "selectProducts",
    "name",
    "email",
    "mobileNumber",
    "roleId",
    "password",
    "confirmPassword",
    "userType",
  ],
  properties: {
    // userName: {
    name: {
      type: "string",
      label: "User Name",
      name: "name",
    },
    // userEmail: {
    email: {
      type: "string",
      label: "User Email",
    },
    // userNumber: {
    mobileNumber: {
      type: "number",
      label: "User Number",
    },
    // selectRole: {
    roleId: {
      type: "string",
      label: "Select Role",
      options: role,
    },
    password: {
      type: "string",
      label: "Password",
    },
    confirmPassword: {
      type: "string",
      label: "Confirm Password",
    },
    // selectProducts: {
    userType: {
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
  userType: {
    "ui:widget": "multiSelect",
  },
});
