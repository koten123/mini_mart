/* Trang chi tiết: hiển thị theo mã id trên URL và thêm đúng sản phẩm vào giỏ. */
(function () {
  const params = new URLSearchParams(window.location.search);
  const maSP = params.get("id") || "sua-tuoi";
  const sp = DANH_SACH_SAN_PHAM[maSP] || DANH_SACH_SAN_PHAM["sua-tuoi"];
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
    const quantity = Number(document.getElementById("sl").textContent);
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem("minimart_cart") || "[]"); } catch (e) { cart = []; }
    if (!Array.isArray(cart)) cart = [];
    const item = cart.find(x => x.id === sp.id);
    if (item) item.quantity = Math.min(99, Number(item.quantity || 0) + quantity);
    else cart.push({id:sp.id, name:sp.name, price:sp.price, image:sp.image, quantity:quantity});
    localStorage.setItem("minimart_cart", JSON.stringify(cart));
    document.getElementById("thongbao").textContent = "Đã thêm " + quantity + " × " + sp.name + " vào giỏ hàng.";
  };
})();