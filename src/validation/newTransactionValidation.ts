import * as Yup from "yup";
import { userNameRegexp, emailRegexp, phoneRegExp } from "../../regexp";

export const newTransactionFormValidation = Yup.object({
  type: Yup.string().required().oneOf(["sell", "buy", "exchange"]),
  fromItemName: Yup.string().required(),
  fromItemSymbol: Yup.string().required(),
  fromItemLogo: Yup.string(),
  fromItemCoinGeckoId: Yup.string().required(),
  fromAmount: Yup.number().positive().required(),
  toItemName: Yup.string().required(),
  toItemSymbol: Yup.string().required(),
  toItemLogo: Yup.string(),
  toItemCoinGeckoId: Yup.string().required(),
  toAmount: Yup.number().positive().required(),
});
