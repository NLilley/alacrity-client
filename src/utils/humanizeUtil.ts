export const pluralizeS = (count: number) => (count !== 1)? 's' : '';

export const roundTo = (input: number, dp: number) => {
  const multi = Math.pow(10, dp);
  return Math.round(input * multi) / multi;
}