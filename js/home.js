function doiMenu() {
    var menu = document.getElementById("menu");
    var nut = document.querySelector(".burger");

    var dangMo = menu.classList.toggle("open");

    if (nut) {
        nut.setAttribute(
            "aria-expanded",
            dangMo ? "true" : "false"
        );
    }
}
var cacThe = document.querySelectorAll(".card");
for (var i = 0; i < cacThe.length; i++) {
    var nutXem = cacThe[i].querySelector("a.btn");
    if (nutXem) {
        nutXem.href = "product-detail.html?ten=" + encodeURIComponent(cacThe[i].querySelector("b").innerText);
    }
}