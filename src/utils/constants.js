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
export const TASK_STATUS_OPTIONS = ["NEW", "IN_PROGRESS", "DONE", "CANCELLED", "ON_HOLD"];
export const MEMBER_APPLICATION_FINAL_STATUS_OPTIONS = ["PENDING", "PASSED", "FAILED"];
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
  { id: 1, name: "All Users", value: "all" },
  { id: 2, name: "Committee Department", value: "committee-dept" },
  { id: 3, name: "Communication Department", value: "communication-dept" },
  { id: 4, name: "Design Department", value: "design-dept" },
  { id: 5, name: "Human Resources Department", value: "hr-dept" },
  { id: 6, name: "Logistics Department", value: "logistics-dept" },
  { id: 7, name: "Content Department", value: "content-dept" },
  { id: 8, name: "Media Department", value: "media-dept" },
];

export const PERMISSIONS = {
  "ADMIN": {
    "canView": true,
    "canEdit": true,
    "canSoftDelete": true,
    "canHardDelete": true,
    "canVerifyTask": true,
  },
  "MODERATOR": {
    "canView": true,
    "canEdit": true,
    "canSoftDelete": true,
    "canHardDelete": false,
    "canVerifyTask": true,
  },
  "MEMBER": {
    "canView": true,
    "canEdit": false,
    "canSoftDelete": false,
    "canHardDelete": false,
    "canVerifyTask": false,
  },
}
