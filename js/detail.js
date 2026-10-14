/* Trang chi tiết: hiển thị đúng sản phẩm theo ?id= trên URL; chỉ thêm giỏ khi đã đăng nhập. */

// Dữ liệu 12 sản phẩm. Khóa trùng với ?id= trong products.html và index.html.
const DANH_SACH_SAN_PHAM = {
  "sua-tuoi": {id: "sua-tuoi", name: "Sữa tươi 1L", price: 25000, image: "images/sua-tuoi-1l.png", category: "Sữa", description: "Sữa tươi tiệt trùng nguyên chất, không đường.", extra: "Dung tích 1 lít. Bảo quản nơi khô mát, sau khi mở nên để tủ lạnh và dùng trong 3 ngày."},
  "sua-chua-uong": {id: "sua-chua-uong", name: "Sữa chua uống", price: 8000, image: "images/sua-chua-uong.png", category: "Sữa", description: "Sữa chua uống vị tự nhiên, thơm mát, dễ tiêu hóa.", extra: "Chai 100ml. Bảo quản lạnh 2–6°C."},
  "pho-mai-lat": {id: "pho-mai-lat", name: "Phô mai lát", price: 38000, image: "images/pho-mai-lat.png", category: "Sữa", description: "Phô mai lát béo mịn, dùng kèm bánh mì hoặc sandwich.", extra: "Hộp 10 lát. Bảo quản ngăn mát tủ lạnh."},
  "banh-quy-bo": {id: "banh-quy-bo", name: "Bánh quy bơ", price: 32000, image: "images/banh-quy-bo.png", category: "Bánh", description: "Bánh quy bơ giòn thơm, hợp ăn nhẹ hoặc dùng với trà.", extra: "Hộp 200g. Đóng kín sau khi mở để giữ độ giòn."},
  "banh-sandwich": {id: "banh-sandwich", name: "Bánh mì sandwich", price: 15000, image: "images/banh-sandwich.png", category: "Bánh", description: "Bánh mì sandwich mềm, phù hợp bữa sáng nhanh.", extra: "Gói 300g. Dùng trong 3 ngày kể từ ngày sản xuất."},
  "nuoc-suoi-500ml": {id: "nuoc-suoi-500ml", name: "Nước suối 500ml", price: 6000, image: "images/nuoc_suoi_500ml.png", category: "Nước uống", description: "Nước suối tinh khiết đóng chai tiện mang theo.", extra: "Chai 500ml. Tránh ánh nắng trực tiếp."},
  "nuoc-cam-ep": {id: "nuoc-cam-ep", name: "Nước cam ép", price: 18000, image: "images/nuoc-cam-ep.png", category: "Nước uống", description: "Nước cam ép thơm vị cam tươi, giàu vitamin C.", extra: "Chai 330ml. Lắc đều trước khi uống, bảo quản lạnh."},
  "nuoc-ngot-lon": {id: "nuoc-ngot-lon", name: "Nước ngọt lon", price: 12000, image: "images/nuoc-ngot-lon.png", category: "Nước uống", description: "Nước ngọt có ga, uống lạnh ngon hơn.", extra: "Lon 330ml. Không để nơi nhiệt độ cao."},
  "rau-cai-xanh": {id: "rau-cai-xanh", name: "Rau cải xanh", price: 12000, image: "images/rau-cai-xanh.png", category: "Rau củ quả", description: "Rau cải xanh tươi, phù hợp nấu canh hoặc xào.", extra: "Bó khoảng 300g. Bảo quản ngăn mát, dùng trong 2 ngày."},
  "ca-chua-500g": {id: "ca-chua-500g", name: "Cà chua 500g", price: 20000, image: "images/ca-chua-500g.png", category: "Rau củ quả", description: "Cà chua chín đỏ, vị ngọt nhẹ, dùng nấu hoặc ăn sống.", extra: "Khay 500g. Rửa sạch trước khi dùng."},
  "tao-do-1kg": {id: "tao-do-1kg", name: "Táo đỏ 1kg", price: 45000, image: "images/tao-do-1kg.png", category: "Rau củ quả", description: "Táo đỏ giòn ngọt, nhiều nước.", extra: "Túi 1kg (khoảng 5–6 quả). Bảo quản ngăn mát."},
  "chuoi-1kg": {id: "chuoi-1kg", name: "Chuối 1kg", price: 25000, image: "images/chuoi-1kg.png", category: "Rau củ quả", description: "Chuối chín tự nhiên, ngọt thơm, giàu năng lượng.", extra: "Khoảng 1kg mỗi nải nhỏ. Để nơi thoáng mát."}
};

(function () {
  const maSP = new URLSearchParams(window.location.search).get("id");
  const sp = DANH_SACH_SAN_PHAM[maSP];

  // Không có id hoặc id sai: báo không tìm thấy, không tự chọn sản phẩm khác.
  if (!sp) {
    document.title = "Không tìm thấy sản phẩm – MiniMart";
    document.querySelector(".detail").innerHTML =
      '<p>Không tìm thấy sản phẩm. <a href="products.html">Chọn sản phẩm</a></p>';
    document.querySelector(".more").style.display = "none";
    return;
  }

  document.title = sp.name + " – MiniMart";
  document.getElementById("anhSP").src = sp.image;
  document.getElementById("anhSP").alt = sp.name;
  document.getElementById("tenSP").textContent = sp.name;
  document.getElementById("giaSP").textContent = sp.price.toLocaleString("vi-VN") + "đ";
  document.getElementById("moTaSP").textContent = sp.description;
  document.getElementById("danhMucSP").textContent = sp.category;
  document.getElementById("thongTinThem").textContent = sp.extra;

  window.doiSL = function (n) {
    const el = document.getElementById("sl");
    el.textContent = Math.max(1, Math.min(10, Number(el.textContent) + n));
  };

  window.themGio = function () {
    const tb = document.getElementById("thongbao");
    if (!localStorage.getItem("minimart_user")) {
      tb.className = "err";
      tb.innerHTML = 'Vui lòng <a href="member.html">đăng nhập</a> để thêm vào giỏ hàng.';
      return;
    }
    const quantity = Number(document.getElementById("sl").textContent);
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("minimart_cart") || "[]"); } catch (e) { cart = []; }
    if (!Array.isArray(cart)) cart = [];
    const item = cart.find(x => x.id === sp.id);
    if (item) item.quantity = Math.min(99, Number(item.quantity || 0) + quantity);
    else cart.push({ id: sp.id, name: sp.name, price: sp.price, image: sp.image, quantity: quantity });
    localStorage.setItem("minimart_cart", JSON.stringify(cart));
    tb.className = "ok";
    tb.textContent = "Đã thêm " + quantity + " × " + sp.name + " vào giỏ hàng.";
  };
})();