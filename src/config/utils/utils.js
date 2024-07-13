export const getOS = () => {
  if (navigator.userAgent.match(/Android/i)) {
    return "android";
  }
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    return "ios";
  }
  return "browser";
};
