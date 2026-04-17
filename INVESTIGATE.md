### Investigate

1. ProtectedRoute.jsx
- Logic: Chỉ lấy userPosition[0] — user có nhiều vị trí sẽ bị redirect sai. Cần kiểm tra allowedRoles.some(r => positions.includes(r)).

2. googleDriveSlice.js & DocumentsPage.jsx
- Bug: listFilesInFolder fulfilled lưu vào state.files[folderId] (object key) nhưng DocumentsPage đọc state.googleDrive.files như array — luôn trả về [].