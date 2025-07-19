/** Bài 1: Quản lí tuyển sinh
 * Đầu vào: tạo biến lưu dữ liệu điểm chuẩn, điểm môn 1, môn 2, môn 3, khu vực, đối tượng, từ user nhập
 * 
 * 
 * Xử lí: - kiểm tra dữ liệu hợp lệ dùng hàm isNaN trả về true nếu người dùng không nhập bất cứ thứ gì -> return không xử lí
 *        - nếu ô dữ liệu hợp lệ tạo biến lưu điểm khu vực và set giá trị dựa trên lựa chọn của user
 *        - tạo biến lưu điểm đối tượng set giá trị dựa trên lựa chọn của user
 * 
 * 
 * Đầu ra: - Tạo biến lưu tổng điểm dựa trên điểm 3 môn và điểm ưu tiên
 *         - Tạo biến lưu thông báo để in kết quả ra màn hình dựa trên các trường hợp có thể xảy ra
 */
function tinhKetQua() {
  // lấy dữ liệu từ input
  const diemChuan = parseFloat(document.getElementById('diemChuan').value);
  const mon1 = parseFloat(document.getElementById('mon1').value);
  const mon2 = parseFloat(document.getElementById('mon2').value);
  const mon3 = parseFloat(document.getElementById('mon3').value);
  const khuVuc = document.getElementById('khuVuc').value;
  const doiTuong = parseInt(document.getElementById('doiTuong').value);

  // liểm tra nhập liệu hợp lệ
  if (isNaN(diemChuan) || isNaN(mon1) || isNaN(mon2) || isNaN(mon3)) {
    document.getElementById('result1').innerText = 'Vui lòng nhập đầy đủ điểm!';
    return;
  }

  // tính điểm ưu tiên khu vực
  let diemKhuVuc = 0;
  if (khuVuc === 'A') diemKhuVuc = 2;
  else if (khuVuc === 'B') diemKhuVuc = 1;
  else if (khuVuc === 'C') diemKhuVuc = 0.5;

  // tính điểm ưu tiên đối tượng
  let diemDoiTuong = 0;
  if (doiTuong === 1) diemDoiTuong = 2.5;
  else if (doiTuong === 2) diemDoiTuong = 1.5;
  else if (doiTuong === 3) diemDoiTuong = 1;

  // tổng điểm
  const tongDiem = mon1 + mon2 + mon3 + diemKhuVuc + diemDoiTuong;

  // xác định kết quả
  let ketQua = '';
  if (mon1 === 0 || mon2 === 0 || mon3 === 0) {
    ketQua = `Bạn rớt vì có môn 0 điểm. Tổng điểm: ${tongDiem}`;
  } else if (tongDiem >= diemChuan) {
    ketQua = `Bạn đậu với tổng điểm: ${tongDiem}`;
  } else {
    ketQua = `Bạn rớt với tổng điểm: ${tongDiem}`;
  }

  // hiển thị kết quả
  document.getElementById('result1').innerText = ketQua;
}

/** Bài 2: Tính 
 * Đầu vào: - tạo biến lưu giá trị input từ người dùng 
 * 
 * 
 * Xử lí: - kiểm tra hợp lệ từ người dùng sử dụng biến isNaN để check trống nếu true -> in thông báo lỗi và return thoát khỏi xử lí
 *        - nếu input từ người dùng hợp lệ sẽ khởi tạo biến lưu giá trị kết quả
 *        - khởi tạo biến kwConLai để lưu giá trị Kw còn lại sau khi tính toán để sử lí dựa trên từng bậc
 * Đầu ra: 
 *        - tạo đối tượng để định dạng format tiền tệ VND in kết quả tiền ra màn hình
 *
 */
function tinhTienDien() {
  const ten = document.getElementById('ten').value;
  const soKw = parseFloat(document.getElementById('soKw').value);

  if (!ten || isNaN(soKw) || soKw < 0) {
    document.getElementById('result2').innerText = 'Vui lòng nhập đúng tên và số Kw!';
    return;
  }

  let tien = 0;
  let kwConLai = soKw;

  // 50kw đầu
  if (kwConLai > 50) {
    tien += 50 * 500;
    kwConLai -= 50;
  } else {
    tien += kwConLai * 500;
    kwConLai = 0;
  }

  // 50kw kế
  if (kwConLai > 0) {
    if (kwConLai > 50) {
      tien += 50 * 650;
      kwConLai -= 50;
    } else {
      tien += kwConLai * 650;
      kwConLai = 0;
    }
  }

  // 100kw kế
  if (kwConLai > 0) {
    if (kwConLai > 100) {
      tien += 100 * 850;
      kwConLai -= 100;
    } else {
      tien += kwConLai * 850;
      kwConLai = 0;
    }
  }

  // 150kw kế
  if (kwConLai > 0) {
    if (kwConLai > 150) {
      tien += 150 * 1100;
      kwConLai -= 150;
    } else {
      tien += kwConLai * 1100;
      kwConLai = 0;
    }
  }

  // Còn lại
  if (kwConLai > 0) {
    tien += kwConLai * 1300;
  }
  const formatVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  document.getElementById('result2').innerText = 
    `Khách hàng: ${ten}\nSố Kw: ${soKw}\nTiền điện phải trả: ${formatVND.format(tien)}`;
}
/** Bài 3: Tính thuế thu nhập cá nhân
 * Đầu vào: - tạo biến lưu giá trị họ tên, tổng thu nhập và số người phụ thuộc từ input của user
 * 
 * 
 * Xử lí:   - sử dụng hàm isNaN check trống nếu true -> return thoát khỏi xử lí
 *          - nếu dữ liệu đầu vào hợp lệ ->> tạo biến lưu giá trị thu nhập chịu thế qua công thức = tổng thu nhập - 4tr * số người phụ thuộc * 1.6tr
 *          - in thông báo ra màn hình khi thu nhập chịu thuế <= 0 và return thoát khỏi chương trình (vì người thuộc diện này không cần đóng thuế)
 *          - nếu thu nhập chịu thuế lớn hơn 0 thì tạo biến lưu kết quả thuế
 *          - dựa trên các bậc và tính thuế dựa trên số phần trăm của thu nhập chịu thuế . vd : thu nhập chịu thuế từ 1 đến 60tr thì thuế sẽ là 5% của thu nhập chịu thuế
 * 
 * Đầu ra: - tạo đối tượng định dạng format tiền tệ vnd và in kết quả ra màn hình
 * 
 */
