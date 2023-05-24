export const formatMoney = (number?: number): string => number == null ? '' : number.toLocaleString('en-US', {
  maximumFractionDigits: 2,
  currency: 'USD',
  style: 'currency'
});

export const moneyClass = (number?: number) => number! < 0 ? 'number lose' : number! > 0 ? 'number win' : 'number';