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
  switch (role.toLowerCase()) {
    case "admin":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "moderator":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "member":
        return "bg-sky-500/20 text-sky-300 border-sky-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
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

export const formatDeptStatusBadgeColor = (isActive) => {
  return isActive ? "text-green-600 font-medium" : "text-gray-600 font-medium";
}