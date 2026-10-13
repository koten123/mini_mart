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
const DANH_SACH_SAN_PHAM = {
  "sua-tuoi": {
    id: "sua-tuoi",
    name: "Sữa tươi 1L",
    price: 25000,
    image: "https://images.pexels.com/photos/14127931/pexels-photo-14127931.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Sữa tươi nguyên chất, ít đường, hộp 1 lít. Dùng ngon nhất khi uống lạnh.",
    category: "Sữa",
    extra: "Xuất xứ: Việt Nam. Bảo quản lạnh sau khi mở hộp."
  },
  "sua-chua-uong": {
    id: "sua-chua-uong",
    name: "Sữa chua uống",
    price: 8000,
    image: "https://images.pexels.com/photos/4958139/pexels-photo-4958139.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Sữa chua uống tiện lợi, thích hợp dùng hằng ngày.",
    category: "Sữa",
    extra: "Bảo quản theo hướng dẫn trên bao bì."
  },
  "pho-mai": {
    id: "pho-mai",
    name: "Phô mai lát",
    price: 38000,
    image: "https://images.pexels.com/photos/4109958/pexels-photo-4109958.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Phô mai lát thơm béo, phù hợp dùng với bánh mì và món ăn nhanh.",
    category: "Sữa",
    extra: "Bảo quản lạnh theo hướng dẫn trên bao bì."
  },
  "banh-quy": {
    id: "banh-quy",
    name: "Bánh quy bơ",
    price: 32000,
    image: "https://images.pexels.com/photos/5848188/pexels-photo-5848188.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Bánh quy bơ giòn thơm, phù hợp cho bữa ăn nhẹ.",
    category: "Bánh",
    extra: "Bảo quản nơi khô ráo, thoáng mát."
  },
  "banh-sandwich": {
    id: "banh-sandwich",
    name: "Bánh mì sandwich",
    price: 15000,
    image: "https://images.pexels.com/photos/8599585/pexels-photo-8599585.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Bánh mì sandwich mềm, tiện lợi cho bữa sáng.",
    category: "Bánh",
    extra: "Dùng ngon nhất khi còn tươi; xem hạn sử dụng trên bao bì."
  },
  "nuoc-suoi": {
    id: "nuoc-suoi",
    name: "Nước suối 500ml",
    price: 6000,
    image: "https://images.pexels.com/photos/31012799/pexels-photo-31012799.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Nước uống đóng chai 500ml, tiện mang theo khi di chuyển.",
    category: "Nước uống",
    extra: "Bảo quản nơi sạch sẽ, tránh ánh nắng trực tiếp."
  },
  "nuoc-cam": {
    id: "nuoc-cam",
    name: "Nước cam ép",
    price: 18000,
    image: "https://images.pexels.com/photos/6412582/pexels-photo-6412582.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Nước cam ép có vị chua ngọt dễ uống.",
    category: "Nước uống",
    extra: "Bảo quản lạnh nếu nhãn sản phẩm yêu cầu."
  },
  "nuoc-ngot": {
    id: "nuoc-ngot",
    name: "Nước ngọt lon",
    price: 12000,
    image: "https://images.pexels.com/photos/17650220/pexels-photo-17650220.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Nước giải khát có gas, dùng ngon hơn khi uống lạnh.",
    category: "Nước uống",
    extra: "Bảo quản nơi khô mát."
  },
  "rau-cai": {
    id: "rau-cai",
    name: "Rau cải xanh",
    price: 12000,
    image: "https://images.pexels.com/photos/7879834/pexels-photo-7879834.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Rau cải xanh tươi, phù hợp cho các món luộc và xào.",
    category: "Rau củ quả",
    extra: "Bảo quản mát và nên sử dụng sớm."
  },
  "ca-chua": {
    id: "ca-chua",
    name: "Cà chua 500g",
    price: 20000,
    image: "https://images.pexels.com/photos/38444066/pexels-photo-38444066.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Cà chua tươi dùng cho món salad, canh và sốt.",
    category: "Rau củ quả",
    extra: "Bảo quản nơi thoáng mát hoặc ngăn mát."
  },
  "tao-do": {
    id: "tao-do",
    name: "Táo đỏ 1kg",
    price: 45000,
    image: "https://images.pexels.com/photos/36062583/pexels-photo-36062583.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Táo đỏ giòn ngọt, thích hợp ăn trực tiếp hoặc làm món tráng miệng.",
    category: "Rau củ quả",
    extra: "Rửa sạch trước khi sử dụng."
  },
  "chuoi": {
    id: "chuoi",
    name: "Chuối 1kg",
    price: 25000,
    image: "https://images.pexels.com/photos/4114143/pexels-photo-4114143.jpeg?auto=compress&cs=tinysrgb&w=1000",
    description: "Chuối chín tự nhiên, tiện lợi cho bữa phụ.",
    category: "Rau củ quả",
    extra: "Bảo quản nơi thoáng mát."
  }
};