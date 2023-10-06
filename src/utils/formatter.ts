export const $moneyFormat = (number: any) => {
  if (isNaN(number)) {
    number = '';
  } else {
    number = Number(number).toLocaleString('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
  return `$ ${number}`;
};

export const $money = (number: any, currency = 'usd') => {
  if (isNaN(number)) {
    number = '';
  } else {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    number = formatter.format(number);
  }
  return number;
};
