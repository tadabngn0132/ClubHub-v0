import axiosClient from "./axios";

export const createMemberApplication = async (data) => {
  const res = await axiosClient.post("/member-applications", data);
  return res.data;
};

export const getAllMemberApplications = async () => {
  const res = await axiosClient.get("/member-applications");
  return res.data;
};

export const getMemberApplicationById = async (id) => {
  const res = await axiosClient.get(`/member-applications/${id}`);
  return res.data;
};

export const deleteMemberApplication = async (id) => {
  const res = await axiosClient.delete(`/member-applications/${id}`);
  return res.data;
};

export const approveMemberApplication = async (id) => {
  const res = await axiosClient.post(`/member-applications/${id}/approve`);
  return res.data;
};

export const rejectMemberApplication = async (id) => {
  const res = await axiosClient.post(`/member-applications/${id}/reject`);
  return res.data;
};
