export const ellipsisText = (val: string, size?: number) => {
  return size
    ? val.length < size
      ? val
      : val.slice(0, size).concat('...')
    : val.length > 400
    ? val.slice(0, 400).concat('...')
    : val;
};
