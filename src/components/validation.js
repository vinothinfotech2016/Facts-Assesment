import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("*Please Enter  Email-Id/Mobile Number"),
  password: yup.string().required("*Please Enter the Password"),
});
