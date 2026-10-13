// Danh mục sản phẩm dùng chung cho trang chi tiết và giỏ hàng.
const DANH_SACH_SAN_PHAM = {
  "sua-tuoi": {
    "id": "sua-tuoi",
    "name": "Sữa tươi 1L",
    "price": 25000,
    "image": "https://images.pexels.com/photos/14127931/pexels-photo-14127931.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Sữa tươi nguyên chất, ít đường, dung tích 1 lít. Dùng ngon nhất khi uống lạnh.",
    "category": "sua",
    "emoji": "🥛"
  },
  "sua-chua-uong": {
    "id": "sua-chua-uong",
    "name": "Sữa chua uống",
    "price": 8000,
    "image": "https://images.pexels.com/photos/4958139/pexels-photo-4958139.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Sữa chua uống thơm ngon, tiện dùng cho bữa phụ. Bảo quản lạnh.",
    "category": "sua",
    "emoji": "🥛"
  },
  "pho-mai": {
    "id": "pho-mai",
    "name": "Phô mai lát",
    "price": 38000,
    "image": "https://images.pexels.com/photos/4109958/pexels-photo-4109958.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Phô mai lát béo thơm, phù hợp ăn kèm bánh mì và món ăn nhẹ.",
    "category": "sua",
    "emoji": "🧀"
  },
  "banh-quy": {
    "id": "banh-quy",
    "name": "Bánh quy bơ",
    "price": 32000,
    "image": "https://images.pexels.com/photos/5848188/pexels-photo-5848188.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Bánh quy bơ giòn thơm, thích hợp dùng cùng trà hoặc sữa.",
    "category": "banh",
    "emoji": "🍪"
  },
  "banh-sandwich": {
    "id": "banh-sandwich",
    "name": "Bánh mì sandwich",
    "price": 15000,
    "image": "https://images.pexels.com/photos/8599585/pexels-photo-8599585.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Bánh mì sandwich mềm, tiện cho bữa sáng và các món kẹp.",
    "category": "banh",
    "emoji": "🍞"
  },
  "nuoc-suoi": {
    "id": "nuoc-suoi",
    "name": "Nước suối 500ml",
    "price": 6000,
    "image": "https://images.pexels.com/photos/31012799/pexels-photo-31012799.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Nước uống đóng chai 500ml, tiện mang theo khi đi học hoặc đi làm.",
    "category": "nuoc",
    "emoji": "💧"
  },
  "nuoc-cam": {
    "id": "nuoc-cam",
    "name": "Nước cam ép",
    "price": 18000,
    "image": "https://images.pexels.com/photos/6412582/pexels-photo-6412582.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Nước cam ép có vị chua ngọt dễ uống, dùng ngon khi để lạnh.",
    "category": "nuoc",
    "emoji": "🧃"
  },
  "nuoc-ngot": {
    "id": "nuoc-ngot",
    "name": "Nước ngọt lon",
    "price": 12000,
    "image": "https://images.pexels.com/photos/17650220/pexels-photo-17650220.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Nước ngọt có ga đóng lon, dùng lạnh để tăng hương vị.",
    "category": "nuoc",
    "emoji": "🥤"
  },
  "rau-cai": {
    "id": "rau-cai",
    "name": "Rau cải xanh",
    "price": 12000,
    "image": "https://images.pexels.com/photos/7879834/pexels-photo-7879834.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Rau cải xanh tươi, phù hợp cho các món luộc, xào hoặc nấu canh.",
    "category": "rau",
    "emoji": "🥬"
  },
  "ca-chua": {
    "id": "ca-chua",
    "name": "Cà chua 500g",
    "price": 20000,
    "image": "https://images.pexels.com/photos/38444066/pexels-photo-38444066.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Cà chua tươi 500g, phù hợp làm salad, nấu canh và chế biến món ăn.",
    "category": "rau",
    "emoji": "🍅"
  },
  "tao-do": {
    "id": "tao-do",
    "name": "Táo đỏ 1kg",
    "price": 45000,
    "image": "https://images.pexels.com/photos/36062583/pexels-photo-36062583.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Táo đỏ giòn ngọt, phù hợp ăn trực tiếp hoặc dùng làm món tráng miệng.",
    "category": "rau",
    "emoji": "🍎"
  },
  "chuoi": {
    "id": "chuoi",
    "name": "Chuối 1kg",
    "price": 25000,
    "image": "https://images.pexels.com/photos/4114143/pexels-photo-4114143.jpeg?auto=compress&cs=tinysrgb&w=1000",
    "description": "Chuối chín tự nhiên, tiện dùng cho bữa phụ hoặc sinh tố.",
    "category": "rau",
    "emoji": "🍌"
  }
};
const KHOA_GIO_HANG = "minimart_cart_v1";
let sanPhamHienTai = null;

