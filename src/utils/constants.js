export const API_BASE_URL = "http://localhost:5000/api/v1";

export const AUTH_STORAGE_MODE = {
  LOCAL: "local",
  SESSION: "session",
};

export const AUTH_STORAGE_MODE_KEY = "authStorageMode";
export const AUTH_LAST_ACTIVE_AT_KEY = "authLastActiveAt";
export const AUTH_INACTIVITY_TIMEOUT_HOURS_KEY = "authInactivityTimeoutHours";
export const AUTH_REMEMBER_DAYS_KEY = "authRememberDays";
export const AUTH_INACTIVITY_TIMEOUT_HOURS = Number(
  import.meta.env.VITE_AUTH_INACTIVITY_TIMEOUT_HOURS || 24,
);
export const AUTH_REMEMBER_DAY_OPTIONS = [1, 7, 30];

export const PRIVATE_ROUTE_PREFIXES = ["/admin", "/moderator", "/member"];

export const PRIVATE_API_PREFIXES = [
  "/users",
  "/tasks",
  "/positions",
  "/notifications",
  "/messages",
  "/rooms",
  "/departments",
  "/department-applications",
  "/chat-rooms",
  "/activities",
  "/activity-participations",
  "/member-applications",
  "/ai",
  "/auth/change-password",
];

export const ACTIVITY_TYPES = {
  MEETING: "MEETING",
  WORKSHOP: "WORKSHOP",
  TRAINING: "TRAINING",
  PERFORMANCE: "PERFORMANCE",
  COMPETITION: "COMPETITION",
  SOCIAL: "SOCIAL",
  VOLUNTEER: "VOLUNTEER",
};

export const ACTIVITY_STATUSES = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  POSTPONED: "POSTPONED",
};

export const USER_STATUS_OPTIONS = ["ACTIVE", "INACTIVE"];
export const TASK_STATUS_OPTIONS = [
  "NEW",
  "IN_PROGRESS",
  "DONE",
  "CANCELLED",
  "ON_HOLD",
];
export const MEMBER_APPLICATION_FINAL_STATUS_OPTIONS = [
  "PENDING",
  "PASSED",
  "FAILED",
];
export const ACTIVITY_STATUS_OPTIONS = [
  "DRAFT",
  "PUBLISHED",
  "ONGOING",
  "COMPLETED",
  "CANCELLED",
  "POSTPONED",
];

export const TASK_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in-progress",
  DONE: "done",
  CANCELLED: "cancelled",
  ON_HOLD: "on-hold",
};

export const ASSIGNEE_SCOPE = [
  { id: 1, name: "All Club Members", value: "all" },
  { id: 2, name: "Departments", value: "depts" },
  { id: 3, name: "Some Members", value: "members" },
];

export const PERMISSIONS = {
  ADMIN: {
    canView: true,
    canEdit: true,
    canSoftDelete: true,
    canHardDelete: true,
    canVerifyTask: true,
  },
  MODERATOR: {
    canView: true,
    canEdit: true,
    canSoftDelete: true,
    canHardDelete: false,
    canVerifyTask: true,
  },
  MEMBER: {
    canView: true,
    canEdit: false,
    canSoftDelete: false,
    canHardDelete: false,
    canVerifyTask: false,
  },
};

export const LAYOUT_CONFIG = {
  admin: {
    allowedRoles: ["admin"],
    sideBarItems: [
      { name: "Dashboard", link: "/admin/dashboard", icon: "faGauge" },
      { name: "Members", link: "/admin/users", icon: "faUsers" },
      { name: "Departments", link: "/admin/departments", icon: "faBuilding" },
      { name: "Positions", link: "/admin/positions", icon: "faIdBadge" },
      { name: "Activities", link: "/admin/activities", icon: "faCalendarDays" },
      { name: "Tasks", link: "/admin/tasks", icon: "faListCheck" },
      { name: "Documents", link: "/admin/documents", icon: "faFileLines" },
      { name: "Chat", link: "/admin/chat", icon: "faComments" },
      {
        name: "Member Applications",
        link: "/admin/member-applications",
        icon: "faFilePen",
      },
      { name: "Profile", link: "/admin/profile", icon: "faUserGear" },
      { name: "Settings", link: "/admin/setting", icon: "faGear" },
      {
        name: "Activity Logs",
        link: "/admin/activity-logs",
        icon: "faClipboardList",
      },
    ],
  },
  moderator: {
    allowedRoles: ["moderator"],
    sideBarItems: [
      { name: "Dashboard", link: "/moderator/dashboard", icon: "faGauge" },
      { name: "Members", link: "/moderator/users", icon: "faUsers" },
      {
        name: "Departments",
        link: "/moderator/departments",
        icon: "faBuilding",
      },
      { name: "Positions", link: "/moderator/positions", icon: "faIdBadge" },
      {
        name: "Member Applications",
        link: "/moderator/member-applications",
        icon: "faFilePen",
      },
      {
        name: "Activities",
        link: "/moderator/activities",
        icon: "faCalendarDays",
      },
      { name: "Tasks", link: "/moderator/tasks", icon: "faListCheck" },
      { name: "Chat", link: "/moderator/chat", icon: "faComments" },
      { name: "Profile", link: "/moderator/profile", icon: "faUserGear" },
      { name: "Settings", link: "/moderator/setting", icon: "faGear" },
    ],
  },
  member: {
    allowedRoles: ["member"],
    sideBarItems: [
      { name: "Dashboard", link: "/member/dashboard", icon: "faGauge" },
      { name: "Members", link: "/member/users", icon: "faUsers" },
      { name: "Departments", link: "/member/departments", icon: "faBuilding" },
      { name: "Positions", link: "/member/positions", icon: "faIdBadge" },
      {
        name: "Activities",
        link: "/member/activities",
        icon: "faCalendarDays",
      },
      { name: "Tasks", link: "/member/tasks", icon: "faListCheck" },
      { name: "Chat", link: "/member/chat", icon: "faComments" },
      { name: "Profile", link: "/member/profile", icon: "faUserGear" },
      { name: "Settings", link: "/member/setting", icon: "faGear" },
    ],
  },
};
