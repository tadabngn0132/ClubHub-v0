# Best Practice: Quản lý quy trình duyệt ứng viên (CV Review, Interview, Final Review)

## 1. Tổng quan
- Chia quy trình thành 3 trạng thái chính: **CV Review**, **Interview**, **Final Review**.
- Mỗi trạng thái có một danh sách (list) riêng, quản lý các application tương ứng.

## 2. Cấu trúc giao diện (UI)
- Sử dụng **3 tab** (hoặc filter) tương ứng với 3 trạng thái.
- Mỗi tab hiển thị một list các application ở trạng thái đó.

### Thông tin hiển thị trong mỗi list:
- Tên ứng viên
- Email
- Vị trí ứng tuyển
- Ngày nộp đơn
- Trạng thái hiện tại
- Các action phù hợp (xem chi tiết, cập nhật, xóa, chuyển trạng thái)

### Action trong mỗi list:
- **Read**: Xem chi tiết application (click vào dòng hoặc nút riêng)
- **Update**: Sửa nhận xét/trạng thái (nếu được phép)
- **Delete**: Xóa application (nếu cho phép, thường chỉ khi chưa duyệt)
- **Chuyển trạng thái**: VD: “Chuyển sang Interview”, “Chuyển sang Final Review”, “Loại”

## 3. Trang chi tiết application
- Hiển thị đầy đủ thông tin ứng viên và lịch sử đánh giá.
- Cho phép CRUD nhận xét/đánh giá theo từng vòng.
- Phân quyền thao tác rõ ràng (ai được sửa/xóa nhận xét, ai được chuyển trạng thái).

## 4. Lưu ý nghiệp vụ
- **CV Review**: Thường chỉ 1 reviewer, CRUD nhận xét của reviewer đó.
- **Interview**: Có thể nhiều người phỏng vấn, mỗi người CRUD nhận xét của mình.
- **Final Review**: Có thể nhiều reviewer từ các ban, mỗi người CRUD nhận xét của mình, tổng hợp kết quả để quyết định cuối cùng.

## 5. UX/UI bổ sung
- Thêm filter/search theo tên, trạng thái, vị trí ứng tuyển.
- Xác nhận khi thao tác quan trọng (xóa, chuyển trạng thái).
- Lưu lịch sử thao tác, nhận xét.
- Phân quyền action theo vai trò.

---

**Tóm lại:**
- 3 tab = 3 list, mỗi list quản lý application theo trạng thái.
- CRUD chủ yếu áp dụng cho nhận xét/đánh giá.
- Trang chi tiết cho phép xem và thao tác đầy đủ với từng application.
- Đảm bảo phân quyền và trải nghiệm người dùng rõ ràng, thuận tiện.