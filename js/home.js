function doiMenu() {
    var menu = document.getElementById("menu");
    var nut = document.querySelector(".burger");
    var dangMo = menu.classList.toggle("open");
    if (nut) nut.setAttribute("aria-expanded", dangMo ? "true" : "false");
}

// Đã đăng nhập hội viên thì không cần mời đăng ký nữa (khóa do member.js ghi).
var khoiMoiDangKy = document.querySelector(".promo");
if (khoiMoiDangKy && localStorage.getItem("minimart_user")) khoiMoiDangKy.style.display = "none";