import { object, string } from "yup";
import { emailRegexp } from "../../regexp";

export const loginFormValidation = object({
  email: string()
    .required("Please enter your email")
    .matches(emailRegexp, "Email is not valid."),

  password: string().required("Please enter the password"),
});
