// tên sản phẩm: [biểu tượng, giá, mô tả]
var SAN_PHAM = {
    "Sữa tươi 1L": ["🥛", "25.000đ", "Sữa tươi nguyên chất, ít đường, hộp 1 lít. Dùng ngon nhất khi uống lạnh."],
    "Sữa chua uống": ["🥣", "8.000đ", "Sữa chua uống men sống, vị dịu, tốt cho tiêu hóa."],
    "Phô mai lát": ["🧀", "38.000đ", "Phô mai lát béo mịn, dùng kẹp bánh mì hoặc ăn liền."],
    "Bánh quy bơ": ["🍪", "32.000đ", "Bánh quy bơ giòn thơm, hộp 200g."],
    "Bánh mì sandwich": ["🍞", "15.000đ", "Bánh mì sandwich mềm, nướng nhẹ ăn sáng rất hợp."],
    "Nước suối 500ml": ["💧", "6.000đ", "Nước suối tinh khiết, chai 500ml."],
    "Nước cam ép": ["🧃", "18.000đ", "Nước cam ép từ cam tươi, ít đường, hộp 330ml."],
    "Nước ngọt lon": ["🥤", "12.000đ", "Nước ngọt có ga, lon 330ml, ngon nhất khi uống lạnh."],
    "Rau cải xanh": ["🥬", "12.000đ", "Rau cải xanh tươi, dùng nấu canh hoặc xào."],
    "Cà chua 500g": ["🍅", "20.000đ", "Cà chua chín đỏ, túi 500g."],
    "Táo đỏ 1kg": ["🍎", "45.000đ", "Táo đỏ giòn ngọt, túi 1kg."],
    "Chuối 1kg": ["🍌", "25.000đ", "Chuối chín vàng, ngọt thơm, túi 1kg."]
};

var tenSP = new URLSearchParams(location.search).get("ten");
if (SAN_PHAM[tenSP]) {
    document.getElementById("tenSP").innerText = tenSP;
    document.getElementById("anhSP").innerText = SAN_PHAM[tenSP][0];
    document.getElementById("anhSP").setAttribute("aria-label", tenSP);
    document.getElementById("giaSP").innerText = SAN_PHAM[tenSP][1];
    document.getElementById("moTaSP").innerText = SAN_PHAM[tenSP][2];
    document.title = tenSP + " – MiniMart";
}
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