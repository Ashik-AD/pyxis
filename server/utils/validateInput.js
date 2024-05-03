export const validateEmail = (email) => {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!reg.test(email.toString().toLowerCase())) {
    return false;
  }
  return true;
};

export const validateEmpty = (input) => {
  if (!input) {
    return true;
  }
  return false;
};

export const checkPattern = (input) => {
  const reg = /(\w+)$/g;
  if (!reg.test(input.toString())) {
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  const reg =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
  if (!reg.test(password)) {
    return false;
  }
  return true;
};
