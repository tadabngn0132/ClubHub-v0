import axiosClient from "./axios";

export const createSheetFromTemplate = async (data) => {
  const response = await axiosClient.post("/sheets/create-from-template", data);
  return response.data;
};

export const createSheetTemplate = async (data) => {
  const response = await axiosClient.post("/sheets/create-template", data);
  return response.data;
};

export const exportMemberListToSheet = async (data) => {
  const response = await axiosClient.post("/sheets/export-member-list", data);
  return response.data;
};

export const exportAttendanceReportToSheet = async (data) => {
  const response = await axiosClient.post("/sheets/export-attendance-report", data);
  return response.data;
};

export const fetchGoogleSheetEmbedLink = async (sheetId) => {
  const response = await axiosClient.get(`/sheets/${sheetId}/embed-link`);
  return response.data;
};

export const listGoogleSheetsTemplates = async (userId) => {
  const response = await axiosClient.get("/sheets/templates");
  return response.data;
};