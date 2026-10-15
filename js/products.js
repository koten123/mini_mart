var danhMuc = "tatca";

function chonDanhMuc(loai, nut) {
    danhMuc = loai;
    var nuts = document.querySelectorAll(".filters .btn");
    for (var i = 0; i < nuts.length; i++) nuts[i].classList.remove("active");
    nut.classList.add("active");
    loc();
}

// Lọc đồng thời theo danh mục và tên sản phẩm.
function loc() {
    var oTim = document.getElementById("timkiem");
    var tu = oTim.value.trim().toLocaleLowerCase("vi");
    var cacThe = document.getElementsByClassName("the");
    var dem = 0;
    for (var i = 0; i < cacThe.length; i++) {
        var dungLoai = danhMuc === "tatca" || cacThe[i].dataset.category === danhMuc;
        var ten = cacThe[i].querySelector("b").innerText.toLocaleLowerCase("vi");
        var dungTen = ten.includes(tu);
        if (dungLoai && dungTen) {
            cacThe[i].style.display = "";
            dem++;
        } else {
            cacThe[i].style.display = "none";
        }
    }
    document.getElementById("khongthay").style.display = dem === 0 ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
    var thamSo = new URLSearchParams(window.location.search);
    var tuKhoa = thamSo.get("q");
    if (tuKhoa) document.getElementById("timkiem").value = tuKhoa;
    // ?loai=sua... từ trang chủ: bấm sẵn nút danh mục tương ứng (so khớp chuỗi, không dùng làm selector)
    var loai = thamSo.get("loai");
    var nuts = document.querySelectorAll(".filters .btn");
    for (var i = 0; i < nuts.length; i++) {
        if (loai && nuts[i].getAttribute("onclick").indexOf("'" + loai + "'") !== -1) {
            chonDanhMuc(loai, nuts[i]);
            break;
        }
    }
    loc();
});