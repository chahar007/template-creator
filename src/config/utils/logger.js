export const log = (...args) => {
  console.log.apply(console, args);
};

export const error = (...args) => {
  console.error.apply(console, args);
};

export const warn = (...args) => {
  console.warn.apply(console, args);
};

export const group = (groupName, ...rest) => {
  console.group(groupName, ...rest);
};

export const groupEnd = () => {
  console.groupEnd();
};
