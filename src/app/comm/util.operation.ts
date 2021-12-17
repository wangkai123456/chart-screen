export const isVal = val => {
  return val !== null && val !== '' && val !== undefined;
};

export const isEmpty = arg => arg === '' || Object.keys(arg).length === 0;

export const composePipe =
  (...fns) =>
  val =>
    fns.reduce((a, b) => b(a), val);
