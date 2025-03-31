# PTIT Code Extension

Extension Chrome giúp tùy chỉnh giao diện và thêm các tính năng hữu ích cho trang web [code.ptit.edu.vn](https://code.ptit.edu.vn) - trang web chấm bài tự động dành cho sinh viên PTIT thực hành các môn tin học, cơ sở dữ liệu và giải thuật, lập trình thi đấu.

## Tính năng

- 🎨 Theme tối (Dark Mode) cho toàn bộ trang web
- 📋 Thêm nút copy input/output cho các bài tập
- 🔄 Tự động lưu cài đặt người dùng
- 🎨 Giao diện thân thiện và dễ sử dụng

## Cài đặt

1. Cài đặt từ Chrome Web Store (hiện tại chưa khả dụng):
   - Truy cập Chrome Web Store
   - Tìm kiếm "PTIT Code Extension" 
   - Click "Thêm vào Chrome"
   - Extension sẽ được cài đặt tự động
   * Lưu ý: Extension hiện chưa được đăng tải lên Chrome Web Store. Vui lòng sử dụng cách cài đặt thủ công bên dưới.
2. Hoặc cài đặt thủ công:
   - Tải source code về máy và giải nén
   - Mở Chrome, truy cập `chrome://extensions/`
   - Bật chế độ "Developer mode"
   - Click "Load unpacked" và chọn thư mục chứa source code

## Sử dụng

1. Sau khi cài đặt, extension sẽ tự động chạy khi bạn truy cập code.ptit.edu.vn
2. Để tùy chỉnh cài đặt:
   - Click vào icon extension trên thanh công cụ Chrome
   - Chọn "Settings"
   - Tùy chỉnh các tùy chọn theo ý muốn

## Phát triển theme mới

Để phát triển một theme mới cho extension, bạn cần thực hiện các bước sau:

1. Tạo file CSS mới:
   - Tạo file `your-theme.css` trong thư mục `themes/`
   - Copy cấu trúc cơ bản từ `themes/dark.css` hoặc `themes/default.css`
   - Tùy chỉnh các thuộc tính CSS theo ý muốn
   - Đảm bảo thêm `!important` cho mỗi thuộc tính để ghi đè style mặc định

2. Tạo file JavaScript (tùy chọn):
   - Nếu theme cần xử lý JavaScript, tạo file `your-theme.js` trong `themes/`
   - Thêm các event listener và logic xử lý cần thiết
   - Tham khảo `themes/dark.js` hoặc `themes/custom.js` làm mẫu

3. Khai báo theme mới:
   - Mở file `config.js`
   - Thêm theme mới vào danh sách themes

4. Kiểm thử:
   - Load lại extension trong Chrome
   - Kiểm tra theme mới trong popup
   - Test các tính năng và giao diện
   - Fix các lỗi nếu có


## Liên hệ

- Email: truongdangduong666@gmail.com
- GitHub: [dangduongcoder](https://github.com/dangduongcoder)

## Tác giả

- **Your Name** - *Initial work* - [dangduongcoder](https://github.com/dangduongcoder)