/* Giỏ hàng dùng chung localStorage với trang chi tiết sản phẩm. */
var PHI_SHIP = 15000;
var TIEN_MOI_DIEM = 10000; // mỗi 10.000đ tiền hàng (chưa tính ship) được 1 điểm
function tien(n) { return Number(n).toLocaleString("vi-VN") + "đ"; }
function layGio() {
  try { var gio = JSON.parse(localStorage.getItem("minimart_cart") || "[]"); return Array.isArray(gio) ? gio : []; }
  catch (e) { return []; }
}
function luuGio(gio) { localStorage.setItem("minimart_cart", JSON.stringify(gio)); }
function veGio() {
  var gio = layGio(), tbody = document.getElementById("cartBody");
  tbody.innerHTML = "";
  gio.forEach(function(sp) {
    var tr = document.createElement("tr"); tr.dataset.id = sp.id;
    tr.innerHTML = '<td></td><td></td><td><button type="button" aria-label="Giảm số lượng">−</button> <span class="sl"></span> <button type="button" aria-label="Tăng số lượng">+</button></td><td class="tt"></td><td><button type="button" class="xoa-sp">Xóa</button></td>';
    tr.children[0].textContent = sp.name; tr.children[1].textContent = tien(sp.price);
    tr.querySelector(".sl").textContent = Math.max(1, Number(sp.quantity || 1));
    var buttons = tr.querySelectorAll("button");
    buttons[0].addEventListener("click", function(){ doiSL(sp.id,-1); });
    buttons[1].addEventListener("click", function(){ doiSL(sp.id,1); });
    buttons[2].addEventListener("click", function(){ xoa(sp.id); });
    tbody.appendChild(tr);
  });
  tinh();
}
function tinh() {
  var gio=layGio(), tam=0;
  gio.forEach(function(sp){ tam += Number(sp.price)*Number(sp.quantity); });
  var ship=gio.length ? PHI_SHIP : 0;
  document.getElementById("tam").textContent=tien(tam);
  document.getElementById("ship").textContent=tien(ship);
  document.getElementById("tong").textContent=tien(tam+ship);
  document.getElementById("trong").style.display=gio.length ? "none":"block";
  document.getElementById("gio").style.display=gio.length ? "table":"none";
  document.getElementById("nutDat").disabled=!gio.length;
  document.querySelectorAll("#cartBody tr").forEach(function(tr){
    var sp=gio.find(function(x){return x.id===tr.dataset.id;});
    if(sp) tr.querySelector(".tt").textContent=tien(Number(sp.price)*Number(sp.quantity));
  });
}
function doiSL(id,n) {
  var gio=layGio(), sp=gio.find(function(x){return x.id===id;});
  if(!sp) return;
  sp.quantity=Math.max(1,Math.min(99,Number(sp.quantity||1)+n));
  luuGio(gio); veGio();
}
function xoa(id) { luuGio(layGio().filter(function(sp){return sp.id!==id;})); veGio(); }

// Lưu đơn vào lịch sử riêng của tài khoản đang đăng nhập (member.js đọc cùng khóa này).
function luuDonHang(user, tamTinh) {
  var khoa = "minimart_orders_" + user.toLocaleLowerCase("vi"), ds = [];
  try { ds = JSON.parse(localStorage.getItem(khoa) || "[]"); } catch (e) { ds = []; }
  if (!Array.isArray(ds)) ds = [];
  var diem = Math.floor(tamTinh / TIEN_MOI_DIEM);
  ds.push({ ngay: new Date().toLocaleDateString("vi-VN"), ma: "DH" + Date.now().toString().slice(-6), tong: tamTinh + PHI_SHIP, diem: diem });
  localStorage.setItem(khoa, JSON.stringify(ds));
  return diem;
}

function datHang() {
  var tb=document.getElementById("thanhcong"), user=localStorage.getItem("minimart_user");
  tb.className="err"; tb.textContent="";
  if(!user){ tb.innerHTML='Vui lòng <a href="member.html">đăng nhập</a> để đặt hàng.'; return; }
  var ten=document.getElementById("ten").value.trim(), sdt=document.getElementById("sdt").value.trim(), dc=document.getElementById("diachi").value.trim();
  var loi={ten:ten?"":"Vui lòng nhập họ tên",sdt:/^\d{10}$/.test(sdt)?"":"Số điện thoại phải gồm đúng 10 chữ số",diachi:dc?"":"Vui lòng nhập địa chỉ"};
  Object.keys(loi).forEach(function(k){document.getElementById("l_"+k).textContent=loi[k];});
  var hopLe=Object.values(loi).every(function(x){return !x;});
  if(hopLe){
    var tam=0;
    layGio().forEach(function(sp){ tam += Number(sp.price)*Number(sp.quantity); });
    var diem=luuDonHang(user, tam);
    tb.className="ok";
    tb.textContent="Đặt hàng thành công! Bạn nhận được "+diem+" điểm. Chúng tôi sẽ gọi xác nhận sớm.";
    localStorage.removeItem("minimart_cart");veGio();
  }
}
veGio();