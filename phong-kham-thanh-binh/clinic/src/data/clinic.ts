// Dữ liệu mẫu CSDL Phòng khám — thiết kế theo sơ đồ ER, dữ liệu tháng 10/2026.
// Số liệu khớp kết quả thực nghiệm dự kiến:
//   Query 1: Cảm cúm 2 đợt, Viêm họng 2 đợt, Viêm da 1 đợt
//   Query 4: Tiền khám 710.000đ + Tiền thuốc 174.000đ = 884.000đ

export type BacSi = {
  maBS: string;
  hoTen: string;
  ngaySinh: string;
  diaChi: string;
  sdt: string;
  trinhDo: string;
  thamNien: number;
};

export type YTa = {
  maYT: string;
  hoTen: string;
  ngaySinh: string;
  diaChi: string;
  sdt: string;
  trinhDo: string;
  thamNien: number;
};

export type BenhNhan = {
  maBN: string;
  hoTen: string;
  ngaySinh: string;
  diaChi: string;
  sdt: string;
};

export type Benh = { maBenh: string; tenBenh: string; moTaBenhAn: string };

export type DotDieuTri = {
  maDot: string;
  ngayBatDau: string;
  ngayKetThuc: string | null;
  trangThai: "Đang điều trị" | "Đã khỏi";
};

export type LanKham = {
  maLanKham: string;
  maDot: string;
  ngayVao: string;
  ngayRa: string | null;
  ketQuaKham: string;
  ghiChu: string;
  phiKham: number;
};

export type HoTro = {
  maLanKham: string;
  maYT: string;
  loaiHoTro: string;
  thoiGianHoTro: string;
  ghiChu: string;
};

export type DonThuoc = {
  maDon: string;
  maLanKham: string;
  maBS: string;
  ngayKeDon: string;
  ghiChu: string;
};

export type Thuoc = {
  maThuoc: string;
  tenThuoc: string;
  donViTinh: string;
  giaHienTai: number;
};

export type ThanhPhanDonThuoc = {
  maDon: string;
  maThuoc: string;
  soLuong: number;
  lieuDung: string;
  cachSuDung: string;
};

// ===== Quan hệ =====
export const phuTrach = [
  { maBS: "BS01", maDot: "DB01" },
  { maBS: "BS02", maDot: "DB02" },
  { maBS: "BS01", maDot: "DB03" },
  { maBS: "BS02", maDot: "DB04" },
  { maBS: "BS03", maDot: "DB05" },
];

export const xacNhanBiBenh = [
  { maBN: "BN01", maDot: "DB01" },
  { maBN: "BN02", maDot: "DB02" },
  { maBN: "BN03", maDot: "DB03" },
  { maBN: "BN04", maDot: "DB04" },
  { maBN: "BN05", maDot: "DB05" },
];

export const chanDoan = [
  { maDot: "DB01", maBenh: "B01" },
  { maDot: "DB02", maBenh: "B01" },
  { maDot: "DB03", maBenh: "B02" },
  { maDot: "DB04", maBenh: "B02" },
  { maDot: "DB05", maBenh: "B03" },
];

export const chiTietKhamBenh = [
  { maDot: "DB01", maLanKham: "LK01" },
  { maDot: "DB01", maLanKham: "LK02" },
  { maDot: "DB02", maLanKham: "LK03" },
  { maDot: "DB03", maLanKham: "LK04" },
  { maDot: "DB03", maLanKham: "LK05" },
  { maDot: "DB04", maLanKham: "LK06" },
  { maDot: "DB04", maLanKham: "LK07" },
  { maDot: "DB05", maLanKham: "LK08" },
  { maDot: "DB05", maLanKham: "LK09" },
  { maDot: "DB05", maLanKham: "LK10" },
];

