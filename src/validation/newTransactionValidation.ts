import * as Yup from "yup";
import { userNameRegexp, emailRegexp, phoneRegExp } from "../../regexp";

export const newTransactionFormValidation = Yup.object({
  type: Yup.string().required().oneOf(["sell", "buy", "exchange"]),
  referenceCurrency: Yup.string().required().oneOf(["usd"]),
  fromItem: Yup.string().required(),
  fromAmount: Yup.number().positive().required(),
  fromPricePerItem: Yup.number().positive().required(),
  toItem: Yup.string().required(),
  toAmount: Yup.number().positive().required(),
  toPricePerItem: Yup.number().positive().required(),
});
