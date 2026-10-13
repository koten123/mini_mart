/* Giỏ hàng dùng chung localStorage với trang chi tiết sản phẩm. */

var PHI_SHIP = 15000;

// Định dạng tiền Việt Nam.
function tien(n) {
    return Number(n).toLocaleString("vi-VN") + "đ";
}

// Đọc giỏ hàng từ localStorage.
function layGio() {
    try {
        var gio = JSON.parse(
            localStorage.getItem("minimart_cart") || "[]"
        );

        return Array.isArray(gio) ? gio : [];
    } catch (e) {
        return [];
    }
}

// Lưu giỏ hàng.
function luuGio(gio) {
    localStorage.setItem("minimart_cart", JSON.stringify(gio));
}

// Hiển thị danh sách sản phẩm trong giỏ.
function veGio() {
    var gio = layGio();
    var tbody = document.getElementById("cartBody");

    tbody.innerHTML = "";

    gio.forEach(function (sp) {
        var tr = document.createElement("tr");
        tr.dataset.id = sp.id;

        tr.innerHTML =
            '<td></td>' +
            '<td></td>' +
            '<td>' +
                '<button type="button" aria-label="Giảm số lượng">−</button> ' +
                '<span class="sl"></span> ' +
                '<button type="button" aria-label="Tăng số lượng">+</button>' +
            '</td>' +
            '<td class="tt"></td>' +
            '<td><button type="button" class="xoa-sp">Xóa</button></td>';

        tr.children[0].textContent = sp.name;
        tr.children[1].textContent = tien(sp.price);

        tr.querySelector(".sl").textContent =
            Math.max(1, Number(sp.quantity || 1));

        var buttons = tr.querySelectorAll("button");

        buttons[0].addEventListener("click", function () {
            doiSL(sp.id, -1);
        });

        buttons[1].addEventListener("click", function () {
            doiSL(sp.id, 1);
        });

        buttons[2].addEventListener("click", function () {
            xoa(sp.id);
        });

        tbody.appendChild(tr);
    });

    tinh();
}

// Tính tiền hàng, phí giao hàng và tổng tiền.
function tinh() {
    var gio = layGio();
    var tam = 0;

    gio.forEach(function (sp) {
        tam += Number(sp.price) * Number(sp.quantity);
    });

    var ship = gio.length ? PHI_SHIP : 0;

    document.getElementById("tam").textContent = tien(tam);
    document.getElementById("ship").textContent = tien(ship);
    document.getElementById("tong").textContent = tien(tam + ship);

    document.getElementById("trong").style.display =
        gio.length ? "none" : "block";

    document.getElementById("gio").style.display =
        gio.length ? "table" : "none";

    document.getElementById("nutDat").disabled = !gio.length;

    document.querySelectorAll("#cartBody tr").forEach(function (tr) {
        var sp = gio.find(function (x) {
            return x.id === tr.dataset.id;
        });

        if (sp) {
            tr.querySelector(".tt").textContent =
                tien(Number(sp.price) * Number(sp.quantity));
        }
    });
}

// Tăng hoặc giảm số lượng sản phẩm trong giỏ.
function doiSL(id, n) {
    var gio = layGio();

    var sp = gio.find(function (x) {
        return x.id === id;
    });

    if (!sp) return;

    sp.quantity = Math.max(
        1,
        Math.min(99, Number(sp.quantity || 1) + n)
    );

    luuGio(gio);
    veGio();
}

// Xóa sản phẩm khỏi giỏ.
function xoa(id) {
    var gioMoi = layGio().filter(function (sp) {
        return sp.id !== id;
    });

    luuGio(gioMoi);
    veGio();
}

// Kiểm tra thông tin và mô phỏng đặt hàng.
function datHang() {
    var ten = document.getElementById("ten").value.trim();
    var sdt = document.getElementById("sdt").value.trim();
    var dc = document.getElementById("diachi").value.trim();

    var loi = {
        ten: ten ? "" : "Vui lòng nhập họ tên",
        sdt: /^\d{10}$/.test(sdt)
            ? ""
            : "Số điện thoại phải gồm đúng 10 chữ số",
        diachi: dc ? "" : "Vui lòng nhập địa chỉ"
    };

    Object.keys(loi).forEach(function (k) {
        document.getElementById("l_" + k).textContent = loi[k];
    });

    var hopLe = Object.values(loi).every(function (x) {
        return !x;
    });

    document.getElementById("thanhcong").textContent = "";

    if (hopLe) {
        document.getElementById("thanhcong").textContent =
            "Đặt hàng thành công! Chúng tôi sẽ gọi xác nhận sớm.";

        localStorage.removeItem("minimart_cart");
        veGio();
    }
}

// Hiển thị giỏ hàng khi mở trang.
veGio();