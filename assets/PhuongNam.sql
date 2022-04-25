﻿CREATE DATABASE VPP_PHUONGNAM

GO
USE VPP_PHUONGNAM

--CREATE DATABASE OBJECTS

GO
CREATE TABLE NHANVIEN
(
	IDNV INT PRIMARY KEY,
	CMND VARCHAR(13) UNIQUE NOT NULL,
	HO NVARCHAR(255) NOT NULL,
	TEN NVARCHAR(255) NOT NULL,
	SDT VARCHAR(10) NOT NULL,
	EMAIL VARCHAR(30) UNIQUE NOT NULL,
	NGAYSINH DATE NOT NULL,
	DIACHI NVARCHAR(255) NOT NULL,
	GIOITINH NVARCHAR(3) CHECK(GIOITINH IN (N'Nam', N'Nữ')) NOT NULL, 
	CHUCVU NVARCHAR(255) NOT NULL,
	LUONG MONEY NOT NULL,
	DANGHI BIT DEFAULT 0 NOT NULL
)

GO
CREATE TABLE TAIKHOAN
(
	USERNAME VARCHAR(30) PRIMARY KEY,
	PASSWORD VARCHAR(50) NOT NULL,
	USER_ROLE VARCHAR(15) CHECK (USER_ROLE IN ('ROLE_STAFF','ROLE_MANAGER'))
	DEFAULT 'STAFF' NOT NULL,
	ENABLED BIT DEFAULT 1,
	IDNV INT FOREIGN KEY
	REFERENCES VPP_PHUONGNAM.DBO.NHANVIEN ON UPDATE CASCADE ON DELETE CASCADE NOT NULL
)

GO 
CREATE TABLE KHACHHANG 
(
	IDKH VARCHAR(255) PRIMARY KEY, --ID KHACH HANG LA 'TUDO' KHI KHACH KHONG PHAI THANH VIEN
	HO NVARCHAR(255),
	TEN NVARCHAR(255),
	SDT VARCHAR(10) UNIQUE,
	NGAYSINH DATE,
	GIOITINH NVARCHAR(3) CHECK(GIOITINH IN (N'Nam', N'Nữ')) NOT NULL
)

GO 
CREATE TABLE NHACUNGCAP
(
	IDNCC VARCHAR(10) PRIMARY KEY,
	TENNCC NVARCHAR(50) NOT NULL UNIQUE,
	SDT VARCHAR(10) UNIQUE NOT NULL,
	EMAIL VARCHAR(30) UNIQUE NOT NULL,
	DIACHI NVARCHAR(255) UNIQUE NOT NULL
)

GO 
CREATE TABLE LOAI
(
	IDLOAI VARCHAR(10) PRIMARY KEY,
	TENLOAI NVARCHAR(50) UNIQUE NOT NULL
)

GO 
CREATE TABLE THUONGHIEU
(
	IDTH VARCHAR(10) PRIMARY KEY,
	TENTH NVARCHAR(50) UNIQUE NOT NULL
)

GO
CREATE TABLE VANPHONGPHAM
(
	IDVPP INT PRIMARY KEY,
	IDNCC VARCHAR(10) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.NHACUNGCAP ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDLOAI VARCHAR(10) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.LOAI ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDTH VARCHAR(10) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.THUONGHIEU ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	TENVPP NVARCHAR(255) NOT NULL UNIQUE,
	TINHTRANG INT NOT NULL CHECK (TINHTRANG IN (1,2,3)), --1: CON HANG, 2: HET HANG, 3: NGUNG KINH DOANH
	GIABAN MONEY NOT NULL,
	GIANHAP MONEY NOT NULL,
	SOLUONG INT,
	DONVITINH NVARCHAR(30) NOT NULL,
	HINHANH CHAR(255) NOT NULL
)

GO 
CREATE TABLE HOADON
(
	IDHD VARCHAR(255) PRIMARY KEY,
	IDNV INT FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.NHANVIEN ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDKH VARCHAR(255) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.KHACHHANG ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	NGAYLAP DATE NOT NULL,
	TIENKHACHTRA MONEY NOT NULL,
	TIENTHOI MONEY NOT NULL,
	VAT MONEY
)

GO
CREATE TABLE CHITIETHD
(
	IDHD VARCHAR(255) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.HOADON ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDVPP INT FOREIGN KEY
	REFERENCES VPP_PHUONGNAM.DBO.VANPHONGPHAM ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	SL INT NOT NULL,
	DONGIA MONEY NOT NULL
)

GO 
CREATE TABLE PHIEUNHAP
(
	IDPN VARCHAR(255) PRIMARY KEY,
	IDNV INT FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.NHANVIEN ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	NGAYLAP DATE NOT NULL,
	TIENTRA MONEY NOT NULL,
	VAT MONEY,
	TIENNO MONEY
)

GO
CREATE TABLE CHITIETPN
(
	IDPN VARCHAR(255) FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.PHIEUNHAP ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDVPP INT FOREIGN KEY
	REFERENCES VPP_PHUONGNAM.DBO.VANPHONGPHAM ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	SL INT NOT NULL,
	DONGIANHAP MONEY NOT NULL
)

GO 
CREATE TABLE GIAMGIA
(
	IDGG INT PRIMARY KEY,
	NGAYBATDAU DATE NOT NULL,
	NGAYKETTHUC DATE NOT NULL,
	GIAMGIA FLOAT NOT NULL UNIQUE
)

GO 
CREATE TABLE SALE
(
	IDVPP INT FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.VANPHONGPHAM ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
	IDGG INT FOREIGN KEY 
	REFERENCES VPP_PHUONGNAM.DBO.GIAMGIA ON UPDATE CASCADE ON DELETE CASCADE NOT NULL
)
