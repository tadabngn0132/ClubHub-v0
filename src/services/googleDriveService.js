import axiosClient from "./axios";

export const createGoogleDriveFolder = async (folderName) => {
    const response = await axiosClient.post("/api/drive", { folderName });
    return response.data;
};

export const listGoogleDriveFolders = async () => {
    const response = await axiosClient.get("/api/drive");
    return response.data;
}

export const listGoogleDriveFilesInFolder = async (folderId) => {
    const response = await axiosClient.get(`/api/drive/${folderId}/files`);
    return response.data;
};

export const getGoogleDriveFileMetadata = async (fileId) => {
    const response = await axiosClient.get(`/api/drive/files/${fileId}/metadata`);
    return response.data;
};

export const uploadFileToGoogleDriveFolder = async (folderId, fileName, fileContent) => {
    const formData = new FormData();
    formData.append("file", new Blob([fileContent], { type: "application/octet-stream" }), fileName);
    const response = await axiosClient.post(`/api/drive/${folderId}/files`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getGoogleCalendarEventICS = async (userId, eventId, calendarId = "primary") => {
    const response = await axiosClient.get(`/api/calendar/${calendarId}/events/${eventId}/ics`, {
        params: {
            userId,
        },
    });
    return response.data;
};