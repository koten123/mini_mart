// Lọc sản phẩm theo danh mục và từ khóa, giữ nguyên các thẻ sản phẩm trong products.html.
var danhMuc = "tatca";

function chonDanhMuc(loai, nut) {
    danhMuc = loai || "tatca";
    var nuts = document.querySelectorAll(".filters .btn");
    for (var i = 0; i < nuts.length; i++) nuts[i].classList.remove("active");
    if (nut) nut.classList.add("active");
    loc();
}

function loc() {
    var oTim = document.getElementById("timkiem");
    var tu = oTim ? oTim.value.trim().toLocaleLowerCase("vi") : "";
    var cacThe = document.querySelectorAll(".product-grid .the");
    var dem = 0;
    for (var i = 0; i < cacThe.length; i++) {
        var the = cacThe[i];
        var dungLoai = danhMuc === "tatca" || the.dataset.category === danhMuc;
        var tenEl = the.querySelector("b");
        var ten = tenEl ? tenEl.textContent.toLocaleLowerCase("vi") : "";
        var dungTen = ten.includes(tu);
        var hien = dungLoai && dungTen;
        the.style.display = hien ? "" : "none";
        if (hien) dem++;
    }
    var khongThay = document.getElementById("khongthay");
    if (khongThay) khongThay.style.display = dem === 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    var thamSo = new URLSearchParams(window.location.search);
    var tuKhoa = thamSo.get("q");
    var oTim = document.getElementById("timkiem");
    if (tuKhoa && oTim) oTim.value = tuKhoa;
    loc();
});
