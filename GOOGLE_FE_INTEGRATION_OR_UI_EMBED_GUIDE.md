# Google FE Integration va UI Embed Guide

Tai lieu nay mo ta cac buoc trien khai o frontend de khop voi backend ClubHub-Server-v0 da refactor Google OAuth + per-user credentials.

## 1) Muc tieu

- Login Google dung endpoint backend.
- Nhan accessToken + user sau callback.
- Dong bo UI voi luong tao activity co auto tao Google Calendar event + Google Meet.
- Co phuong an embed UI cho Calendar/Drive/Forms.

## 2) Endpoint backend can dung

Backend hien tai dang expose:

- GET /api/auth/google-auth
- GET /api/auth/google-auth/callback

Trong FE, base URL dang lay qua VITE_API_URL (axios) va mot so cho dang hardcode localhost.

## 3) Chuan hoa env o FE

Them hoac kiem tra file .env cua FE:

- VITE_API_URL=http://localhost:5995/api

Neu can redirect browser truc tiep den endpoint OAuth, co 2 cach:

- Dung VITE_API_URL va noi them /auth/google-auth
- Hoac tao VITE_SERVER_ORIGIN=http://localhost:5995

Khuyen nghi:

- Dung VITE_API_URL de tranh hardcode.

## 4) Sua luong Sign In voi Google

File hien tai:

- src/pages/auth/SignIn.jsx

Can doi doan redirect Google login thanh bien env.

Huong dan:

1. Lay apiBase tu env (import.meta.env.VITE_API_URL).
2. Chuyen /api -> origin neu can, hoac tao bien origin rieng.
3. Redirect den /api/auth/google-auth.

Mau logic:

- const apiBase = import.meta.env.VITE_API_URL
- const googleAuthUrl = `${apiBase}/auth/google-auth`
- window.location.href = googleAuthUrl

Luu y:

- Khong hardcode localhost trong source.

## 5) Xu ly callback OAuth

File hien tai:

- src/pages/auth/AuthCallback.jsx

Backend redirect ve frontend voi query:

- success=true|false
- user=<json encoded>
- accessToken=<token>

Can lam ro 4 case:

1. success=true va co accessToken + user -> login thanh cong
2. success=true nhung accessToken thieu -> goi refresh access token
3. success=false va co message -> hien toast theo message
4. loi parse user -> fallback ve sign-in

Khuyen nghi:

- Parse user bang try/catch.
- Neu success=false, doc message trong query va hien toast.
- Sau khi xu ly xong, navigate theo role.

## 6) Dong bo UI Activity voi Google Calendar/Meet

Backend da co luong:

- create/update activity se sync Google Calendar.
- create event co the auto tao Google Meet.
- response activity co them field calendarSync.

Can cap nhat FE de doc calendarSync khi goi API create/update activity.

Vi du hien thong tin:

- calendarSync.synced = true -> thong bao "Da dong bo Google Calendar"
- calendarSync.eventId co gia tri -> hien icon linked
- calendarSync.error != null -> hien canh bao, nhung khong block user

## 7) Dieu chinh form location de khop backend auto Meet

File hien tai:

- src/components/main/internal/ActivityLocationSection.jsx

Hien tai form yeu cau meetingLink truoc. Trong khi backend co the auto sinh Google Meet link.

De khop backend moi, nen doi UX:

1. Neu user chon Google Meet:
- Cho phep meetingLink optional
- Hien text "He thong se tao Google Meet tu dong neu de trong"

2. Neu user chon Zoom/Teams/Other:
- meetingLink van required

3. Sau khi tao activity thanh cong:
- Neu backend tra meetingLink moi tu Google Meet, update UI bang du lieu tra ve

## 8) UI Embed options

## 8.1 Google Calendar embed (public)

Da co file:

- src/components/main/internal/ActivitiesCalendarView.jsx

Neu calendar la public, iframe embed on dinh.

Checklist:

- Calendar can duoc chia se public hoac cho domain can thiet.
- URL embed dung timezone Asia/Ho_Chi_Minh neu can.

## 8.2 Meeting link embed/open

Khi activity co meetingLink:

- Hien nut Join Meeting
- Mo tab moi (target _blank) thay vi ep iframe

Ly do:

- Nhieu dich vu chan iframe (X-Frame-Options).

## 8.3 Drive/Forms embed

Neu can embed Drive/Forms:

- Dung link share/embed cua Google
- Neu bi block iframe -> fallback nut Open in new tab

## 9) State management goi y

Neu da dung Redux auth:

- luu accessToken nhu hien tai
- bo sung flag googleLinked hoac googleCredentialStatus neu can

Neu can biet user da link Google hay chua:

- them API profile field o backend
- FE render badge "Google connected" hoac "Connect Google"

## 10) Test checklist FE de khop BE

1. Click Sign in with Google -> redirect dung endpoint backend
2. Callback thanh cong -> vao dung dashboard theo role
3. Callback fail -> toast loi + ve sign-in
4. Tao activity online voi Google Meet khong nhap meetingLink
5. Nhan response co calendarSync va meetingLink neu tao Meet thanh cong
6. Trang calendar embed load duoc
7. Nut Join Meeting mo duoc room hop

## 11) Backlog de lam sau

- Tao service rieng cho Google o FE (googleService.js) de tach khoi authService.
- Tao component thong bao trang thai sync calendar trong form create/update activity.
- Ho tro reconnect Google account neu credential bi revoke.
