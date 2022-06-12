const  transValidation = {
    email_incorrect: "Email không đúng định dạng!",
    password_incorrect: "Mật khẩu phải chứa ít nhất 8 ký tự.",
    password_confirmation_incorrect: "Nhập lại mật khẩu chưa chính xác.",
    username: "Tên người dùng phải chứa ít nhất 6 ký tự",
    phone: "Số điện thoại giới hạn trong 10-11 ký tự.",
    keyword_find_user: "Lỗi từ khóa tìm kiếm, chỉ cho phép ký tự chữ cái và số, cho phép khoảng trống.",
};

const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã bị gỡ khỏi hệ thống, nếu tin rằng điều này là hiểu nhầm, vui lòng liên hệ lại với bộ phận hỗ trợ của chúng tôi.",
    token_undefined: "Token không tồn tại!",
    login_failed: "Sai email hoặc mật khẩu!",
    user_current_password_failed: "Mật khẩu hiện tại không chính xác.",

};

const transSuccess = {
    user_info_updated: "Cập nhật thông tin người dùng thành công.",
    user_password_updated: "Cập nhật mật khẩu thành công."
};

module.exports = {
    transValidation,
    transErrors,
    transSuccess
};
