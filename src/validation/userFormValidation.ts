import { object, string, date } from "yup";
import { userNameRegexp, passwordRegexp, emailRegexp } from "../../regexp";

export const userFormValidation = object({
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
  phone: string().required("Please enter the phone"),
  birthday: date().required("Please enter the birthday").nullable(),
});
