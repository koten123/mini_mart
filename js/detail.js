
var danhSachSP = {
    "sua-tuoi": {
        ten: "Sữa tươi tiệt trùng 1L",
        gia: 25000,
        anh: "https://images.pexels.com/photos/14127931/pexels-photo-14127931.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Sữa tươi nguyên chất, ít đường, hộp 1 lít. Dùng ngon nhất khi uống lạnh.",
        thongTin: "Xuất xứ: Việt Nam. Bảo quản nơi khô mát; sau khi mở nên dùng trong 3 ngày."
    },
    "sua-chua-uong": {
        ten: "Sữa chua uống",
        gia: 8000,
        anh: "https://images.pexels.com/photos/4958139/pexels-photo-4958139.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Sữa chua uống thơm ngon, tiện lợi cho bữa phụ.",
        thongTin: "Bảo quản lạnh. Kiểm tra hạn sử dụng trên bao bì."
    },
    "pho-mai": {
        ten: "Phô mai lát",
        gia: 38000,
        anh: "https://images.pexels.com/photos/4109958/pexels-photo-4109958.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Phô mai lát tiện lợi cho bánh mì và các món ăn.",
        thongTin: "Bảo quản lạnh theo hướng dẫn trên bao bì."
    },
    "banh-quy": {
        ten: "Bánh quy bơ",
        gia: 32000,
        anh: "https://images.pexels.com/photos/5848188/pexels-photo-5848188.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Bánh quy bơ thơm ngon, phù hợp dùng cùng trà hoặc sữa.",
        thongTin: "Bảo quản nơi khô ráo, kín gió."
    },
    "banh-sandwich": {
        ten: "Bánh mì sandwich",
        gia: 15000,
        anh: "https://images.pexels.com/photos/8599585/pexels-photo-8599585.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Bánh mì sandwich mềm, tiện lợi cho bữa sáng.",
        thongTin: "Bảo quản kín và sử dụng theo hạn dùng trên bao bì."
    },
    "nuoc-suoi": {
        ten: "Nước suối 500ml",
        gia: 6000,
        anh: "https://images.pexels.com/photos/31012799/pexels-photo-31012799.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Nước uống đóng chai nhỏ gọn, tiện mang theo.",
        thongTin: "Bảo quản nơi sạch sẽ, tránh ánh nắng trực tiếp."
    },
    "nuoc-cam": {
        ten: "Nước cam ép",
        gia: 18000,
        anh: "https://images.pexels.com/photos/6412582/pexels-photo-6412582.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Nước cam ép có vị thơm ngon, phù hợp dùng lạnh.",
        thongTin: "Bảo quản theo hướng dẫn trên bao bì."
    },
    "nuoc-ngot": {
        ten: "Nước ngọt lon",
        gia: 12000,
        anh: "https://images.pexels.com/photos/17650220/pexels-photo-17650220.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Nước ngọt đóng lon tiện lợi, ngon hơn khi uống lạnh.",
        thongTin: "Bảo quản nơi khô mát, tránh nhiệt độ cao."
    },
    "rau-cai": {
        ten: "Rau cải xanh",
        gia: 12000,
        anh: "https://images.pexels.com/photos/7879834/pexels-photo-7879834.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Rau cải xanh tươi, phù hợp cho các bữa ăn gia đình.",
        thongTin: "Bảo quản trong ngăn mát tủ lạnh và rửa sạch trước khi dùng."
    },
    "ca-chua": {
        ten: "Cà chua 500g",
        gia: 20000,
        anh: "https://images.pexels.com/photos/38444066/pexels-photo-38444066.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Cà chua tươi dùng cho món xào, canh hoặc salad.",
        thongTin: "Bảo quản nơi thoáng mát hoặc trong ngăn mát."
    },
    "tao-do": {
        ten: "Táo đỏ 1kg",
        gia: 45000,
        anh: "https://images.pexels.com/photos/36062583/pexels-photo-36062583.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Táo đỏ thích hợp dùng trực tiếp hoặc làm món tráng miệng.",
        thongTin: "Rửa sạch trước khi sử dụng."
    },
    "chuoi": {
        ten: "Chuối 1kg",
        gia: 25000,
        anh: "https://images.pexels.com/photos/4114143/pexels-photo-4114143.jpeg?auto=compress&cs=tinysrgb&w=1000",
        moTa: "Chuối chín thơm ngon, phù hợp cho bữa phụ.",
        thongTin: "Bảo quản nơi thoáng mát."
    }
};

function tienSP(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

var sanPhamDangXem = null;

document.addEventListener("DOMContentLoaded", function () {
    var thamSo = new URLSearchParams(window.location.search);
    var maSP = thamSo.get("id") || "sua-tuoi";

    sanPhamDangXem = danhSachSP[maSP];

    if (!sanPhamDangXem) {
        document.getElementById("tenSP").innerText =
            "Không tìm thấy sản phẩm";
        document.getElementById("giaSP").innerText = "";
        document.getElementById("moTaSP").innerText =
            "Vui lòng quay lại danh sách và chọn sản phẩm khác.";
        document.getElementById("thongTinSP").innerText = "";
        document.querySelector(".qty").style.display = "none";
        document.querySelector(".detail .btn-green").style.display = "none";
        return;
    }

    document.title = sanPhamDangXem.ten + " – MiniMart";
    document.getElementById("tenSP").innerText = sanPhamDangXem.ten;
    document.getElementById("giaSP").innerText = tienSP(sanPhamDangXem.gia);
    document.getElementById("anhSP").src = sanPhamDangXem.anh;
    document.getElementById("anhSP").alt = sanPhamDangXem.ten;
    document.getElementById("moTaSP").innerText = sanPhamDangXem.moTa;
    document.getElementById("thongTinSP").innerText =
        sanPhamDangXem.thongTin;
});

function doiSL(n) {
    var phanTuSL = document.getElementById("sl");
    var so = Number(phanTuSL.innerText) + n;

    if (so < 1) so = 1;
    if (so > 10) so = 10;

    phanTuSL.innerText = so;
}

function themGio() {
    if (!sanPhamDangXem) return;

    document.getElementById("thongbao").innerText =
        "Đã chọn " + sanPhamDangXem.ten +
        " (chức năng thêm giỏ cần được kết nối với js/cart.js).";
}
