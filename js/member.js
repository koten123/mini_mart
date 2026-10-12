
var KHOA_TAI_KHOAN = "minimartMemberDemo";

function layTen() {
    return document.getElementById("hoten").value.trim();
}

function layMatKhau() {
    return document.getElementById("matkhau").value;
}

function baoLoi(noiDung) {
    document.getElementById("thongbao").innerText = noiDung || "";
}

function baoThanhCong(noiDung) {
    document.getElementById("thanhcong").innerText = noiDung || "";
}

function kiemTra() {
    var loi = "";

    if (!layTen()) {
        loi = "Vui lòng nhập tên hội viên.";
    } else if (!layMatKhau()) {
        loi = "Vui lòng nhập mật khẩu.";
    }

    baoLoi(loi);

    return loi === "";
}

// Băm mật khẩu bằng SHA-256.
async function bamMatKhau(matKhau) {
    if (
        !window.crypto ||
        !window.crypto.subtle ||
        !window.TextEncoder
    ) {
        throw new Error(
            "Trình duyệt chưa hỗ trợ mã hóa cần thiết. " +
            "Hãy mở dự án qua Live Server hoặc localhost."
        );
    }

    var duLieu = new TextEncoder().encode(matKhau);

    var ketQua = await window.crypto.subtle.digest(
        "SHA-256",
        duLieu
    );

    return Array.from(new Uint8Array(ketQua))
        .map(function (byte) {
            return byte.toString(16).padStart(2, "0");
        })
        .join("");
}

// Đọc tài khoản đã lưu.
function taiKhoanDaLuu() {
    try {
        return JSON.parse(
            localStorage.getItem(KHOA_TAI_KHOAN) || "null"
        );
    } catch (e) {
        return null;
    }
}

// ĐĂNG KÝ HỘI VIÊN
async function dangKy() {
    baoLoi("");
    baoThanhCong("");

    if (!kiemTra()) {
        return;
    }

    try {
        var taiKhoan = {
            ten: layTen(),
            matKhauHash: await bamMatKhau(layMatKhau())
        };

        localStorage.setItem(
            KHOA_TAI_KHOAN,
            JSON.stringify(taiKhoan)
        );

        baoThanhCong(
            "Tạo hội viên thành công! " +
            "Bạn có thể bấm Đăng nhập để xem quyền lợi."
        );

    } catch (loi) {
        baoLoi(
            loi.message ||
            "Không thể tạo tài khoản trên trình duyệt này."
        );
    }
}

// ĐĂNG NHẬP HỘI VIÊN
async function dangNhap() {
    baoLoi("");
    baoThanhCong("");

    if (!kiemTra()) {
        return;
    }

    try {
        var taiKhoan = taiKhoanDaLuu();

        if (!taiKhoan) {
            baoLoi(
                "Bạn chưa có tài khoản hội viên. " +
                "Hãy bấm Tạo hội viên trước."
            );
            return;
        }

        var matKhauHash = await bamMatKhau(layMatKhau());

        var tenHopLe =
            taiKhoan.ten.toLocaleLowerCase("vi") ===
            layTen().toLocaleLowerCase("vi");

        if (
            !tenHopLe ||
            taiKhoan.matKhauHash !== matKhauHash
        ) {
            baoLoi("Tên hội viên hoặc mật khẩu chưa chính xác.");
            return;
        }

        document.getElementById("tenHoiVien").innerText =
            taiKhoan.ten;

        document.getElementById("khuKhach").style.display =
            "none";

        document.getElementById("khuHoiVien").style.display =
            "block";

        baoThanhCong("");

    } catch (loi) {
        baoLoi(
            loi.message ||
            "Không thể đăng nhập trên trình duyệt này."
        );
    }
}

// ĐĂNG XUẤT
function dangXuat() {
    document.getElementById("khuHoiVien").style.display =
        "none";

    document.getElementById("khuKhach").style.display =
        "block";

    baoLoi("");
    baoThanhCong("Bạn đã đăng xuất.");
}