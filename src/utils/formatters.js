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

export const formatPositionLevel = (level) => {
  if (level === null || level === undefined) return "";
  switch (level) {
    case 'TOP_HEAD':
      return 'Top Head';
    case 'TOP_VICE_HEAD':
      return 'Top Vice Head';
    case 'MIDDLE_HEAD':
      return 'Middle Head';
    case 'MIDDLE_VICE_HEAD':
      return 'Middle Vice Head';
    case 'MEMBER':
      return 'Member';
    default:
      return level;
  }
}

export const formatRoleBadgeColor = (role) => {
  switch (role) {
    case "Admin":
      return "bg-red-500";
    case "Moderator":
      return "bg-blue-500";
    case "Member":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

export const formatStatusBadgeColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 font-medium";
      case "Inactive":
        return "text-gray-600 font-medium";
      default:
        return "";
    }
  };