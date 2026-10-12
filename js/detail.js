// Lấy tên, giá, ảnh của sản phẩm đã bấm (do home.js gắn vào link)
var tham = new URLSearchParams(location.search);
if (tham.get("ten")) {
    document.getElementById("tenSP").innerText = tham.get("ten");
    document.getElementById("giaSP").innerText = tham.get("gia");
    document.getElementById("anhSP").src = tham.get("anh");
    document.getElementById("anhSP").alt = tham.get("ten");
    document.title = tham.get("ten") + " – MiniMart";
}

var tenSP = new URLSearchParams(location.search).get("ten");
if (SAN_PHAM[tenSP]) {
    document.getElementById("tenSP").innerText = tenSP;
    document.getElementById("anhSP").innerText = SAN_PHAM[tenSP][0];
    document.getElementById("anhSP").setAttribute("aria-label", tenSP);
    document.getElementById("giaSP").innerText = SAN_PHAM[tenSP][1];
    document.getElementById("moTaSP").innerText = SAN_PHAM[tenSP][2];
    document.title = tenSP + " – MiniMart";
}
function doiSL(n) {
    var so = Number(document.getElementById("sl").innerText) + n;

    if (so < 1) {
        so = 1;
    }

    if (so > 10) {
        so = 10;
    }

    document.getElementById("sl").innerText = so;
}

function themGio() {
    document.getElementById("thongbao").innerText =
        "Đã thêm vào giỏ hàng";
}