function tinhThue() {
  const hoTen = document.getElementById('hoTen').value;
  const tongThuNhap = parseFloat(document.getElementById('tongThuNhap').value);
  const soNguoiPhuThuoc = parseInt(document.getElementById('nguoiPhuThuoc').value);

  if (!hoTen || isNaN(tongThuNhap) || isNaN(soNguoiPhuThuoc) || tongThuNhap < 0 || soNguoiPhuThuoc < 0) {
    document.getElementById('result3').innerText = 'Vui lòng nhập đầy đủ và hợp lệ thông tin!';
    return;
  }

  // tính thu nhập chịu thuế
  let thuNhapChiuThue = tongThuNhap - 4000000 - soNguoiPhuThuoc * 1600000;
  if (thuNhapChiuThue <= 0) {
    document.getElementById('result3').innerText = `${hoTen} không phải nộp thuế.`;
    return;
  }

  // tính thuế dựa trên các bậc
  let thue = 0;


  if (thuNhapChiuThue <= 60000000) {
    thue = thuNhapChiuThue * 0.05;
  } else if (thuNhapChiuThue <= 120000000) {
    thue = thuNhapChiuThue * 0.10;
  } else if (thuNhapChiuThue <= 210000000) {
    thue = thuNhapChiuThue * 0.15;
  } else if (thuNhapChiuThue <= 384000000) {
    thue = thuNhapChiuThue * 0.20;
  } else if (thuNhapChiuThue <= 624000000) {
    thue = thuNhapChiuThue * 0.25;
  } else if (thuNhapChiuThue <= 960000000) {
    thue = thuNhapChiuThue * 0.30;
  } else {
    thue = thuNhapChiuThue * 0.35;
  }
  //tạo đối tượng định dạng tiền tệ VND
  const formatVND = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

  document.getElementById('result3').innerText = 
    `Họ tên: ${hoTen}\nThu nhập chịu thuế: ${formatVND.format(thuNhapChiuThue)}\nThuế phải nộp: ${formatVND.format(thue)}`;
}

/** Bài 5: Tính tiền cáp
 * Đầu vào: - tạo biến lưu mã khách hàng, loại khách hàng, số kết nối và số kênh cao cấp từ input của user
 *          - tạo hàm toogleKetNoi() để check nếu loại khách hàng là nhà dân, thì disabled là true nên user không thể nhập vào field input số kết nối và ngược lại
 * 
 * Xử lí:   - nếu user không nhập mã khách hàng sẽ thông báo lỗi ra màn hình và return thoát khỏi hàm xử lí
 *          - set phí xử lí, phí cơ bản và phí kênh dựa trên yêu cầu đề bài của 2 loại khách hàng là nhà dân và doanh nghiệp
 *          - tạo biến lưu kết quả tổng tiền bằng tổng phí xử lí, phí cơ bản và phí kênh
 * Đầu ra:  
 *          - tạo đối tượng định dạng format tiền tệ theo đơn vị tiền USD
 *          - In kết quả ra màn hình, dùng toán tử 3 ngôi để in ra loại khách hàng dựa trên input của người dùng đã chọn
 */
function toggleKetNoi() {
  const loaiKH = document.getElementById('loaiKH').value;
  const soKetNoi = document.getElementById('soKetNoi');
  if (loaiKH === 'doanhNghiep') {
    soKetNoi.disabled = false;
  } else {
    soKetNoi.value = '';
    soKetNoi.disabled = true;
  }
}

function tinhTienCap() {
  const maKH = document.getElementById('maKH').value;
  const loaiKH = document.getElementById('loaiKH').value;
  const soKetNoi = parseInt(document.getElementById('soKetNoi').value) || 0;
  const soKenhCaoCap = parseInt(document.getElementById('soKenhCaoCap').value) || 0;

  if (!maKH) {
    document.getElementById('result4').innerText = 'Vui lòng nhập mã khách hàng!';
    return;
  }

  let phiXuLy = 0;
  let phiCoBan = 0;
  let phiKenh = 0;

  if (loaiKH === 'nhaDan') {
    phiXuLy = 4.5;
    phiCoBan = 20.5;
    phiKenh = soKenhCaoCap * 7.5;
  } else {
    phiXuLy = 15;
    // 10 kết nối đầu = 75$, mỗi kết nối thêm 5$
    phiCoBan = 75;
    if (soKetNoi > 10) {
      phiCoBan += (soKetNoi - 10) * 5;
    }
    phiKenh = soKenhCaoCap * 50;
  }

  const tongTien = phiXuLy + phiCoBan + phiKenh;

  // Định dạng tiền tệ USD
  const formatUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  document.getElementById('result4').innerText = 
    `Mã KH: ${maKH}
Loại KH: ${loaiKH === 'nhaDan' ? 'Nhà dân' : 'Doanh nghiệp'}
Tổng tiền cáp: ${formatUSD.format(tongTien)}`;
}