
(function () {
    "use strict";

    const CART_KEY = "minimart_cart";
    const PHI_SHIP = 15000;

    const $ = id => document.getElementById(id);

    function tien(value) {
        return Number(value || 0).toLocaleString("vi-VN") + "đ";
    }

    function layGio() {
        try {
            const data = JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

            if (!Array.isArray(data)) return [];

            return data
                .filter(sp => sp && sp.id)
                .map(sp => ({
                    id: String(sp.id),
                    name: String(sp.name || "Sản phẩm"),
                    price: Number(sp.price) || 0,
                    image: String(sp.image || ""),
                    quantity: Math.max(
                        1,
                        Math.min(99, Number(sp.quantity) || 1)
                    )
                }));
        } catch (error) {
            return [];
        }
    }

    function luuGio(gio) {
        localStorage.setItem(CART_KEY, JSON.stringify(gio));
    }

    function veGio() {
        const gio = layGio();
        const tbody = $("cartBody");

        tbody.replaceChildren();

        gio.forEach(sp => {
            const tr = document.createElement("tr");
            tr.dataset.id = sp.id;

            const ten = document.createElement("td");
            ten.textContent = sp.name;

            const gia = document.createElement("td");
            gia.textContent = tien(sp.price);

            const sl = document.createElement("td");

            const giam = document.createElement("button");
            giam.type = "button";
            giam.textContent = "−";
            giam.addEventListener("click", () => doiSL(sp.id, -1));

            const so = document.createElement("span");
            so.textContent = sp.quantity;

            const tang = document.createElement("button");
            tang.type = "button";
            tang.textContent = "+";
            tang.addEventListener("click", () => doiSL(sp.id, 1));

            sl.append(giam, document.createTextNode(" "), so,
                      document.createTextNode(" "), tang);

            const thanhTien = document.createElement("td");
            thanhTien.textContent = tien(sp.price * sp.quantity);

            const thaoTac = document.createElement("td");
            const xoaBtn = document.createElement("button");
            xoaBtn.type = "button";
            xoaBtn.textContent = "Xóa";
            xoaBtn.addEventListener("click", () => xoa(sp.id));
            thaoTac.appendChild(xoaBtn);

            tr.append(ten, gia, sl, thanhTien, thaoTac);
            tbody.appendChild(tr);
        });

        tinh(gio);
    }

    function tinh(gio = layGio()) {
        const tam = gio.reduce(
            (sum, sp) => sum + sp.price * sp.quantity,
            0
        );

        const ship = gio.length ? PHI_SHIP : 0;

        $("tam").textContent = tien(tam);
        $("ship").textContent = tien(ship);
        $("tong").textContent = tien(tam + ship);

        $("trong").style.display = gio.length ? "none" : "block";
        $("gio").style.display = gio.length ? "table" : "none";
        $("nutDat").disabled = gio.length === 0;
    }

    function doiSL(id, delta) {
        const gio = layGio();
        const sp = gio.find(item => item.id === id);

        if (!sp) return;

        sp.quantity = Math.max(
            1,
            Math.min(99, sp.quantity + delta)
        );

        luuGio(gio);
        veGio();
    }

    function xoa(id) {
        const gio = layGio().filter(sp => sp.id !== id);
        luuGio(gio);
        veGio();
    }

    function datHang() {
        const ten = $("ten").value.trim();
        const sdt = $("sdt").value.trim();
        const diachi = $("diachi").value.trim();

        const loi = {
            ten: ten ? "" : "Vui lòng nhập họ tên.",
            sdt: /^0\d{9}$/.test(sdt)
                ? ""
                : "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.",
            diachi: diachi ? "" : "Vui lòng nhập địa chỉ."
        };

        Object.keys(loi).forEach(key => {
            $("l_" + key).textContent = loi[key];
        });

        $("thanhcong").textContent = "";

        if (Object.values(loi).some(Boolean)) return;

        if (!layGio().length) {
            $("thanhcong").textContent = "Giỏ hàng đang trống.";
            return;
        }

        $("thanhcong").textContent =
            "Đặt hàng mô phỏng thành công. Đơn chưa được gửi tới máy chủ.";

        localStorage.removeItem(CART_KEY);
        veGio();
    }

    window.datHang = datHang;

    veGio();
})();
