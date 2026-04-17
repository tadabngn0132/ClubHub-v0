### Investigate

1. ProtectedRoute.jsx
- Logic: Chỉ lấy userPosition[0] — user có nhiều vị trí sẽ bị redirect sai. Cần kiểm tra allowedRoles.some(r => positions.includes(r)).

2. googleDriveSlice.js & DocumentsPage.jsx
- Bug: listFilesInFolder fulfilled lưu vào state.files[folderId] (object key) nhưng DocumentsPage đọc state.googleDrive.files như array — luôn trả về [].

3. DashboardWidget.jsx
- Bug: Link to task dùng task.id nhưng data shape là {id, task: {id, title}} — href sẽ trỏ đến wrapper ID, không phải task ID thật.

4. DashboardCharts.jsx
- Incomplete: Import recharts nhưng không render gì — chỉ có heading. Cần thêm LineChart/BarChart thật với data từ Redux.