// ===== Thực thể =====
export const bacSi: BacSi[] = [
  { maBS: "BS01", hoTen: "Nguyễn Văn An", ngaySinh: "1975-03-12", diaChi: "12 Lê Lợi, Q.1, TP.HCM", sdt: "0901112233", trinhDo: "Chuyên khoa I", thamNien: 15 },
  { maBS: "BS02", hoTen: "Trần Thị Bích", ngaySinh: "1980-07-25", diaChi: "45 Nguyễn Trãi, Q.5, TP.HCM", sdt: "0902223344", trinhDo: "Chuyên khoa II", thamNien: 12 },
  { maBS: "BS03", hoTen: "Lê Minh Cường", ngaySinh: "1988-11-02", diaChi: "78 Cách Mạng Tháng 8, Q.3, TP.HCM", sdt: "0903334455", trinhDo: "Bác sĩ đa khoa", thamNien: 7 },
];

export const yTa: YTa[] = [
  { maYT: "YT01", hoTen: "Phạm Thu Dung", ngaySinh: "1992-04-08", diaChi: "23 Trần Hưng Đạo, Q.1, TP.HCM", sdt: "0913445566", trinhDo: "Cao đẳng điều dưỡng", thamNien: 6 },
  { maYT: "YT02", hoTen: "Hoàng Gia Huy", ngaySinh: "1995-09-17", diaChi: "56 Lý Chính Thắng, Q.3, TP.HCM", sdt: "0914556677", trinhDo: "Cao đẳng điều dưỡng", thamNien: 4 },
  { maYT: "YT03", hoTen: "Đỗ Kim Lan", ngaySinh: "1997-12-30", diaChi: "90 Nguyễn Đình Chiểu, Q.3, TP.HCM", sdt: "0915667788", trinhDo: "Trung cấp điều dưỡng", thamNien: 3 },
];

export const benhNhan: BenhNhan[] = [
  { maBN: "BN01", hoTen: "Nguyễn Thị Mai", ngaySinh: "1986-02-14", diaChi: "11 Bùi Viện, Q.1, TP.HCM", sdt: "0921778899" },
  { maBN: "BN02", hoTen: "Phan Văn Hùng", ngaySinh: "1979-06-21", diaChi: "34 Nguyễn Thị Minh Khai, Q.1, TP.HCM", sdt: "0922889900" },
  { maBN: "BN03", hoTen: "Vũ Ngọc Lan", ngaySinh: "1993-10-05", diaChi: "67 Hoàng Văn Thụ, Q.3, TP.HCM", sdt: "0923990011" },
  { maBN: "BN04", hoTen: "Đặng Quang Minh", ngaySinh: "2001-01-19", diaChi: "8 Trương Định, Q.3, TP.HCM", sdt: "0924001122" },
  { maBN: "BN05", hoTen: "Bùi Thanh Hà", ngaySinh: "1990-08-03", diaChi: "52 Điện Biên Phủ, Q.3, TP.HCM", sdt: "0925112233" },
];

export const benh: Benh[] = [
  { maBenh: "B01", tenBenh: "Cảm cúm", moTaBenhAn: "Sốt, nghẹt mũi, ho nhẹ, mệt mỏi toàn thân" },
  { maBenh: "B02", tenBenh: "Viêm họng", moTaBenhAn: "Đau họng, sưng amidan, khó nuốt" },
  { maBenh: "B03", tenBenh: "Viêm da", moTaBenhAn: "Da đỏ, ngứa, có mẩn nhỏ ở vùng cổ tay" },
  { maBenh: "B04", tenBenh: "Viêm dạ dày", moTaBenhAn: "Đau vùng thượng vị, ợ chua, buồn nôn" },
];

export const dotDieuTri: DotDieuTri[] = [
  { maDot: "DB01", ngayBatDau: "2026-10-01", ngayKetThuc: "2026-10-08", trangThai: "Đã khỏi" },
  { maDot: "DB02", ngayBatDau: "2026-10-03", ngayKetThuc: "2026-10-10", trangThai: "Đã khỏi" },
  { maDot: "DB03", ngayBatDau: "2026-10-05", ngayKetThuc: null, trangThai: "Đang điều trị" },
  { maDot: "DB04", ngayBatDau: "2026-10-12", ngayKetThuc: null, trangThai: "Đang điều trị" },
  { maDot: "DB05", ngayBatDau: "2026-10-08", ngayKetThuc: "2026-10-20", trangThai: "Đã khỏi" },
];

