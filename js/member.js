// MiniMart - quản lý nhiều tài khoản, lịch sử mua hàng và điểm hội viên.
// Bản demo frontend: dữ liệu chỉ nằm trong localStorage của trình duyệt hiện tại.
var KHOA_TAI_KHOAN = "minimartMembers";
var KHOA_DANG_NHAP = "minimartCurrentMember";
var TY_LE_DIEM = 10000; // 1 điểm cho mỗi 10.000đ thanh toán

function layTen() {
    return (document.getElementById("hoten")?.value || "").trim();
}
function layMatKhau() {
    return document.getElementById("matkhau")?.value || "";
}
function baoLoi(noiDung) {
    var el = document.getElementById("thongbao");
    if (el) el.innerText = noiDung || "";
}
function baoThanhCong(noiDung) {
    var el = document.getElementById("thanhcong");
    if (el) el.innerText = noiDung || "";
}
function docDanhSachTaiKhoan() {
    try {
        var ds = JSON.parse(localStorage.getItem(KHOA_TAI_KHOAN) || "[]");
        return Array.isArray(ds) ? ds : [];
    } catch (e) { return []; }
}
function luuDanhSachTaiKhoan(ds) {
    localStorage.setItem(KHOA_TAI_KHOAN, JSON.stringify(ds));
}
function layTaiKhoanDangNhap() {
    var ten = localStorage.getItem(KHOA_DANG_NHAP);
    if (!ten) return null;
    return docDanhSachTaiKhoan().find(function (tk) {
        return tk.ten.toLocaleLowerCase("vi") === ten.toLocaleLowerCase("vi");
    }) || null;
}
async function bamMatKhau(matKhau) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) {
        throw new Error("Trình duyệt chưa hỗ trợ mã hóa. Hãy mở bằng Live Server hoặc localhost.");
    }
    var data = new TextEncoder().encode(matKhau);
    var digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map(function (b) {
        return b.toString(16).padStart(2, "0");
    }).join("");
}
function kiemTra() {
    var loi = "";
    if (!layTen()) loi = "Vui lòng nhập tên hội viên.";
    else if (!layMatKhau()) loi = "Vui lòng nhập mật khẩu.";
    baoLoi(loi);
    return !loi;
}
async function dangKy() {
    baoLoi(""); baoThanhCong("");
    if (!kiemTra()) return;
    try {
        var ds = docDanhSachTaiKhoan();
        if (ds.some(function (tk) {
            return tk.ten.toLocaleLowerCase("vi") === layTen().toLocaleLowerCase("vi");
        })) {
            baoLoi("Tên hội viên này đã tồn tại. Hãy đăng nhập hoặc chọn tên khác.");
            return;
        }
        ds.push({
            ten: layTen(),
            matKhauHash: await bamMatKhau(layMatKhau()),
            diem: 0,
            tongChiTieu: 0,
            lichSu: [],
            taoLuc: new Date().toISOString()
        });
        luuDanhSachTaiKhoan(ds);
        baoThanhCong("Tạo tài khoản thành công! Tài khoản mới có 0 điểm và chưa có lịch sử mua hàng.");
    } catch (e) { baoLoi(e.message || "Không thể tạo tài khoản."); }
}
async function dangNhap() {
    baoLoi(""); baoThanhCong("");
    if (!kiemTra()) return;
    try {
        var ds = docDanhSachTaiKhoan();
        var hash = await bamMatKhau(layMatKhau());
        var tk = ds.find(function (x) {
            return x.ten.toLocaleLowerCase("vi") === layTen().toLocaleLowerCase("vi") &&
                x.matKhauHash === hash;
        });
        if (!tk) {
            baoLoi("Tên hội viên hoặc mật khẩu chưa chính xác.");
            return;
        }
        localStorage.setItem(KHOA_DANG_NHAP, tk.ten);
        hienThiHoiVien(tk);
        baoThanhCong("");
    } catch (e) { baoLoi(e.message || "Không thể đăng nhập."); }
}
function tien(n) {
    return (Number(n) || 0).toLocaleString("vi-VN") + "đ";
}
function hangHoiVien(diem) {
    if (diem >= 1000) return "Vàng";
    if (diem >= 300) return "Bạc";
    return "Thành viên";
}
function hienThiHoiVien(tk) {
    var khach = document.getElementById("khuKhach");
    var hoiVien = document.getElementById("khuHoiVien");
    if (khach) khach.style.display = "none";
    if (hoiVien) hoiVien.style.display = "block";
    var tenEl = document.getElementById("tenHoiVien");
    if (tenEl) tenEl.innerText = tk.ten;
    var badges = document.querySelectorAll("#khuHoiVien .badge");
    if (badges[0]) badges[0].innerHTML = "<small>Điểm tích lũy</small>" + (tk.diem || 0).toLocaleString("vi-VN");
    if (badges[1]) badges[1].innerHTML = "<small>Hạng hội viên</small>" + hangHoiVien(tk.diem || 0);
    var body = document.getElementById("lichSuMuaHang");
    if (body) {
        body.innerHTML = "";
        var lichSu = Array.isArray(tk.lichSu) ? tk.lichSu.slice().reverse() : [];
        if (!lichSu.length) {
            body.innerHTML = '<tr><td colspan="4" class="lich-su-rong">Bạn chưa có đơn hàng nào. Hãy mua sắm để bắt đầu tích điểm nhé!</td></tr>';
        } else {
            lichSu.forEach(function (don) {
                var tr = document.createElement("tr");
                [new Date(don.ngay).toLocaleString("vi-VN"), don.maDon, tien(don.tongTien), "+" + (don.diemNhan || 0) + " điểm"]
                    .forEach(function (text) {
                        var td = document.createElement("td");
                        td.textContent = text;
                        tr.appendChild(td);
                    });
                body.appendChild(tr);
            });
        }
    }
}
function dangXuat() {
    localStorage.removeItem(KHOA_DANG_NHAP);
    var hoiVien = document.getElementById("khuHoiVien");
    var khach = document.getElementById("khuKhach");
    if (hoiVien) hoiVien.style.display = "none";
    if (khach) khach.style.display = "block";
    baoLoi(""); baoThanhCong("Bạn đã đăng xuất.");
}
// Gọi hàm này sau khi đơn hàng được xác nhận thành công.
// total là tổng tiền hàng thực trả, không bao gồm đơn chưa xác nhận.
function ghiNhanDonHangMiniMart(total, items) {
    var tenDangNhap = localStorage.getItem(KHOA_DANG_NHAP);
    if (!tenDangNhap) return { ok: false, message: "Khách chưa đăng nhập hội viên." };
    total = Math.max(0, Math.floor(Number(total) || 0));
    if (total <= 0) return { ok: false, message: "Tổng đơn hàng không hợp lệ." };
    var ds = docDanhSachTaiKhoan();
    var tk = ds.find(function (x) {
        return x.ten.toLocaleLowerCase("vi") === tenDangNhap.toLocaleLowerCase("vi");
    });
    if (!tk) return { ok: false, message: "Không tìm thấy tài khoản hội viên." };
    var diem = Math.floor(total / TY_LE_DIEM);
    tk.diem = (Number(tk.diem) || 0) + diem;
    tk.tongChiTieu = (Number(tk.tongChiTieu) || 0) + total;
    tk.lichSu = Array.isArray(tk.lichSu) ? tk.lichSu : [];
    var maDon = "MM" + Date.now().toString().slice(-8);
    tk.lichSu.push({
        maDon: maDon,
        ngay: new Date().toISOString(),
        tongTien: total,
        diemNhan: diem,
        sanPham: Array.isArray(items) ? items : []
    });
    luuDanhSachTaiKhoan(ds);
    if (document.getElementById("khuHoiVien")?.style.display !== "none") hienThiHoiVien(tk);
    return { ok: true, maDon: maDon, diemNhan: diem, tongDiem: tk.diem };
}
document.addEventListener("DOMContentLoaded", function () {
    var tk = layTaiKhoanDangNhap();
    if (tk) hienThiHoiVien(tk);
});
