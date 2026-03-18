export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const formatDateToLocal = (dateString) => {
  if (!dateString) return "";
  return dateString.slice(0, 10);
}

export const formatNumberToString = (number) => {
  if (number === null || number === undefined) return "";
  return number.toString();
}

export const formatUppercaseToLowercase = (str) => {
  if (!str) return "";
  return str.toLowerCase();
}

export const formatUppercaseToCapitalized = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}