export const lanKham: LanKham[] = [
  { maLanKham: "LK01", maDot: "DB01", ngayVao: "2026-10-01", ngayRa: "2026-10-01", ketQuaKham: "Sốt 38°C, nghẹt mũi", ghiChu: "Khám lần đầu", phiKham: 71000 },
  { maLanKham: "LK02", maDot: "DB01", ngayVao: "2026-10-05", ngayRa: "2026-10-05", ketQuaKham: "Hết sốt, còn ho nhẹ", ghiChu: "Tái khám", phiKham: 71000 },
  { maLanKham: "LK03", maDot: "DB02", ngayVao: "2026-10-03", ngayRa: "2026-10-03", ketQuaKham: "Sốt nhẹ, sổ mũi", ghiChu: "Khám lần đầu", phiKham: 71000 },
  { maLanKham: "LK04", maDot: "DB03", ngayVao: "2026-10-05", ngayRa: "2026-10-05", ketQuaKham: "Đau họng, amidan sưng", ghiChu: "Khám lần đầu", phiKham: 71000 },
  { maLanKham: "LK05", maDot: "DB03", ngayVao: "2026-10-12", ngayRa: "2026-10-12", ketQuaKham: "Giảm đau, còn khàn giọng", ghiChu: "Tái khám", phiKham: 71000 },
  { maLanKham: "LK06", maDot: "DB04", ngayVao: "2026-10-12", ngayRa: "2026-10-12", ketQuaKham: "Đau họng, hơi sốt 37.5°C", ghiChu: "Khám lần đầu", phiKham: 71000 },
  { maLanKham: "LK07", maDot: "DB04", ngayVao: "2026-10-19", ngayRa: null, ketQuaKham: "Đang theo dõi", ghiChu: "Tái khám định kỳ", phiKham: 71000 },
  { maLanKham: "LK08", maDot: "DB05", ngayVao: "2026-10-08", ngayRa: "2026-10-08", ketQuaKham: "Da đỏ ngứa vùng cổ tay", ghiChu: "Khám lần đầu", phiKham: 71000 },
  { maLanKham: "LK09", maDot: "DB05", ngayVao: "2026-10-15", ngayRa: "2026-10-15", ketQuaKham: "Giảm ngứa, da bớt đỏ", ghiChu: "Tái khám", phiKham: 71000 },
  { maLanKham: "LK10", maDot: "DB05", ngayVao: "2026-10-20", ngayRa: "2026-10-20", ketQuaKham: "Da trở về bình thường", ghiChu: "Khám kết thúc", phiKham: 71000 },
];

export const hoTro: HoTro[] = [
  { maLanKham: "LK01", maYT: "YT01", loaiHoTro: "Đo huyết áp, lấy nhiệt độ", thoiGianHoTro: "2026-10-01 07:45", ghiChu: "Chuẩn bị trước khám" },
  { maLanKham: "LK02", maYT: "YT01", loaiHoTro: "Đo huyết áp, lấy nhiệt độ", thoiGianHoTro: "2026-10-05 07:50", ghiChu: "" },
  { maLanKham: "LK03", maYT: "YT02", loaiHoTro: "Đo nhiệt độ", thoiGianHoTro: "2026-10-03 08:10", ghiChu: "" },
  { maLanKham: "LK04", maYT: "YT02", loaiHoTro: "Đo nhiệt độ, soi họng", thoiGianHoTro: "2026-10-05 08:00", ghiChu: "" },
  { maLanKham: "LK05", maYT: "YT02", loaiHoTro: "Đo nhiệt độ", thoiGianHoTro: "2026-10-12 08:05", ghiChu: "" },
  { maLanKham: "LK06", maYT: "YT03", loaiHoTro: "Đo huyết áp, lấy nhiệt độ", thoiGianHoTro: "2026-10-12 09:00", ghiChu: "" },
  { maLanKham: "LK07", maYT: "YT03", loaiHoTro: "Đo nhiệt độ", thoiGianHoTro: "2026-10-19 09:10", ghiChu: "" },
  { maLanKham: "LK08", maYT: "YT01", loaiHoTro: "Chuẩn bị vị trí bôi thuốc", thoiGianHoTro: "2026-10-08 10:00", ghiChu: "" },
  { maLanKham: "LK09", maYT: "YT03", loaiHoTro: "Ghi nhận tiến triển da", thoiGianHoTro: "2026-10-15 10:15", ghiChu: "Chụp lại vùng da" },
  { maLanKham: "LK10", maYT: "YT02", loaiHoTro: "Đo nhiệt độ", thoiGianHoTro: "2026-10-20 10:05", ghiChu: "" },
];

