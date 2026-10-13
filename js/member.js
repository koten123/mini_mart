// Giả lập: không kiểm tra tài khoản thật, chỉ cần nhập tên và mật khẩu
function kiemTra() {
    var ten = document.getElementById("hoten").value.trim();
    var mk = document.getElementById("matkhau").value;
    var loi = "";
    if (ten === "") {
        loi = "Vui lòng nhập tên";
    } else if (mk === "") {
        loi = "Vui lòng nhập mật khẩu";
    }
    document.getElementById("thongbao").innerText = loi;
    return loi === "";
}

function hienKhuHoiVien() {
    document.getElementById("tenHV").innerText = layNguoiDung();
    document.getElementById("khuKhach").style.display = "none";
    document.getElementById("khuHoiVien").style.display = "block";
}

function dangKy() {
    document.getElementById("thanhcong").innerText = "";
    if (kiemTra()) {
        document.getElementById("thanhcong").innerText = "Đăng ký thành công! Bấm Đăng nhập để vào khu hội viên.";
    }
}

function dangNhap() {
    document.getElementById("thanhcong").innerText = "";
    if (kiemTra()) {
        localStorage.setItem("minimart_user", document.getElementById("hoten").value.trim());
        document.getElementById("matkhau").value = "";
        hienKhuHoiVien();
    }
}

function dangXuat() {
    localStorage.removeItem("minimart_user");
    document.getElementById("khuHoiVien").style.display = "none";
    document.getElementById("khuKhach").style.display = "block";
}

if (layNguoiDung()) {
    hienKhuHoiVien();
}
