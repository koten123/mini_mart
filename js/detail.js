// js/detail.js

let soLuongHienTai = 1;
let sanPhamHienTai = null;

document.addEventListener("DOMContentLoaded", function() {
  // 1. Lấy parameter id từ URL (ví dụ: product-detail.html?id=ca-chua)
  const urlParams = new URLSearchParams(window.location.search);
  const idSP = urlParams.get("id");

  // Tìm sản phẩm trong danhSachSanPham (đã được nạp từ data.js)
  if (typeof danhSachSanPham !== "undefined" && idSP) {
    sanPhamHienTai = danhSachSanPham.find(sp => sp.id === idSP);
  }

  // Nếu không tìm thấy, mặc định lấy sản phẩm đầu tiên (Sữa tươi)
  if (!sanPhamHienTai && typeof danhSachSanPham !== "undefined") {
    sanPhamHienTai = danhSachSanPham[0];
  }

  // 2. Render dữ liệu ra giao diện trang product-detail.html
  if (sanPhamHienTai) {
    document.title = sanPhamHienTai.ten + " – MiniMart";

    // Cập nhật đường dẫn Breadcrumb
    const duongDan = document.querySelector(".duong-dan");
    if (duongDan) {
      duongDan.innerHTML = `<a href="index.html">Trang chủ</a> › <a href="products.html">Sản phẩm</a> › ${sanPhamHienTai.ten}`;
    }

    // Cập nhật ảnh
    const anhLon = document.getElementById("anhLon");
    if (anhLon) {
      anhLon.src = sanPhamHienTai.anh;
      anhLon.alt = sanPhamHienTai.ten;
    }

    // Cập nhật tên, giá, mô tả
    const tenEl = document.querySelector(".cot-tin h1");
    if (tenEl) tenEl.innerText = sanPhamHienTai.ten;

    const giaEl = document.querySelector(".cot-tin .gia");
    if (giaEl) giaEl.innerText = sanPhamHienTai.gia;

    const moTaEl = document.querySelector(".cot-tin .mo-ta-ngan");
    if (moTaEl) moTaEl.innerText = sanPhamHienTai.moTa;

    // Cập nhật đoạn mô tả dài
    const moTaKhoi = document.querySelector(".khoi-mo-ta p");
    if (moTaKhoi) moTaKhoi.innerText = sanPhamHienTai.moTa;

    // Cập nhật Bảng thông tin thêm
    const bangTin = document.querySelector(".bang-tin");
    if (bangTin) {
      bangTin.innerHTML = `
        <tr><td>Thương hiệu</td><td>${sanPhamHienTai.thuongHieu || 'MiniMart'}</td></tr>
        <tr><td>Quy cách / Dung tích</td><td>${sanPhamHienTai.dungTich || 'Tiêu chuẩn'}</td></tr>
        <tr><td>Hạn sử dụng</td><td>${sanPhamHienTai.hanSuDung || 'Xem trên bao bì'}</td></tr>
        <tr><td>Bảo quản</td><td>${sanPhamHienTai.baoQuan || 'Khô ráo, thoáng mát'}</td></tr>
        <tr><td>Xuất xứ</td><td>${sanPhamHienTai.xuatXu || 'Việt Nam'}</td></tr>
      `;
    }
  }
});

// Hàm tăng/giảm số lượng ở trang chi tiết
function doiSL(delta) {
  soLuongHienTai += delta;
  if (soLuongHienTai < 1) soLuongHienTai = 1;
  if (soLuongHienTai > 10) soLuongHienTai = 10;
  
  const slEl = document.getElementById("sl");
  if (slEl) slEl.innerText = soLuongHienTai;
}

// Hàm thêm vào giỏ hàng từ trang chi tiết
function themGio() {
  if (!sanPhamHienTai) return;

  let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
  let item = gioHang.find(i => i.id === sanPhamHienTai.id);

  if (item) {
    item.soLuong += soLuongHienTai;
  } else {
    gioHang.push({
      id: sanPhamHienTai.id,
      ten: sanPhamHienTai.ten,
      gia: sanPhamHienTai.giaSo,
      giaText: sanPhamHienTai.gia,
      anh: sanPhamHienTai.anh,
      soLuong: soLuongHienTai
    });
  }

  localStorage.setItem("gioHang", JSON.stringify(gioHang));

  // Hiện toast thông báo
  const thongBao = document.getElementById("thongbao");
  if (thongBao) {
    thongBao.innerText = `Đã thêm ${soLuongHienTai} x "${sanPhamHienTai.ten}" vào giỏ hàng!`;
    thongBao.classList.add("hien");
    setTimeout(() => {
      thongBao.classList.remove("hien");
    }, 2500);
  }
}