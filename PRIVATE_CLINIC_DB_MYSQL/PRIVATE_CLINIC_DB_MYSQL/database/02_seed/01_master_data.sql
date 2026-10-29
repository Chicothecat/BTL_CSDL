USE private_clinic_db;
INSERT INTO doctors VALUES
('BS01','001000000001','Nguyen Van An','1980-01-12','Ha Noi','Bac 2',15,'Thac si','Noi khoa'),
('BS02','001000000002','Tran Thi Binh','1985-02-14','Ha Noi','Bac 1',10,'Bac si CKI','Tai mui hong'),
('BS03','001000000003','Le Van Cuong','1979-09-09','Ha Noi','Bac 3',20,'Tien si','Da lieu');
INSERT INTO nurses VALUES
('YT01','002000000001','Cao dang',7,'1993-04-12','Ha Noi','0900000001'),
('YT02','002000000002','Dai hoc',5,'1996-05-22','Ha Noi','0900000002'),
('YT03','002000000003','Cao dang',3,'1998-07-01','Ha Noi','0900000003');
INSERT INTO patients VALUES
('BN01','003000000001','Pham Minh Anh','2001-01-01','Ha Noi','0910000001'),
('BN02','003000000002','Hoang Thu Ha','2000-02-02','Ha Noi','0910000002'),
('BN03','003000000003','Do Thanh Nam','1999-03-03','Ha Noi','0910000003'),
('BN04','003000000004','Bui Linh Chi','2002-04-04','Ha Noi','0910000004'),
('BN05','003000000005','Vu Quang Huy','1997-05-05','Ha Noi','0910000005');
INSERT INTO diseases VALUES
('B01','Cam cum','Nhiem virus duong ho hap'),
('B02','Viem hong','Viem niem mac hong'),
('B03','Viem da','Tinh trang viem da');
INSERT INTO medicines VALUES
('T01','Paracetamol','Vien',5000),
('T02','Vitamin C','Vien',3000),
('T03','Dung dich sat khuan','Chai',25000),
('T04','Siro ho','Chai',40000);