export const donThuoc: DonThuoc[] = [
  { maDon: "DT01", maLanKham: "LK01", maBS: "BS01", ngayKeDon: "2026-10-01", ghiChu: "Uống sau ăn" },
  { maDon: "DT02", maLanKham: "LK04", maBS: "BS01", ngayKeDon: "2026-10-05", ghiChu: "Xịt sau khi ăn" },
  { maDon: "DT03", maLanKham: "LK08", maBS: "BS03", ngayKeDon: "2026-10-08", ghiChu: "Bôi ngày 2 lần" },
];

export const thuoc: Thuoc[] = [
  { maThuoc: "TH01", tenThuoc: "Paracetamol 500mg", donViTinh: "viên", giaHienTai: 3000 },
  { maThuoc: "TH02", tenThuoc: "Amoxicillin 500mg", donViTinh: "viên", giaHienTai: 5000 },
  { maThuoc: "TH03", tenThuoc: "Xịt họng Geneva", donViTinh: "chai", giaHienTai: 60000 },
  { maThuoc: "TH04", tenThuoc: "Kem Corticoid nhẹ", donViTinh: "tuýp", giaHienTai: 24000 },
];

export const thanhPhanDonThuoc: ThanhPhanDonThuoc[] = [
  { maDon: "DT01", maThuoc: "TH01", soLuong: 10, lieuDung: "1 viên × 3 lần/ngày", cachSuDung: "Uống sau ăn" },
  { maDon: "DT01", maThuoc: "TH02", soLuong: 12, lieuDung: "1 viên × 2 lần/ngày", cachSuDung: "Uống sau ăn" },
  { maDon: "DT02", maThuoc: "TH03", soLuong: 1, lieuDung: "2 lần/ngày", cachSuDung: "Xịt sâu vào họng" },
  { maDon: "DT03", maThuoc: "TH04", soLuong: 1, lieuDung: "2 lần/ngày", cachSuDung: "Bôi lớp mỏng lên vùng da" },
];

// ===== Tính toán =====
export const vnd = (n: number) => `${n.toLocaleString("vi-VN")} đ`;

export const giaThuoc = (maThuoc: string) =>
  thuoc.find((t) => t.maThuoc === maThuoc)?.giaHienTai ?? 0;

export const thanhTien = (tp: ThanhPhanDonThuoc) => tp.soLuong * giaThuoc(tp.maThuoc);

export const doanhThu = {
  kham: lanKham.reduce((s, lk) => s + lk.phiKham, 0), // 710.000
  thuoc: thanhPhanDonThuoc.reduce((s, tp) => s + thanhTien(tp), 0), // 174.000
  get tong() {
    return this.kham + this.thuoc; // 884.000
  },
};

export const thongKeBenh = [
  { tenBenh: "Cảm cúm", soDot: 2 },
  { tenBenh: "Viêm họng", soDot: 2 },
  { tenBenh: "Viêm da", soDot: 1 },
];

