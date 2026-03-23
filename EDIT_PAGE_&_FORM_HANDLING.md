## Best practice: để phần gọi API ở page hoặc container (hoặc custom hook), còn form chỉ lo UI + validate + emit dữ liệu qua onSubmit.

## 1. Form Component
- Nhận initialValues, onSubmit, isSubmitting, error qua props.
- Chỉ handle input, validation, submit event.

## 2. Page Component
- Lấy params, fetch data edit mode, map payload.
- Dispatch thunk create or update.
- Handle toast, navigate, reset status.

## Nếu form chỉ dùng đúng 1 nơi và rất nhỏ thì để API trong form vẫn chạy được, nhưng về maintainability lâu dài thì tách ra page/container là tốt hơn trong dự án của bạn.