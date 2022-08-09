export const formNewUserSchema = {
  type: "object",
  required: [
    "userName",
    "userEmail",
    "userNumber",
    "selectRole",
    "password",
    "confirmPassword",
    "selectProducts",
  ],
  properties: {
    userName: {
      type: "string",
      label: "User Name",
    },
    userEmail: {
      type: "string",
      label: "User Email",
    },
    userNumber: {
      type: "number",
      label: "User Number",
    },
    selectRole: {
      type: "string",
      label: "Select Role",
      options: [
        { id: "1", name: "Role 1" },
        { id: "2", name: "Role 2" },
        { id: "3", name: "Role 3" },
        { id: "4", name: "Role 4" },
      ],
    },
    password: {
      type: "string",
      label: "Password",
    },
    confirmPassword: {
      type: "string",
      label: "Confirm Password",
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
  },
};

export const formNewUserUiSchema = () => ({
  userName: {},
  userEmail: { xs: 6 },
  userNumber: { xs: 6 },
  selectRole: {
    "ui:widget": "SelectWidget",
  },
  password: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
  confirmPassword: { xs: 6, showEyeIcon: true, "ui:widget": "PasswordWidget" },
  selectProducts: {
    "ui:widget": "SelectWidget",
  },
});