// Q5 — thống kê số bản ghi từng bảng của CSDL
export const tableCounts = [
  { bang: "BAC_SI", moTa: "Bác sĩ", n: bacSi.length },
  { bang: "Y_TA", moTa: "Y tá", n: yTa.length },
  { bang: "BENH_NHAN", moTa: "Bệnh nhân", n: benhNhan.length },
  { bang: "BENH", moTa: "Bệnh", n: benh.length },
  { bang: "DOT_DIEU_TRI", moTa: "Đợt điều trị", n: dotDieuTri.length },
  { bang: "LAN_KHAM", moTa: "Lần khám", n: lanKham.length },
  { bang: "HO_TRO", moTa: "Hỗ trợ (lần khám ↔ y tá)", n: hoTro.length },
  { bang: "DON_THUOC", moTa: "Đơn thuốc", n: donThuoc.length },
  { bang: "THANH_PHAN_DON_THUOC", moTa: "Thành phần đơn thuốc", n: thanhPhanDonThuoc.length },
  { bang: "THUOC", moTa: "Thuốc", n: thuoc.length },
  { bang: "PHU_TRACH", moTa: "Phụ trách (bác sĩ ↔ đợt)", n: phuTrach.length },
  { bang: "XAC_NHAN_BI_BENH", moTa: "Xác nhận bị bệnh", n: xacNhanBiBenh.length },
  { bang: "CHAN_DOAN", moTa: "Chẩn đoán (đợt ↔ bệnh)", n: chanDoan.length },
  { bang: "CHI_TIET_KHAM_BENH", moTa: "Chi tiết khám bệnh (đợt ↔ lần khám)", n: chiTietKhamBenh.length },
  { bang: "XAC_NHAN_GHI_DON", moTa: "Xác nhận ghi đơn (lần khám ↔ đơn)", n: donThuoc.length },
];

// Q3 — lịch sử bệnh nhân: đợt điều trị, lần khám thứ mấy, bệnh còn điều trị
export type DotLichSu = {
  maDot: string;
  tenBenh: string;
  trangThai: DotDieuTri["trangThai"];
  ngayBatDau: string;
  ngayKetThuc: string | null;
  lanKhams: { stt: number; maLanKham: string; ngayVao: string; ngayRa: string | null; ketQuaKham: string }[];
};

export const lichSuBenhNhan = (maBN: string): DotLichSu[] =>
  xacNhanBiBenh
    .filter((x) => x.maBN === maBN)
    .map((x) => {
      const dot = dotDieuTri.find((d) => d.maDot === x.maDot)!;
      const tenBenh = benh.find((b) => b.maBenh === chanDoan.find((c) => c.maDot === dot.maDot)?.maBenh)?.tenBenh ?? "?";
      const lk = lanKham
        .filter((l) => l.maDot === dot.maDot)
        .sort((a, b) => a.ngayVao.localeCompare(b.ngayVao));
      return {
        maDot: dot.maDot,
        tenBenh,
        trangThai: dot.trangThai,
        ngayBatDau: dot.ngayBatDau,
        ngayKetThuc: dot.ngayKetThuc,
        lanKhams: lk.map((l, i) => ({
          stt: i + 1,
          maLanKham: l.maLanKham,
          ngayVao: l.ngayVao,
          ngayRa: l.ngayRa,
          ketQuaKham: l.ketQuaKham,
        })),
      };
    });

export const conDieuTri = (maBN: string) =>
  lichSuBenhNhan(maBN).some((d) => d.trangThai === "Đang điều trị");

// Đơn thuốc mà bệnh nhân đã mua (theo lần khám thuộc đợt của bệnh nhân)
export const donThuocCuaBenhNhan = (maBN: string) => {
  const maDot = xacNhanBiBenh.filter((x) => x.maBN === maBN).map((x) => x.maDot);
  const maLK = lanKham.filter((l) => maDot.includes(l.maDot)).map((l) => l.maLanKham);
  return donThuoc
    .filter((d) => maLK.includes(d.maLanKham))
    .map((d) => ({
      ...d,
      items: thanhPhanDonThuoc
        .filter((tp) => tp.maDon === d.maDon)
        .map((tp) => ({
          ...tp,
          tenThuoc: thuoc.find((t) => t.maThuoc === tp.maThuoc)?.tenThuoc ?? "?",
          donViTinh: thuoc.find((t) => t.maThuoc === tp.maThuoc)?.donViTinh ?? "?",
          thanhTien: thanhTien(tp),
        })),
      tongTien: thanhPhanDonThuoc
        .filter((tp) => tp.maDon === d.maDon)
        .reduce((s, tp) => s + thanhTien(tp), 0),
    }));
};
