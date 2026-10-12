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