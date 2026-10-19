// ===== home.js – TV1: Trang chủ =====
// Bấm nút ☰ để mở/đóng menu trên điện thoại
function doiMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.className = "nav open";
  } else {
    menu.className = "nav";
  }
}

// Link "Xem chi tiết" ở sản phẩm nổi bật gửi tên sản phẩm sang trang chi tiết (không cần sửa index.html)
var cacThe = document.querySelectorAll(".luoi-sp .card");
for (var i = 0; i < cacThe.length; i++) {
  var ten = cacThe[i].getElementsByClassName("card-ten")[0].textContent.trim();
  cacThe[i].getElementsByTagName("a")[0].href = "product-detail.html?ten=" + encodeURIComponent(ten);
}