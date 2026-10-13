var danhMuc = "tatca";

function chonDanhMuc(loai, nut) {
    danhMuc = loai;
    var nuts = document.querySelectorAll(".filters .btn");
    for (var i = 0; i < nuts.length; i++) {
        nuts[i].classList.remove("active");
    }
    nut.classList.add("active");
    loc();
}

// Lọc đồng thời theo danh mục và chữ trong ô tìm kiếm
function loc() {
    var tu = document.getElementById("timkiem").value.toLowerCase();
    var cacThe = document.getElementsByClassName("the");
    var dem = 0;
    for (var i = 0; i < cacThe.length; i++) {
        var dungLoai = danhMuc === "tatca" || cacThe[i].dataset.category === danhMuc;
        var dungTen = cacThe[i].querySelector("b").innerText.toLowerCase().includes(tu);
        if (dungLoai && dungTen) {
            cacThe[i].style.display = "inline-block";
            dem++;
        } else {
            cacThe[i].style.display = "none";
        }
    }
    document.getElementById("khongthay").style.display = dem === 0 ? "block" : "none";
}
