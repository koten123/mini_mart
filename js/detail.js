
/* Trang chi tiết sản phẩm MiniMart */
(function () {
    "use strict";

    const params = new URLSearchParams(window.location.search);
    const maSP = params.get("id");

    // Không có mã sản phẩm thì quay về danh sách sản phẩm.
    if (!maSP) {
        window.location.replace("products.html");
        return;
    }

    const sp = window.DANH_SACH_SAN_PHAM &&
               window.DANH_SACH_SAN_PHAM[maSP];

    if (!sp) {
        document.title = "Không tìm thấy sản phẩm – MiniMart";
        document.getElementById("tenSP").textContent =
            "Không tìm thấy sản phẩm";

        document.getElementById("moTaSP").textContent =
            "Sản phẩm không tồn tại. Vui lòng quay lại danh sách sản phẩm.";

        document.querySelector(".btn-green").hidden = true;
        document.getElementById("anhSP").hidden = true;
        return;
    }

    document.title = sp.name + " – MiniMart";

    document.getElementById("anhSP").src = sp.image;
    document.getElementById("anhSP").alt = sp.name;
    document.getElementById("tenSP").textContent = sp.name;
    document.getElementById("giaSP").textContent =
        Number(sp.price).toLocaleString("vi-VN") + "đ";
    document.getElementById("moTaSP").textContent = sp.description;
    document.getElementById("danhMucSP").textContent = sp.category;
    document.getElementById("thongTinThem").textContent = sp.extra;

    // Thay đổi số lượng.
    window.doiSL = function (delta) {
        const el = document.getElementById("sl");
        const soLuong = Number(el.textContent) || 1;

        el.textContent = Math.max(
            1,
            Math.min(99, soLuong + delta)
        );
    };

    // Thêm sản phẩm vào giỏ hàng.
    window.themGio = function () {
        const quantity = Number(
            document.getElementById("sl").textContent
        ) || 1;

        let cart = [];

        try {
            cart = JSON.parse(
                localStorage.getItem("minimart_cart") || "[]"
            );

            if (!Array.isArray(cart)) cart = [];
        } catch (error) {
            cart = [];
        }

        const existing = cart.find(item => item.id === sp.id);

        if (existing) {
            existing.quantity = Math.min(
                99,
                (Number(existing.quantity) || 0) + quantity
            );
        } else {
            cart.push({
                id: sp.id,
                name: sp.name,
                price: sp.price,
                image: sp.image,
                quantity: quantity
            });
        }

        try {
            localStorage.setItem(
                "minimart_cart",
                JSON.stringify(cart)
            );

            document.getElementById("thongbao").textContent =
                "Đã thêm " + quantity + " × " +
                sp.name + " vào giỏ hàng.";
        } catch (error) {
            document.getElementById("thongbao").textContent =
                "Không thể lưu giỏ hàng. Hãy kiểm tra cài đặt trình duyệt.";
        }
    };
})();
