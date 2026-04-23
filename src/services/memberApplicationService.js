import axiosClient from "./axios";

// TODO(member-application): keep this file as the single API gateway for the
// whole workflow. Rebuild the calls for create/list/detail/review/withdraw and
// make the response mapping match the aggregate backend shape:
// state, cvReview, departmentInterviews, and finalReview.

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

export const updateMemberApplicationDepartmentInterviewDetail = async (
  id,
  data
) => {
  const res = await axiosClient.put(
    `/member-applications/${id}/department-interview`,
    data
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

export const withdrawMemberApplication = async (id) => {
  const res = await axiosClient.put(`/member-applications/${id}/withdraw`);
  return res.data;
};
