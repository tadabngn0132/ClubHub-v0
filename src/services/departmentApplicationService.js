import axiosClient from "./axios.js";

export const getDepartmentApplicationsByMemberApplicationId = async (
  memberApplicationId,
) => {
  const res = await axiosClient.get(
    `/department-applications/memberApplication/${memberApplicationId}`,
  );
  return res.data;
};

export const getDepartmentApplicationById = async (id) => {
  const res = await axiosClient.get(`/department-applications/${id}`);
  return res.data;
};

export const getDepartmentApplications = async () => {
  const res = await axiosClient.get("/department-applications");
  return res.data;
};

export const updateDepartmentApplication = async (id, payload) => {
  const res = await axiosClient.put(`/department-applications/${id}`, payload);
  return res.data;
};

export const softDeleteDepartmentApplication = async (id) => {
  const res = await axiosClient.put(`/department-applications/${id}/soft`);
  return res.data;
};

export const hardDeleteDepartmentApplication = async (id) => {
  const res = await axiosClient.delete(`/department-applications/${id}/hard`);
  return res.data;
};
