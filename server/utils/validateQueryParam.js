const validateQueryParam = (queryParam) => {
  const reg = /\W+/g;
  if (queryParam) {
    if (!reg.test(queryParam.toString())) {
      return true;
    }
    return false;
  }
  return false;
};
export default validateQueryParam;
