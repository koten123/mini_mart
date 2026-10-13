function doiMenu() {
    var menu = document.getElementById("menu");
    var nut = document.querySelector(".burger");
    var dangMo = menu.classList.toggle("open");
    if (nut) nut.setAttribute("aria-expanded", dangMo ? "true" : "false");
}
