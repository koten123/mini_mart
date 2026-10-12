// Giả lập: không lưu tài khoản thật
function kiemTra(canTen) {
    var ten = document.getElementById("hoten").value.trim();
    var email = document.getElementById("email").value.trim();
    var mk = document.getElementById("matkhau").value;
    var loi = "";
    if (canTen && ten === "") {
        loi = "Vui lòng nhập họ tên";
    } else if (email === "" || !email.includes("@")) {
        loi = "Email không hợp lệ (cần có ký tự @)";
    } else if (mk === "") {
        loi = "Vui lòng nhập mật khẩu";
    }
    document.getElementById("thongbao").innerText = loi;
    return loi === "";
}

function dangKy() {
    document.getElementById("thanhcong").innerText = "";
    if (kiemTra(true)) {
        document.getElementById("thanhcong").innerText = "Đăng ký thành công! Bấm Đăng nhập để vào khu hội viên.";
    }
}

function dangNhap() {
    document.getElementById("thanhcong").innerText = "";
    if (kiemTra(false)) {
        document.getElementById("khuKhach").style.display = "none";
        document.getElementById("khuHoiVien").style.display = "block";
    }
}

function dangXuat() {
    document.getElementById("khuHoiVien").style.display = "none";
    document.getElementById("khuKhach").style.display = "block";
}