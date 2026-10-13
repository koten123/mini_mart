const KHOA_GIO_HANG = "minimart_cart_v1";
const KHOA_GIO_HANG_CU = "minimart_cart";
const PHI_SHIP = 15000;
function tien(n) { return Number(n || 0).toLocaleString("vi-VN") + "đ"; }
function docGioHang() {
    try {
        let raw = localStorage.getItem(KHOA_GIO_HANG);
        // Tự lấy giỏ hàng của phiên bản trước nếu người dùng đã thêm sản phẩm rồi.
        if (!raw) {
            raw = localStorage.getItem(KHOA_GIO_HANG_CU);
            if (raw) localStorage.setItem(KHOA_GIO_HANG, raw);
        }
        const data = JSON.parse(raw || "[]");
        if (!Array.isArray(data)) return [];
        return data.filter(item => item && item.id && Number(item.price) >= 0)
            .map(item => ({ ...item, quantity: Math.max(1, Math.min(10, Number(item.quantity || item.soLuong || 1))) }));
    } catch (e) { return []; }
}
function luuGioHang(gio) {
    localStorage.setItem(KHOA_GIO_HANG, JSON.stringify(gio));
    localStorage.removeItem(KHOA_GIO_HANG_CU);
}
function veGioHang() {
    const body = document.getElementById("gioBody");
    if (!body) return;
    const gio = docGioHang();
    body.innerHTML = "";
    gio.forEach(item => {
        const tr = document.createElement("tr");
        tr.dataset.id = item.id;
        const tdName = document.createElement("td"); tdName.textContent = (item.emoji || "🛒") + " " + item.name;
        const tdPrice = document.createElement("td"); tdPrice.textContent = tien(item.price);
        const tdQty = document.createElement("td");
        const minus = document.createElement("button"); minus.type = "button"; minus.textContent = "−"; minus.setAttribute("aria-label", "Giảm số lượng"); minus.onclick = () => doiSL(item.id, -1);
        const qty = document.createElement("span"); qty.className = "sl"; qty.textContent = item.quantity;
        const plus = document.createElement("button"); plus.type = "button"; plus.textContent = "+"; plus.setAttribute("aria-label", "Tăng số lượng"); plus.onclick = () => doiSL(item.id, 1);
        tdQty.append(minus, document.createTextNode(" "), qty, document.createTextNode(" "), plus);
        const tdTotal = document.createElement("td"); tdTotal.className = "tt"; tdTotal.textContent = tien(item.price * item.quantity);
        const tdRemove = document.createElement("td"); const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "Xóa"; remove.onclick = () => xoa(item.id); tdRemove.appendChild(remove);
        tr.append(tdName, tdPrice, tdQty, tdTotal, tdRemove); body.appendChild(tr);
    });
    tinh();
}
function tinh() {
    const gio = docGioHang();
    const tam = gio.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
    const ship = gio.length ? PHI_SHIP : 0;
    const tamEl = document.getElementById("tam");
    const shipEl = document.getElementById("ship");
    const tongEl = document.getElementById("tong");
    const trongEl = document.getElementById("trong");
    const gioEl = document.getElementById("gio");
    const nutDat = document.getElementById("nutDat");
    if (tamEl) tamEl.textContent = tien(tam);
    if (shipEl) shipEl.textContent = tien(ship);
    if (tongEl) tongEl.textContent = tien(tam + ship);
    if (trongEl) trongEl.style.display = gio.length ? "none" : "block";
    if (gioEl) gioEl.style.display = gio.length ? "table" : "none";
    if (nutDat) nutDat.disabled = gio.length === 0;
}
function doiSL(id, delta) {
    const gio = docGioHang(); const item = gio.find(x => x.id === id); if (!item) return;
    item.quantity = Math.min(10, Math.max(1, Number(item.quantity) + delta));
    luuGioHang(gio); veGioHang();
}
function xoa(id) { luuGioHang(docGioHang().filter(item => item.id !== id)); veGioHang(); }
function datHang() {
    const ten = document.getElementById("ten").value.trim();
    const sdt = document.getElementById("sdt").value.trim();
    const dc = document.getElementById("diachi").value.trim();
    const loi = {ten: ten ? "" : "Vui lòng nhập họ tên", sdt: /^\d{10}$/.test(sdt) ? "" : "Số điện thoại phải gồm đúng 10 chữ số", diachi: dc ? "" : "Vui lòng nhập địa chỉ"};
    Object.keys(loi).forEach(k => {
        const el = document.getElementById("l_" + k);
        if (el) el.textContent = loi[k];
    });
    const hopLe = Object.values(loi).every(x => !x) && docGioHang().length > 0;
    const ketQua = document.getElementById("thanhcong");
    if (ketQua) ketQua.textContent = hopLe ? "Đặt hàng thành công! Chúng tôi sẽ gọi xác nhận sớm." : "";
    if (hopLe) { localStorage.removeItem(KHOA_GIO_HANG); veGioHang(); }
}
document.addEventListener("DOMContentLoaded", veGioHang);
