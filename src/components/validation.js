import * as yup from "yup";

export const loginSchema = (values) => {
  const temp = values
    ? {
        email: yup
          .string()
          .email("Please enter valid Email-ID")
          .required("Email-ID cannot be empty"),
      }
    : {
        email: yup
          .string()
          .required("Please enter valid MobileNumber")
          .min(10, "MobileNumber must be at least 10 char")
          .max(10, "MobileNumber must be  10 char"),
      };

  return yup.object({
    ...temp,
    password: yup.string().required("*Please Enter the Password"),
  });
};
