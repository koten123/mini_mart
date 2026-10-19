function dangXuatHeader() {
  try { localStorage.removeItem("hoiVienHienTai"); } catch (e) {}
  window.location.href = "index.html";
}

(function () {
  var tk = null;
  try {
    var sdt = localStorage.getItem("hoiVienHienTai");
    tk = sdt ? (JSON.parse(localStorage.getItem("hoiVien")) || {})[sdt] : null;
  } catch (e) {}
  var khu = document.getElementsByClassName("tk-gio")[0];
  if (!tk || !khu) { return; }

  var a = khu.getElementsByTagName("a"); 
  a[0].href = "member.html";
  a[0].innerText = "Xin chào, " + tk.ten; 
  a[1].href = "#";
  a[1].innerText = "Đăng xuất";
  a[1].onclick = function () { dangXuatHeader(); return false; };
})();
