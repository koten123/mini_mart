// Lấy tên, giá, ảnh của sản phẩm đã bấm (do home.js gắn vào link)
var tham = new URLSearchParams(location.search);
if (tham.get("ten")) {
    document.getElementById("tenSP").innerText = tham.get("ten");
    document.getElementById("giaSP").innerText = tham.get("gia");
    document.getElementById("anhSP").src = tham.get("anh");
    document.getElementById("anhSP").alt = tham.get("ten");
    document.title = tham.get("ten") + " – MiniMart";
}

function doiSL(n) {
    var so = Number(document.getElementById("sl").innerText) + n;
    if (so < 1) { so = 1; }
    if (so > 10) { so = 10; }
    document.getElementById("sl").innerText = so;
}

function themGio() {
    var tb = document.getElementById("thongbao");
    if (!layNguoiDung()) {
        tb.className = "err";
        tb.innerHTML = 'Bạn cần <a href="member.html">đăng nhập</a> để thêm vào giỏ hàng.';
        return;
    }
    var ten = document.getElementById("tenSP").innerText;
    var sl = Number(document.getElementById("sl").innerText);
    var gio = docGio();
    var cu = gio.find(function (sp) { return sp.ten === ten; });
    if (cu) {
        cu.sl = Math.min(10, cu.sl + sl);
    } else {
        gio.push({
            ten: ten,
            gia: Number(document.getElementById("giaSP").innerText.replace(/\D/g, "")),
            anh: document.getElementById("anhSP").getAttribute("src"),
            sl: sl
        });
    }
    luuGio(gio);
    tb.className = "ok";
    tb.innerText = "Đã thêm vào giỏ hàng";
}
