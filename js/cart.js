var PHI_SHIP = 15000;
var gio = layNguoiDung() ? docGio() : [];

function tien(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

function nut(chu, nhan, hanhDong) {
    var b = document.createElement("button");
    b.textContent = chu;
    b.setAttribute("aria-label", nhan);
    b.onclick = hanhDong;
    return b;
}

// Vẽ lại giỏ hàng từ biến gio (dữ liệu của tài khoản đang đăng nhập)
function ve() {
    var coHang = gio.length > 0;
    var trong = document.getElementById("trong");
    document.getElementById("noiDung").style.display = coHang ? "block" : "none";
    trong.style.display = coHang ? "none" : "block";
    trong.innerHTML = layNguoiDung()
        ? 'Giỏ hàng của bạn đang trống. <a href="products.html">Chọn sản phẩm</a>'
        : 'Bạn cần <a href="member.html">đăng nhập</a> để xem giỏ hàng.';

    var tbody = document.querySelector("#gio tbody");
    tbody.innerHTML = "";
    var tam = 0;
    gio.forEach(function (sp, i) {
        var tr = tbody.insertRow();
        var o1 = tr.insertCell();
        var img = document.createElement("img");
        img.className = "anh-nho";
        img.src = sp.anh;
        img.alt = "";
        o1.appendChild(img);
        o1.appendChild(document.createTextNode(sp.ten));
        tr.insertCell().textContent = tien(sp.gia);
        var o3 = tr.insertCell();
        o3.appendChild(nut("−", "Giảm", function () { doiSL(i, -1); }));
        var so = document.createElement("span");
        so.className = "sl";
        so.textContent = sp.sl;
        o3.appendChild(document.createTextNode(" "));
        o3.appendChild(so);
        o3.appendChild(document.createTextNode(" "));
        o3.appendChild(nut("+", "Tăng", function () { doiSL(i, 1); }));
        tr.insertCell().textContent = tien(sp.gia * sp.sl);
        tr.insertCell().appendChild(nut("Xóa", "Xóa " + sp.ten, function () { xoa(i); }));
        tam += sp.gia * sp.sl;
    });
    var ship = coHang ? PHI_SHIP : 0;
    document.getElementById("tam").innerText = tien(tam);
    document.getElementById("ship").innerText = tien(ship);
    document.getElementById("tong").innerText = tien(tam + ship);
}

function doiSL(i, n) {
    gio[i].sl = Math.min(10, Math.max(1, gio[i].sl + n));
    luuGio(gio);
    ve();
}

function xoa(i) {
    gio.splice(i, 1);
    luuGio(gio);
    ve();
}

function datHang() {
    var ten = document.getElementById("ten").value.trim();
    var sdt = document.getElementById("sdt").value.trim();
    var dc = document.getElementById("diachi").value.trim();
    var loi = {
        ten: ten === "" ? "Vui lòng nhập họ tên" : "",
        sdt: /^\d{10}$/.test(sdt) ? "" : "Số điện thoại phải gồm đúng 10 chữ số",
        diachi: dc === "" ? "Vui lòng nhập địa chỉ" : ""
    };
    for (var k in loi) {
        document.getElementById("l_" + k).innerText = loi[k];
    }
    if (loi.ten || loi.sdt || loi.diachi) {
        return;
    }
    gio = [];
    luuGio(gio);
    ve();
    document.getElementById("thanhcong").innerText = "Đặt hàng thành công! Chúng tôi sẽ gọi xác nhận sớm.";
}

ve();
