export const changePasswordSchema = {
  type: "object",
  required: ["oldPassword", "newPassword", "confirmPassword"],
  properties: {
    oldPassword: {
      type: "string",
      label: "Old Password*",
    },
    newPassword: {
      type: "string",
      label: "New Password*",
    },
    confirmPassword: {
      type: "string",
      label: "Confirm New Password*",
    },
  },
};

export const changePasswordUiSchema = () => ({
  oldPassword: { "ui:widget": "PasswordWidget", showEyeIcon: true },
  newPassword: { "ui:widget": "PasswordWidget", showEyeIcon: true },
  confirmPassword: { "ui:widget": "PasswordWidget", showEyeIcon: true },
});
