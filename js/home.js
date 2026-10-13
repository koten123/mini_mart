function doiMenu() {
    document.getElementById("menu").classList.toggle("open");
}

// ----- đăng nhập và giỏ hàng (lưu trong trình duyệt, mỗi tài khoản một giỏ riêng) -----
function layNguoiDung() {
    try { return localStorage.getItem("minimart_user"); } catch (e) { return null; }
}

// Giỏ gắn với tên đã viết thường, nên "An" và "an" dùng chung một giỏ
function khoaGio() {
    return "minimart_gio_" + (layNguoiDung() || "").toLowerCase();
}

function docGio() {
    try { return JSON.parse(localStorage.getItem(khoaGio())) || []; } catch (e) { return []; }
}

function luuGio(gio) {
    try { localStorage.setItem(khoaGio(), JSON.stringify(gio)); } catch (e) {}
}

// Gắn tên, giá, ảnh của thẻ sản phẩm vào link "Xem chi tiết"
var cacThe = document.querySelectorAll(".card");
for (var i = 0; i < cacThe.length; i++) {
    var nutXem = cacThe[i].querySelector("a.btn");
    if (nutXem) {
        nutXem.href = "product-detail.html?ten=" + encodeURIComponent(cacThe[i].querySelector("b").innerText)
            + "&gia=" + encodeURIComponent(cacThe[i].querySelector(".price").innerText)
            + "&anh=" + encodeURIComponent(cacThe[i].querySelector("img").getAttribute("src"));
    }
}
