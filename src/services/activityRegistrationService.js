import axiosClient from "./axios";

export const registerForActivity = async (data) => {
  const res = await axiosClient.post("/activity-registrations", data);
  return res.data;
};

export const getAllRegistrations = async () => {
  const res = await axiosClient.get("/activity-registrations");
  return res.data;
};

export const getRegistrationById = async (id) => {
  const res = await axiosClient.get(`/activity-registrations/${id}`);
  return res.data;
};

export const getRegistrationsByActivityId = async (activityId) => {
  const res = await axiosClient.get(
    `/activity-registrations/activity/${activityId}`,
  );
  return res.data;
};

export const getRegistrationsByUserId = async (userId) => {
  const res = await axiosClient.get(`/activity-registrations/user/${userId}`);
  return res.data;
};

export const updateRegistrationStatus = async (id, status) => {
  const res = await axiosClient.put(`/activity-registrations/${id}/status`, {
    status,
  });
  return res.data;
};

export const deleteRegistration = async (id) => {
  const res = await axiosClient.delete(`/activity-registrations/${id}`);
  return res.data;
};
