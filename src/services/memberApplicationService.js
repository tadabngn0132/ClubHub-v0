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

export const softDeleteMemberApplication = async (id) => {
  const res = await axiosClient.put(`/member-applications/${id}/soft`);
  return res.data;
};

export const hardDeleteMemberApplication = async (id) => {
  const res = await axiosClient.delete(`/member-applications/${id}/hard`);
  return res.data;
};

export const updateMemberApplicationCVReviewDetail = async (id, data) => {
  const res = await axiosClient.put(
    `/member-applications/${id}/cv-review`,
    data,
  );
  return res.data;
};

export const updateMemberApplicationFinalReviewDetail = async (id, data) => {
  const res = await axiosClient.put(
    `/member-applications/${id}/final-review`,
    data,
  );
  return res.data;
};

export const updateManyMemberApplications = async (payload) => {
  const res = await axiosClient.put("/member-applications/many/update", payload);
  return res.data;
};
