export const VALIDATION_PATTERNS = {
  fptEmail: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
  phoneNumber: /^0\d{9}$/,
  studentId: /^[A-Za-z]{2}[A-Za-z0-9]{6,10}$/,
  url: /^https?:\/\//i,
  generation: /^\d+$/,
};

export const VALIDATION_MESSAGES = {
  emailRequired: "Email is required",
  emailFptFormat: "Email must be Example123456@fpt.edu.vn",
  emailFptUniversityFormat:
    "Email must be a valid FPT University email address",

  fullNameRequired: "Full name is required",
  fullNameMinLength: "Full name must contain at least 2 characters",

  phoneRequired: "Phone number is required",
  phoneInvalid: "Phone number must be 10 digits and start with 0",

  dateOfBirthRequired: "Date of birth is required",
  dateOfBirthFuture: "Date of birth cannot be in the future",

  genderRequired: "Gender is required",

  majorRequired: "Major is required",
  majorMinLength: "Major must contain at least 2 characters",

  studentIdRequired: "Student ID is required",
  studentIdInvalid: "Student ID format is invalid",

  generationRequired: "Generation cannot be empty",
  generationInvalid: "Generation must be a valid number",

  passwordRequired: "New password is required",
  passwordMinLength: "Passwords must be at least 8 characters",
  passwordMismatch: "Passwords do not match",

  activityTitleMinLength: "Activity title must contain at least 3 characters",
  activityDescriptionMinLength:
    "Activity description must contain at least 10 characters",
  activityStartDateRequired: "Activity start date is required",
  activityEndDateRequired: "Activity end date is required",
  activityEndDateInvalid: "Activity end date must be greater than start date",
  meetingPlatformRequired: "Meeting platform is required",
  meetingLinkRequired: "Meeting link is required",
  meetingLinkInvalid: "Meeting link must be a valid URL",
  venueNameRequired: "Venue name is required",
  venueAddressRequired: "Venue address is required",

  taskTitleMinLength: "Task title must contain at least 3 characters",
  taskDescriptionMinLength:
    "Task description must contain at least 10 characters",

  subjectMinLength: "Subject must contain at least 3 characters",
  messageMinLength: "Message must contain at least 10 characters",

  departmentNameMinLength: "Department name is required",
  departmentDescriptionMinLength: "Department description is required",

  positionTitleMinLength: "Position title is required",

  cvStatusRequired: "Status is required",
  cvStatusValueRequired: "Status must be either 'passed' or 'failed'",

  interviewStatusRequired: "Interview status is required",
  interviewStatusValueRequired:
    "Interview status must be either 'passed' or 'failed'",

  finalStatusRequired: "Final status is required",
  finalStatusValueRequired: "Final status must be either 'passed' or 'failed'",
};

export const VALIDATION_RULES = {
  userEmail: {
    required: VALIDATION_MESSAGES.emailRequired,
    pattern: {
      value: VALIDATION_PATTERNS.fptEmail,
      message: VALIDATION_MESSAGES.emailFptFormat,
    },
  },
  applicationEmail: {
    required: VALIDATION_MESSAGES.emailRequired,
    pattern: {
      value: VALIDATION_PATTERNS.fptEmail,
      message: VALIDATION_MESSAGES.emailFptUniversityFormat,
    },
  },
  phoneNumber: {
    required: VALIDATION_MESSAGES.phoneRequired,
    pattern: {
      value: VALIDATION_PATTERNS.phoneNumber,
      message: VALIDATION_MESSAGES.phoneInvalid,
    },
    minLength: {
      value: 10,
      message: VALIDATION_MESSAGES.phoneInvalid,
    },
    maxLength: {
      value: 10,
      message: VALIDATION_MESSAGES.phoneInvalid,
    },
  },
  studentId: {
    required: VALIDATION_MESSAGES.studentIdRequired,
    pattern: {
      value: VALIDATION_PATTERNS.studentId,
      message: VALIDATION_MESSAGES.studentIdInvalid,
    },
  },
  generation: {
    required: VALIDATION_MESSAGES.generationRequired,
    pattern: {
      value: VALIDATION_PATTERNS.generation,
      message: VALIDATION_MESSAGES.generationInvalid,
    },
  },
  activityMeetingLink: {
    required: VALIDATION_MESSAGES.meetingLinkRequired,
    pattern: {
      value: VALIDATION_PATTERNS.url,
      message: VALIDATION_MESSAGES.meetingLinkInvalid,
    },
  },
  minPassword: {
    minLength: {
      value: 8,
      message: VALIDATION_MESSAGES.passwordMinLength,
    },
  },
};