function dinhDangTien(so) { return Number(so).toLocaleString("vi-VN") + "đ"; }
function docGioHang() {
    try { const data = JSON.parse(localStorage.getItem(KHOA_GIO_HANG) || "[]"); return Array.isArray(data) ? data : []; }
    catch (e) { return []; }
}
function luuGioHang(gio) { localStorage.setItem(KHOA_GIO_HANG, JSON.stringify(gio)); }
function doiSL(n) {
    const el = document.getElementById("sl");
    if (!el) return;
    const hienTai = Number(el.textContent || 1);
    el.textContent = Math.min(10, Math.max(1, hienTai + n));
}
function hienThiSanPham() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // Không tự mặc định sang sữa khi đường dẫn thiếu mã sản phẩm.
    if (!id) {
        window.location.replace("products.html");
        return;
    }

    sanPhamHienTai = DANH_SACH_SAN_PHAM[id];
    if (!sanPhamHienTai) {
        const ten = document.getElementById("tenSP");
        const moTa = document.getElementById("moTaSP");
        const nutThem = document.querySelector(".btn-green");
        if (ten) ten.textContent = "Không tìm thấy sản phẩm";
        if (moTa) moTa.textContent = "Sản phẩm không tồn tại. Vui lòng quay lại danh sách sản phẩm.";
        if (nutThem) nutThem.disabled = true;
        return;
    }
    document.title = sanPhamHienTai.name + " – MiniMart";
    document.getElementById("tenSP").textContent = sanPhamHienTai.name;
    document.getElementById("giaSP").textContent = dinhDangTien(sanPhamHienTai.price);
    document.getElementById("moTaSP").textContent = sanPhamHienTai.description;
    const img = document.getElementById("anhSP");
    img.src = sanPhamHienTai.image;
    img.alt = sanPhamHienTai.name;
}
function themGio() {
    if (!sanPhamHienTai) return;
    const soLuong = Math.min(10, Math.max(1, Number(document.getElementById("sl").textContent || 1)));
    const gio = docGioHang();
    const dong = gio.find(item => item.id === sanPhamHienTai.id);
    if (dong) dong.quantity = Math.min(10, Number(dong.quantity || 0) + soLuong);
    else gio.push({ id: sanPhamHienTai.id, name: sanPhamHienTai.name, price: sanPhamHienTai.price, image: sanPhamHienTai.image, emoji: sanPhamHienTai.emoji, quantity: soLuong });
    try {
        luuGioHang(gio);
        const thongBao = document.getElementById("thongbao");
        if (thongBao) {
            thongBao.textContent = "Đã thêm " + sanPhamHienTai.name + " vào giỏ hàng.";
            thongBao.classList.add("cart-success");
        }
    } catch (e) {
        const thongBao = document.getElementById("thongbao");
        if (thongBao) thongBao.textContent = "Trình duyệt không cho phép lưu giỏ hàng. Hãy bật localStorage hoặc thử lại.";
    }
}
document.addEventListener("DOMContentLoaded", hienThiSanPham);
