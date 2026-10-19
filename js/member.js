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

// Email hợp lệ (bản đơn giản): có chữ @ và có dấu chấm sau @
function emailHopLe(email) {
  var viTri = email.indexOf("@");
  return viTri > 0 && email.indexOf(".", viTri) > viTri + 1 && email.charAt(email.length - 1) !== ".";
}

// ----- Đăng ký -----
function dangKy() {
  var ten = document.getElementById("dkTen").value.trim();
  var email = document.getElementById("dkEmail").value.trim();
  var matKhau = document.getElementById("dkMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDkTen").innerText = "";
  document.getElementById("loiDkEmail").innerText = "";
  document.getElementById("loiDkMatKhau").innerText = "";
  document.getElementById("dkThanhCong").style.display = "none";

  if (ten === "") {
    document.getElementById("loiDkTen").innerText = "Vui lòng nhập họ tên";
    hopLe = false;
  }
  if (email === "") {
    document.getElementById("loiDkEmail").innerText = "Vui lòng nhập email";
    hopLe = false;
  } else if (!emailHopLe(email)) {
    document.getElementById("loiDkEmail").innerText = "Email không hợp lệ (thiếu @ hoặc tên miền)";
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
    var khoa = email.toLowerCase();
    taoTaiKhoan(kho, khoa, ten);
    kho[khoa].ten = ten;
    luuKho(kho);
    tb.innerText = "✔ Đăng ký thành công! Chào mừng " + ten + ", hãy đăng nhập để vào khu hội viên.";
    tb.style.display = "block";
  }
}

// ----- Đăng nhập -----
function dangNhap() {
  var email = document.getElementById("dnEmail").value.trim();
  var matKhau = document.getElementById("dnMatKhau").value;
  var hopLe = true;

  document.getElementById("loiDnEmail").innerText = "";
  document.getElementById("loiDnMatKhau").innerText = "";

  if (email === "") {
    document.getElementById("loiDnEmail").innerText = "Vui lòng nhập email";
    hopLe = false;
  } else if (!emailHopLe(email)) {
    document.getElementById("loiDnEmail").innerText = "Email không hợp lệ (thiếu @ hoặc tên miền)";
    hopLe = false;
  }
  if (matKhau === "") {
    document.getElementById("loiDnMatKhau").innerText = "Vui lòng nhập mật khẩu";
    hopLe = false;
  }

  // Hợp lệ -> nhớ tài khoản đang đăng nhập rồi sang trang hội viên
  // shortcut: không kiểm tra mật khẩu (bản mô phỏng lưu localStorage), nâng cấp khi có backend.
  if (hopLe) {
    var khoa = email.toLowerCase();
    var kho = docKho();
    taoTaiKhoan(kho, khoa, khoa.split("@")[0]);
    luuKho(kho);
    try { localStorage.setItem("hoiVienHienTai", khoa); } catch (e) {}
    window.location.href = "member.html";
  }
}

// ----- Đăng xuất: quên tài khoản hiện tại, quay lại khu khách -----
function dangXuat() {
  try { localStorage.removeItem("hoiVienHienTai"); } catch (e) {}
  hienHoiVien();
  window.scrollTo(0, 0);
}

// ----- Dữ liệu hội viên (lưu trong trình duyệt) -----
// hoiVien = { "email": { ten, tu: "MM/YYYY", donHang: [ { ma, ngay, soMon, tong, diem } ] } }
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
function taoTaiKhoan(kho, email, ten) {
  if (!kho[email]) {
    var d = new Date();
    kho[email] = { ten: ten, tu: ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(), donHang: [] };
  }
}

function dinhDang(so) {
  return so.toLocaleString("vi-VN");
}

// ----- Trang hội viên: hiện khu hội viên nếu đã đăng nhập, ngược lại hiện khu khách -----
function hienHoiVien() {
  var khuHV = document.getElementById("khuHoiVien");
  if (!khuHV) { return; } // trang đăng nhập / đăng ký không có khu này

  var email = null;
  try { email = localStorage.getItem("hoiVienHienTai"); } catch (e) {}
  var tk = email ? docKho()[email] : null;

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
  document.getElementById("emailHV").innerText = email;
  document.getElementById("diemHV").innerText = dinhDang(diem);
  document.getElementById("hangHV").innerText = hang;
  document.getElementById("hangHV").className = "badge " + lop;
  document.getElementById("hangPhu").innerText = phu;
  document.getElementById("tuHV").innerText = tk.tu;
  document.getElementById("soDonHV").innerText = "Đã mua " + tk.donHang.length + " đơn hàng";
  document.getElementById("thanLichSu").innerHTML = html;
}

hienHoiVien();
