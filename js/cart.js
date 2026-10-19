// ===== cart.js – TV4: Giỏ hàng & đặt hàng =====
var PHI_GIAO = 15000; // phí giao hàng cố định

// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// ----- Đọc / ghi giỏ hàng (lưu trong trình duyệt) -----
function docGio() {
  try {
    return JSON.parse(localStorage.getItem("gioHang")) || [];
  } catch (e) {
    return [];
  }
}
function luuGio(gio) {
  try {
    localStorage.setItem("gioHang", JSON.stringify(gio));
  } catch (e) {}
}

// Đổi số 32000 -> "32.000đ"
function dinhDang(so) {
  return so.toLocaleString("vi-VN") + "đ";
}

// Vẽ lại bảng giỏ hàng từ dữ liệu đã lưu
function veGio() {
  var gio = docGio();
  var html = "";
  var tamTinh = 0;

  for (var i = 0; i < gio.length; i++) {
    var thanhTien = gio[i].gia * gio[i].sl; // thành tiền = giá × số lượng
    tamTinh = tamTinh + thanhTien;
    // Giỏ cũ có thể còn lưu emoji: chỉ dùng thẻ img khi là đường dẫn ảnh
    var duongDan = gio[i].hinh.replace(".svg", ".jpg"); // giỏ cũ có thể còn lưu đuôi .svg
    var hinhHtml = duongDan.indexOf("images/") === 0 ? '<img src="' + duongDan + '" alt="' + gio[i].ten + '">' : gio[i].hinh;
    html += '<tr class="dong">' +
      '<td><span class="hinh">' + hinhHtml + '</span> ' + gio[i].ten + '</td>' +
      '<td>' + dinhDang(gio[i].gia) + '</td>' +
      '<td>' +
        '<button class="nut-sl" onclick="doiSL(' + i + ', -1)">−</button> ' +
        '<span class="sl">' + gio[i].sl + '</span> ' +
        '<button class="nut-sl" onclick="doiSL(' + i + ', 1)">+</button>' +
      '</td>' +
      '<td class="thanhtien">' + dinhDang(thanhTien) + '</td>' +
      '<td><button class="nut-xoa" onclick="xoaDong(' + i + ')">Xóa</button></td>' +
      '</tr>';
  }
  document.getElementById("thanBang").innerHTML = html;

  // Giỏ trống: hiện thông báo, ẩn phần giỏ hàng
  if (gio.length === 0) {
    document.getElementById("gioTrong").style.display = "block";
    document.getElementById("noiDungGio").style.display = "none";
    return;
  }

  document.getElementById("gioTrong").style.display = "none";
  document.getElementById("noiDungGio").style.display = "block"; // layout dùng inline-block, không dùng grid
  document.getElementById("tamTinh").innerText = dinhDang(tamTinh);
  document.getElementById("phiGiao").innerText = dinhDang(PHI_GIAO);
  document.getElementById("tongTien").innerText = dinhDang(tamTinh + PHI_GIAO); // tổng = tạm tính + phí giao
}

// Bấm + / − ở dòng số i
function doiSL(i, n) {
  var gio = docGio();
  gio[i].sl = gio[i].sl + n;
  if (gio[i].sl < 1) { gio[i].sl = 1; }
  if (gio[i].sl > 10) { gio[i].sl = 10; }
  luuGio(gio);
  veGio();
}

// Bấm Xóa ở dòng số i
function xoaDong(i) {
  var gio = docGio();
  gio.splice(i, 1);
  luuGio(gio);
  veGio();
}

// Ghi đơn vào lịch sử của tài khoản đang đăng nhập; trả về true nếu đã ghi (khách chưa đăng nhập thì không ghi)
// Điểm: 1 điểm mỗi 10.000đ tiền hàng (không tính phí giao)
function ghiDonHang(gio) {
  try {
    var email = localStorage.getItem("hoiVienHienTai");
    var kho = JSON.parse(localStorage.getItem("hoiVien")) || {};
    if (!email || !kho[email]) { return false; }

    var tamTinh = 0;
    var soMon = 0;
    for (var i = 0; i < gio.length; i++) {
      tamTinh = tamTinh + gio[i].gia * gio[i].sl;
      soMon = soMon + gio[i].sl;
    }
    var d = new Date();
    kho[email].donHang.push({
      ma: "#MM" + String(d.getTime()).slice(-6),
      ngay: ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(),
      soMon: soMon,
      tong: tamTinh + PHI_GIAO,
      diem: Math.floor(tamTinh / 10000)
    });
    localStorage.setItem("hoiVien", JSON.stringify(kho));
    return true;
  } catch (e) {
    return false;
  }
}

// Bấm Đặt hàng: kiểm tra form
function datHang() {
  var ten = document.getElementById("ten").value.trim();
  var sdt = document.getElementById("sdt").value.trim();
  var diachi = document.getElementById("diachi").value.trim();
  var hopLe = true;

  document.getElementById("loiTen").innerText = "";
  document.getElementById("loiSdt").innerText = "";
  document.getElementById("loiDiachi").innerText = "";

  if (ten === "") {
    document.getElementById("loiTen").innerText = "Vui lòng nhập họ tên";
    hopLe = false;
  }

  if (sdt === "") {
    document.getElementById("loiSdt").innerText = "Vui lòng nhập số điện thoại";
    hopLe = false;
  } else if (sdt.length !== 10 || isNaN(Number(sdt)) || sdt.charAt(0) !== "0") {
    document.getElementById("loiSdt").innerText = "SĐT phải gồm 10 chữ số và bắt đầu bằng 0";
    hopLe = false;
  }

  if (diachi === "") {
    document.getElementById("loiDiachi").innerText = "Vui lòng nhập địa chỉ nhận hàng";
    hopLe = false;
  }

  // Hợp lệ -> xóa giỏ hàng, hiện thông báo thành công
  if (hopLe) {
    var daGhi = ghiDonHang(docGio());
    luuGio([]);
    document.getElementById("loiCamOn").innerText = "✔ Đặt hàng thành công! Cảm ơn " + ten + ", MiniMart sẽ giao hàng sớm nhất." +
      (daGhi ? " Đơn đã được ghi vào lịch sử hội viên." : " Đăng nhập hội viên để tích điểm cho đơn sau.");
    document.getElementById("noiDungGio").style.display = "none";
    document.getElementById("gioTrong").style.display = "none";
    document.getElementById("datXong").style.display = "block";
  }
}

// Vẽ giỏ ngay khi mở trang
veGio();
