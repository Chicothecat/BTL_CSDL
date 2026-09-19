USE master;
GO
-- Lỗi do khởi tạo multi data xóa đi nếu chưa khởi tạo nhé
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'QuanLyBenhVien')
BEGIN
    ALTER DATABASE QuanLyBenhVien SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE QuanLyBenhVien;
END
GO

-- Database
CREATE DATABASE QuanLyBenhVien;
GO

-- Connect to the new database

USE QuanLyBenhVien;
GO

-- Thông tin về khoa
CREATE TABLE Khoa (
    MaKhoa VARCHAR(10) PRIMARY KEY,
    TenKhoa NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255)
);

-- Thông tin về bác sĩ
CREATE TABLE BacSi (
    MaBS VARCHAR(10) PRIMARY KEY,
    CCCD VARCHAR(12) UNIQUE NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE CHECK (NgaySinh < GETDATE()),
    DiaChi NVARCHAR(255),
    BacNghe NVARCHAR(50),
    ThamNien INT,
    TrinhDo NVARCHAR(50),
    ChuyenMon NVARCHAR(100),
    LuongCoBan DECIMAL(18,2) DEFAULT 7000000,
    MaKhoa VARCHAR(10) FOREIGN KEY REFERENCES Khoa(MaKhoa)
);

-- Thông tin về y tá
CREATE TABLE YTa (
    MaYT VARCHAR(10) PRIMARY KEY,
    CCCD VARCHAR(12) UNIQUE NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE CHECK (NgaySinh < GETDATE()),
    DiaChi NVARCHAR(255),
    SoDienThoai VARCHAR(15),
    TrinhDo NVARCHAR(50),
    ThamNien INT,
    LuongCoBan DECIMAL(18,2) DEFAULT 5000000,
    MaKhoa VARCHAR(10) FOREIGN KEY REFERENCES Khoa(MaKhoa)
);

-- Thông tin về bệnh nhân
CREATE TABLE BenhNhan (
    MaBN VARCHAR(10) PRIMARY KEY,
    CCCD VARCHAR(12) UNIQUE NOT NULL,
    HoTen NVARCHAR(100) NOT NULL,
    NgaySinh DATE CHECK (NgaySinh < GETDATE()),
    DiaChi NVARCHAR(255),
    SoDienThoai VARCHAR(15)
);

-- Thông tin về bệnh
CREATE TABLE Benh (
    MaBenh VARCHAR(10) PRIMARY KEY,
    TenBenh NVARCHAR(150) NOT NULL,
    MoTa NVARCHAR(255)
);

-- Thông tin về lịch sử khám bệnh
CREATE TABLE LanKham (
    MaLanKham VARCHAR(10) PRIMARY KEY,
    MaBN VARCHAR(10) FOREIGN KEY REFERENCES BenhNhan(MaBN),
    MaBS VARCHAR(10) FOREIGN KEY REFERENCES BacSi(MaBS),
    NgayVaoVien DATE NOT NULL,
    NgayRaVien DATE,
    TongTienKham DECIMAL(18,2) DEFAULT 0,
    TrangThaiDieuTri NVARCHAR(50),
    CONSTRAINT CHK_NgayRaVien CHECK (NgayRaVien >= NgayVaoVien)
);

-- Thông tin chẩn đoán 
CREATE TABLE ChanDoan (
    MaLanKham VARCHAR(10) FOREIGN KEY REFERENCES LanKham(MaLanKham),
    MaBenh VARCHAR(10) FOREIGN KEY REFERENCES Benh(MaBenh),
    PRIMARY KEY (MaLanKham, MaBenh)
);

-- Thông tin phân công y tá hỗ trợ
CREATE TABLE PhanCongYTa (
    MaLanKham VARCHAR(10) FOREIGN KEY REFERENCES LanKham(MaLanKham),
    MaYT VARCHAR(10) FOREIGN KEY REFERENCES YTa(MaYT),
    NhiemVu NVARCHAR(100) NOT NULL,
    PRIMARY KEY (MaLanKham, MaYT)
);

-- Thông tin về thuốc và bảng giá
CREATE TABLE Thuoc (
    MaThuoc VARCHAR(10) PRIMARY KEY,
    TenThuoc NVARCHAR(150) NOT NULL,
    GiaHienTai DECIMAL(18,2) CHECK (GiaHienTai >= 0)
);

-- Thông tin chi tiết đơn thuốc
CREATE TABLE ChiTietDonThuoc (
    MaLanKham VARCHAR(10) FOREIGN KEY REFERENCES LanKham(MaLanKham),
    MaThuoc VARCHAR(10) FOREIGN KEY REFERENCES Thuoc(MaThuoc),
    SoLuong INT CHECK (SoLuong > 0),
    DonGiaBan DECIMAL(18,2) CHECK (DonGiaBan >= 0),
    PRIMARY KEY (MaLanKham, MaThuoc)
);

-- Thông tin hóa đơn thanh toán
CREATE TABLE HoaDon (
    MaHoaDon VARCHAR(10) PRIMARY KEY,
    MaLanKham VARCHAR(10) FOREIGN KEY REFERENCES LanKham(MaLanKham),
    TienKham DECIMAL(18,2),
    TienThuoc DECIMAL(18,2),
    TongTien DECIMAL(18,2),
    NgayLap DATE DEFAULT GETDATE(),
    TrangThaiThanhToan NVARCHAR(50) DEFAULT N'Chưa thanh toán'
);

SELECT * FROM sys.tables;