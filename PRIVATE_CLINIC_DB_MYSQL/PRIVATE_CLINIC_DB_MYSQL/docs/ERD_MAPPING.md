# Mapping ERD goc (nguon: anh do nguoi dung cung cap)

| ERD | SQL | Khoa dinh danh | Thuoc tinh ERD |
|---|---|---|---|
| BAC_SY | doctors | MaBS | CMT, HoTen, NgaySinh, DiaChi, BacNghe, ThamNien, TrinhDo, ChuyenMon |
| Y_TA | nurses | MaYT | CMT, TrinhDo, ThamNien, NgaySinh, DiaChi, SDT |
| BENH_NHAN | patients | MaBN | CMT, HoTen, NgaySinh, DiaChi, SDT |
| BENH | diseases | MaBenh | TenBenh, MoTa |
| DOT_DIEU_TRI | disease_episodes | MaDotBenh | NgayBatDau, NgayKetThuc, TinhTrang |
| LAN_KHAM | visits | MaLanKham | SoLanKham, TienKhamChuaBenh, NgayRa, NgayVao, KetQuaKham, GhiChu |
| HO_TRO | nurse_activities | MaHoTro | LoaiHoTro, ThoiGianHoTro, GhiChu |
| DON_THUOC | prescriptions | MaDonThuoc | NgayKeDon, GhiChu |
| CT_DON_THUOC | prescription_items | MaDonThuoc + MaThuoc (PK ghep khi chuyen quan he) | SoLuong, DonGia, LieuDung, CachDung |
| THUOC | medicines | MaThuoc | TenThuoc, DonViTinh, GiaHienTai |

## Cac quan he 1-N
BAC_SY -> DOT_DIEU_TRI; BENH_NHAN -> DOT_DIEU_TRI; BENH -> DOT_DIEU_TRI; DOT_DIEU_TRI -> LAN_KHAM; LAN_KHAM -> HO_TRO; Y_TA -> HO_TRO; LAN_KHAM -> DON_THUOC; DON_THUOC -> CT_DON_THUOC; THUOC -> CT_DON_THUOC.

## Quyet dinh nghiep vu can cong bo
- Khong bo sung HoTen cho Y_TA, vi ERD khong co. Query2 hien nurse_id va CMT.
- `DA_KHOI` + `end_date` danh dau ket thuc dot benh; thuong bac si dua tren end_date.
- Luong y ta: 200k/1 cap (nurse_id, visit_id) co it nhat 1 hoat dong ho tro trong thang. Neu muon 200k/moi activity, sua logic va ghi chu ro.
- Query1: dem dot benh CO IT NHAT MOT LUOT KHAM trong thang, khong phai chi dot bat dau trong thang. Bao cao them so benh nhan khac nhau de tranh nham don vi.
- Gia thuoc theo thoi diem ke don duoc giu trong `prescription_items.unit_price`.
- Du lieu benh nhan va CCCD la GIA LAP.
- Can test thu cong quy tac bac si/thuoc theo nghiep vu; ERD khong cung cap trigger bat buoc.
