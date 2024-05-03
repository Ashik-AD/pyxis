export const invalidQueryParamException = (msg, value) => {
  const message = msg ? msg : `Invalid query parameter: ${value}`;
  const code = 422;
  return { message, code };
};
