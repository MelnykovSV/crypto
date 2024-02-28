import { object, string, date } from "yup";
import { userNameRegexp, passwordRegexp, emailRegexp } from "../../regexp";

export const registerFormValidation = object({
  name: string()
    .required("Please enter your name")
    .min(3, "Too short!")
    .max(16, "Too long!")
    .matches(
      userNameRegexp,
      "Your username should consist of letters, numbers, and underscores only"
    ),

  email: string()
    .required("Please enter your email")
    .matches(emailRegexp, "Email is not valid."),

  password: string()
    .required("Please enter the password")
    .matches(
      passwordRegexp,
      "Please ensure your password includes at least one lowercase letter, one uppercase letter, and one symbol or number."
    ),
});
