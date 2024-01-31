import * as Yup from "yup";
import { userNameRegexp, emailRegexp, phoneRegExp } from "../../regexp";

export const userFormValidation = Yup.object({
  name: Yup.string()
    .required("Please enter your name")
    .min(3, "Too short!")
    .max(16, "Too long!")
    .matches(
      userNameRegexp,
      "Your username should consist of letters, numbers, and underscores only"
    ),

  email: Yup.string()
    .required("Please enter your email")
    .matches(emailRegexp, "Email is not valid."),
  phone: Yup.string().matches(phoneRegExp, "Invalid phone format"),
  birthday: Yup.date().nullable(),
});
