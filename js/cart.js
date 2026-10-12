var PHI_SHIP = 15000;

function tien(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

function tinh() {
    var dong = document.querySelectorAll("#gio tbody tr");
    var tam = 0;

    for (var i = 0; i < dong.length; i++) {
        var sl = Number(dong[i].querySelector(".sl").innerText);
        var thanhTien = Number(dong[i].dataset.gia) * sl;

        dong[i].querySelector(".tt").innerText = tien(thanhTien);

        tam += thanhTien;
    }

    var ship = dong.length > 0 ? PHI_SHIP : 0;

    document.getElementById("tam").innerText = tien(tam);
    document.getElementById("ship").innerText = tien(ship);
    document.getElementById("tong").innerText = tien(tam + ship);

    document.getElementById("trong").style.display =
        dong.length === 0 ? "block" : "none";

    document.getElementById("gio").style.display =
        dong.length === 0 ? "none" : "table";

    document.getElementById("nutDat").disabled =
        dong.length === 0;
}

function doiSL(nut, n) {
    var o = nut.parentNode.querySelector(".sl");

    o.innerText = Math.min(
        10,
        Math.max(1, Number(o.innerText) + n)
    );

    tinh();
}

function xoa(nut) {
    nut.closest("tr").remove();

    tinh();
}

function datHang() {
    var ten = document.getElementById("ten").value.trim();
    var sdt = document.getElementById("sdt").value.trim();
    var dc = document.getElementById("diachi").value.trim();

    var loi = {
        ten: ten === "" ? "Vui lòng nhập họ tên" : "",

        sdt: /^\d{10}$/.test(sdt)
            ? ""
            : "Số điện thoại phải gồm đúng 10 chữ số",

        diachi: dc === "" ? "Vui lòng nhập địa chỉ" : ""
    };

    for (var k in loi) {
        document.getElementById("l_" + k).innerText = loi[k];
    }

    var hopLe = !loi.ten && !loi.sdt && !loi.diachi;

    document.getElementById("thanhcong").innerText =
        hopLe
            ? "Đặt hàng thành công! Chúng tôi sẽ gọi xác nhận sớm."
            : "";
}

tinh();