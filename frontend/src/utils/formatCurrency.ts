const formatCurrency = (money: number): string => {
  const local = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(money);
  return local;
};
export default formatCurrency;
