// ===== member.js – TV5: Hội viên & Ưu đãi =====

// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// Số điện thoại hợp lệ: 10 chữ số, bắt đầu bằng 0
function sdtHopLe(sdt) {
  return /^0\d{9}$/.test(sdt);
}

// ----- Đăng ký -----
function dangKy() {
  var ten = document.getElementById("dkTen").value.trim();
  var sdt = document.getElementById("dkSdt").value.trim();
  var matKhau = document.getElementById("dkMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDkTen").innerText = "";
  document.getElementById("loiDkSdt").innerText = "";
  document.getElementById("loiDkMatKhau").innerText = "";
  document.getElementById("dkThanhCong").style.display = "none";

  if (ten === "") {
    document.getElementById("loiDkTen").innerText = "Vui lòng nhập họ tên";
    hopLe = false;
  }
  if (sdt === "") {
    document.getElementById("loiDkSdt").innerText = "Vui lòng nhập số điện thoại";
    hopLe = false;
  } else if (!sdtHopLe(sdt)) {
    document.getElementById("loiDkSdt").innerText = "SĐT phải gồm 10 chữ số và bắt đầu bằng 0";
    hopLe = false;
  }
  if (matKhau === "") {
    document.getElementById("loiDkMatKhau").innerText = "Vui lòng nhập mật khẩu";
    hopLe = false;
  } else if (matKhau.length < 6) {
    document.getElementById("loiDkMatKhau").innerText = "Mật khẩu phải có ít nhất 6 ký tự";
    hopLe = false;
  }

  if (hopLe) {
    var tb = document.getElementById("dkThanhCong");
    var kho = docKho();
    taoTaiKhoan(kho, sdt, ten);
    kho[sdt].ten = ten;
    luuKho(kho);
    tb.innerText = "✔ Đăng ký thành công! Chào mừng " + ten + ", hãy đăng nhập để vào khu hội viên.";
    tb.style.display = "block";
  }
}

// ----- Đăng nhập -----
function dangNhap() {
  var sdt = document.getElementById("dnSdt").value.trim();
  var matKhau = document.getElementById("dnMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDnSdt").innerText = "";
  document.getElementById("loiDnMatKhau").innerText = "";

  if (sdt === "") {
    document.getElementById("loiDnSdt").innerText = "Vui lòng nhập số điện thoại";
    hopLe = false;
  } else if (!sdtHopLe(sdt)) {
    document.getElementById("loiDnSdt").innerText = "SĐT phải gồm 10 chữ số và bắt đầu bằng 0";
    hopLe = false;
  }
  if (matKhau === "") {
    document.getElementById("loiDnMatKhau").innerText = "Vui lòng nhập mật khẩu";
    hopLe = false;
  }

  // Hợp lệ -> nhớ tài khoản đang đăng nhập rồi sang trang hội viên
  // shortcut: không kiểm tra mật khẩu (bản mô phỏng lưu localStorage), nâng cấp khi có backend.
  if (hopLe) {
    var kho = docKho();
    taoTaiKhoan(kho, sdt, sdt);
    luuKho(kho);
    try { localStorage.setItem("hoiVienHienTai", sdt); } catch (e) {}
    window.location.href = "member.html";
  }
}

// ----- Đăng xuất: quên tài khoản hiện tại, quay lại khu khách -----
function dangXuat() {
  try { localStorage.removeItem("hoiVienHienTai"); } catch (e) {}
  window.location.reload(); // tải lại để header cũng quay về Đăng nhập / Đăng ký
}

// ----- Dữ liệu hội viên (lưu trong trình duyệt) -----
// hoiVien = { "số điện thoại": { ten, tu: "MM/YYYY", donHang: [ { ma, ngay, soMon, tong, diem } ] } }
function docKho() {
  try {
    return JSON.parse(localStorage.getItem("hoiVien")) || {};
  } catch (e) {
    return {};
  }
}
function luuKho(kho) {
  try {
    localStorage.setItem("hoiVien", JSON.stringify(kho));
  } catch (e) {}
}
// Tài khoản mới có lịch sử trống; đã có thì giữ nguyên lịch sử
function taoTaiKhoan(kho, sdt, ten) {
  if (!kho[sdt]) {
    var d = new Date();
    kho[sdt] = { ten: ten, tu: ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(), donHang: [] };
  }
}

function dinhDang(so) {
  return so.toLocaleString("vi-VN");
}

// ----- Trang hội viên: hiện khu hội viên nếu đã đăng nhập, ngược lại hiện khu khách -----
function hienHoiVien() {
  var khuHV = document.getElementById("khuHoiVien");
  if (!khuHV) { return; } // trang đăng nhập / đăng ký không có khu này

  var sdt = null;
  try { sdt = localStorage.getItem("hoiVienHienTai"); } catch (e) {}
  var tk = sdt ? docKho()[sdt] : null;

  document.getElementById("khuKhach").style.display = tk ? "none" : "block";
  khuHV.style.display = tk ? "block" : "none";
  if (!tk) { return; }

  var diem = 0;
  var html = "";
  for (var i = tk.donHang.length - 1; i >= 0; i--) { // đơn mới nhất lên đầu
    var d = tk.donHang[i];
    diem = diem + d.diem;
    html += "<tr><td>" + d.ma + "</td><td>" + d.ngay + "</td><td>" + d.soMon + "</td><td>" + dinhDang(d.tong) + "đ</td><td>+" + d.diem + "</td></tr>";
  }
  if (html === "") {
    html = '<tr><td colspan="5">Chưa có đơn hàng nào</td></tr>';
  }

  // Hạng theo điểm: Bạc từ 1.000, Vàng từ 2.000
  var hang = "Thành viên", lop = "badge-tv", phu = "Còn " + dinhDang(1000 - diem) + " điểm nữa lên hạng Bạc";
  if (diem >= 2000) {
    hang = "Vàng"; lop = "badge-vang"; phu = "Bạn đang ở hạng cao nhất";
  } else if (diem >= 1000) {
    hang = "Bạc"; lop = "badge-bac"; phu = "Còn " + dinhDang(2000 - diem) + " điểm nữa lên hạng Vàng";
  }

  document.getElementById("tenHV").innerText = tk.ten;
  document.getElementById("diemHV").innerText = dinhDang(diem);
  document.getElementById("hangHV").innerText = hang;
  document.getElementById("hangHV").className = "badge " + lop;
  document.getElementById("hangPhu").innerText = phu;
  document.getElementById("tuHV").innerText = tk.tu;
  document.getElementById("soDonHV").innerText = "Đã mua " + tk.donHang.length + " đơn hàng";
  document.getElementById("thanLichSu").innerHTML = html;
}

hienHoiVien();