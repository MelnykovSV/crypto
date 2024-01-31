export const userNameRegexp = /^[a-zA-Z0-9_]{3,30}$/;
export const passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
export const emailRegexp =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegExp = /^(\+38 \(\d{3}\) \d{3}-\d{2}-\d{2})?$/;
