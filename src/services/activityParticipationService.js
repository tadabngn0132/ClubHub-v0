import axiosClient from "./axios";

export const createActivityParticipation = async (data) => {
  const res = await axiosClient.post("/activity-participations", data);
  return res.data;
};

export const getAllParticipations = async () => {
  const res = await axiosClient.get("/activity-participations");
  return res.data;
};

export const getParticipationById = async (id) => {
  const res = await axiosClient.get(`/activity-participations/${id}`);
  return res.data;
};

export const getParticipationsByActivityId = async (activityId) => {
  const res = await axiosClient.get(
    `/activity-participations/activity/${activityId}`,
  );
  return res.data;
};

export const getParticipationsByUserId = async (userId) => {
  const res = await axiosClient.get(`/activity-participations/user/${userId}`);
  return res.data;
};

export const updateParticipationById = async (id, participationData) => {
  const res = await axiosClient.put(
    `/activity-participations/${id}`,
    participationData,
  );
  return res.data;
};

export const deleteParticipation = async (id) => {
  const res = await axiosClient.delete(`/activity-participations/${id}`);
  return res.data;
};

export const checkInParticipant = async (participationId) => {
  const res = await axiosClient.put(
    `/activity-participations/${participationId}/check-in`,
  );
  return res.data;
};

export const markParticipantNoShow = async (activityId, userId) => {
  const res = await axiosClient.put(
    `/activity-participations/${activityId}/no-show`,
    { userId },
  );
  return res.data;
};
