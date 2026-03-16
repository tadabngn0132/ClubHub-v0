export const API_BASE_URL = "http://localhost:5000/api/v1";

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
