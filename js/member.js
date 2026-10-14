// Bản demo phía trình duyệt: chỉ lưu tên hội viên và mã băm mật khẩu, không lưu mật khẩu thô.
// Website chưa có backend; không dùng cơ chế này cho tài khoản thật.
var KHOA_TAI_KHOAN = "minimartMemberDemo";
// Trang chi tiết đọc khóa này để biết đã đăng nhập hay chưa.
var KHOA_DANG_NHAP = "minimart_user";

function layTen() {
    return document.getElementById("hoten").value.trim();
}

function layMatKhau() {
    return document.getElementById("matkhau").value;
}

function baoLoi(noiDung) {
    document.getElementById("thongbao").innerText = noiDung || "";
}

function baoThanhCong(noiDung) {
    document.getElementById("thanhcong").innerText = noiDung || "";
}

function kiemTra() {
    var loi = "";
    if (!layTen()) {
        loi = "Vui lòng nhập tên hội viên.";
    } else if (!layMatKhau()) {
        loi = "Vui lòng nhập mật khẩu.";
    }
    baoLoi(loi);
    return loi === "";
}

async function bamMatKhau(matKhau) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) {
        throw new Error("Trình duyệt chưa hỗ trợ mã hóa cần thiết. Hãy mở dự án qua Live Server hoặc localhost.");
    }
    var duLieu = new TextEncoder().encode(matKhau);
    var ketQua = await window.crypto.subtle.digest("SHA-256", duLieu);
    return Array.from(new Uint8Array(ketQua)).map(function (byte) {
        return byte.toString(16).padStart(2, "0");
    }).join("");
}

function taiKhoanDaLuu() {
    try {
        return JSON.parse(localStorage.getItem(KHOA_TAI_KHOAN) || "null");
    } catch (e) {
        return null;
    }
}

// Hạng theo tổng điểm: sửa ngưỡng ở đây nếu muốn.
function hangTheoDiem(diem) {
    return diem >= 150 ? "Vàng" : diem >= 50 ? "Bạc" : "Đồng";
}

// Đọc đơn hàng của riêng tài khoản này (cart.js ghi cùng khóa), vẽ lịch sử và tính điểm/hạng.
function veLichSu(ten) {
    var ds = [];
    try { ds = JSON.parse(localStorage.getItem("minimart_orders_" + ten.toLocaleLowerCase("vi")) || "[]"); } catch (e) { ds = []; }
    if (!Array.isArray(ds)) ds = [];
    var tbody = document.getElementById("lichSuMuaHang"), tongDiem = 0;
    tbody.innerHTML = "";
    if (!ds.length) {
        tbody.innerHTML = '<tr><td colspan="4">Bạn chưa có đơn hàng nào.</td></tr>';
    }
    ds.slice().reverse().forEach(function (don) {
        var tr = document.createElement("tr");
        [don.ngay, don.ma, Number(don.tong).toLocaleString("vi-VN") + "đ", "+" + don.diem].forEach(function (giaTri) {
            var td = document.createElement("td");
            td.textContent = giaTri;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    ds.forEach(function (don) { tongDiem += Number(don.diem) || 0; });
    document.getElementById("diemHV").innerText = tongDiem;
    document.getElementById("hangHV").innerText = hangTheoDiem(tongDiem);
}

function hienKhuHoiVien(ten) {
    document.getElementById("tenHoiVien").innerText = ten;
    veLichSu(ten);
    document.getElementById("khuKhach").style.display = "none";
    document.getElementById("khuHoiVien").style.display = "block";
}

async function dangKy() {
    baoLoi("");
    baoThanhCong("");
    if (!kiemTra()) return;
    try {
        var taiKhoan = {
            ten: layTen(),
            matKhauHash: await bamMatKhau(layMatKhau())
        };
        localStorage.setItem(KHOA_TAI_KHOAN, JSON.stringify(taiKhoan));
        baoThanhCong("Tạo hội viên thành công! Bạn có thể bấm Đăng nhập để xem quyền lợi.");
    } catch (loi) {
        baoLoi(loi.message || "Không thể tạo tài khoản trên trình duyệt này.");
    }
}

async function dangNhap() {
    baoLoi("");
    baoThanhCong("");
    if (!kiemTra()) return;
    try {
        var taiKhoan = taiKhoanDaLuu();
        if (!taiKhoan) {
            baoLoi("Bạn chưa có tài khoản hội viên. Hãy bấm Đăng ký trước.");
            return;
        }
        var matKhauHash = await bamMatKhau(layMatKhau());
        if (taiKhoan.ten.toLocaleLowerCase("vi") !== layTen().toLocaleLowerCase("vi") || taiKhoan.matKhauHash !== matKhauHash) {
            baoLoi("Tên hội viên hoặc mật khẩu chưa chính xác.");
            return;
        }
        hienKhuHoiVien(taiKhoan.ten);
        localStorage.setItem(KHOA_DANG_NHAP, taiKhoan.ten);
        baoThanhCong("");
    } catch (loi) {
        baoLoi(loi.message || "Không thể đăng nhập trên trình duyệt này.");
    }
}

function dangXuat() {
    localStorage.removeItem(KHOA_DANG_NHAP);
    document.getElementById("khuHoiVien").style.display = "none";
    document.getElementById("khuKhach").style.display = "block";
    baoLoi("");
    baoThanhCong("Bạn đã đăng xuất.");
}

// Quay lại trang khi vẫn đang đăng nhập thì hiện luôn khu hội viên.
if (localStorage.getItem(KHOA_DANG_NHAP)) {
    hienKhuHoiVien(localStorage.getItem(KHOA_DANG_NHAP));
}