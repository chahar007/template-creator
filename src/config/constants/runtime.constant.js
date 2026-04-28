const parseBoolean = (value, fallback = false) => {
  if (typeof value !== "string") return fallback;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true") return true;
  if (normalized === "false") return false;
  return fallback;
};

export const IS_MOCK = parseBoolean(process.env.REACT_APP_IS_MOCK, true);
