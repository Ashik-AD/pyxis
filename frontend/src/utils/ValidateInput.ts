export const validateEmail = (email: string): boolean => {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!reg.test(email.toString().toLowerCase())) {
    return false;
  }
  return true;
};

export const checkPattern = (input: string): boolean => {
  const reg = /(\w+)$/g;
  if (!reg.test(input.toString())) {
    return false;
  }
  return true;
};

export const validatePassword = (password: string): boolean => {
  const reg =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
  if (!reg.test(password)) {
    return false;
  }
  return true;
};

export const validateDateRange = (
  from: number,
  to: number,
  val: number
): boolean => (val >= from && val <= to ? true : false);
