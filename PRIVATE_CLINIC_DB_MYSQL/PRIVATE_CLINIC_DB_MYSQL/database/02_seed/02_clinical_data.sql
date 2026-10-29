USE private_clinic_db;
-- BN01 cam cum dot DB01 2 lan, khoi; tai phat DB02 1 lan, khoi (Query1 dem 2 dot)
-- DB03 dang dieu tri; DB04 khoi thang 9; DB05 khoi thang 10; DB06 dang dieu tri
INSERT INTO disease_episodes VALUES
('DB01','BN01','BS01','B01','2026-10-02','2026-10-07','DA_KHOI'),
('DB02','BN01','BS01','B01','2026-10-18','2026-10-21','DA_KHOI'),
('DB03','BN02','BS02','B02','2026-10-10',NULL,'DANG_DIEU_TRI'),
('DB04','BN03','BS03','B03','2026-09-05','2026-09-09','DA_KHOI'),
('DB05','BN04','BS02','B02','2026-09-29','2026-10-04','DA_KHOI'),
('DB06','BN05','BS03','B03','2026-10-22',NULL,'DANG_DIEU_TRI');
INSERT INTO visits VALUES
('LK01','DB01',1,'2026-10-02 09:00:00','2026-10-02 09:30:00','Cam cum','Kham lan dau',100000),
('LK02','DB01',2,'2026-10-07 09:00:00','2026-10-07 09:20:00','Da khoi','Tai kham',80000),
('LK03','DB02',1,'2026-10-18 10:00:00','2026-10-18 10:30:00','Tai phat','Dot moi',120000),
('LK04','DB02',2,'2026-10-21 10:00:00','2026-10-21 10:20:00','Da khoi','Tai kham',70000),
('LK05','DB03',1,'2026-10-10 08:00:00','2026-10-10 08:30:00','Viem hong','Theo doi',110000),
('LK06','DB04',1,'2026-09-05 09:00:00','2026-09-05 09:30:00','Viem da','Kham',130000),
('LK07','DB04',2,'2026-09-09 09:00:00','2026-09-09 09:30:00','Da khoi','Tai kham',60000),
('LK08','DB05',1,'2026-09-29 11:00:00','2026-09-29 11:30:00','Viem hong','Kham',100000),
('LK09','DB05',2,'2026-10-04 11:00:00','2026-10-04 11:20:00','Da khoi','Tai kham',90000),
('LK10','DB06',1,'2026-10-22 14:00:00','2026-10-22 14:30:00','Viem da','Theo doi',140000);
-- YT01 thuc hien hai hoat dong tren LK01 -> chi mot lan thuong cho cap (YT01,LK01)
INSERT INTO nurse_activities VALUES
('HT01','LK01','YT01','TIEP_DON','2026-10-02 08:50:00',''),
('HT02','LK01','YT01','CAP_THUOC','2026-10-02 09:20:00',''),
('HT03','LK02','YT01','THEO_DOI','2026-10-07 09:10:00',''),
('HT04','LK03','YT02','TIEP_DON','2026-10-18 09:50:00',''),
('HT05','LK04','YT02','THEO_DOI','2026-10-21 10:10:00',''),
('HT06','LK05','YT02','TIEM_THUOC','2026-10-10 08:15:00',''),
('HT07','LK06','YT03','CHAM_SOC','2026-09-05 09:10:00',''),
('HT08','LK07','YT03','THEO_DOI','2026-09-09 09:10:00',''),
('HT09','LK08','YT01','TIEP_DON','2026-09-29 10:50:00',''),
('HT10','LK09','YT01','THEO_DOI','2026-10-04 11:10:00',''),
('HT11','LK10','YT03','CHAM_SOC','2026-10-22 14:15:00',''),
('HT12','LK10','YT02','CAP_THUOC','2026-10-22 14:20:00','');
INSERT INTO prescriptions VALUES
('DT01','LK01','2026-10-02','Don 1'),
('DT02','LK03','2026-10-18','Don 2'),
('DT03','LK05','2026-10-10','Don 3'),
('DT04','LK06','2026-09-05','Don 4'),
('DT05','LK08','2026-09-29','Don 5'),
('DT06','LK10','2026-10-22','Don 6');
INSERT INTO prescription_items VALUES
('DT01','T01',10,5000,'1 vien','Sau an'),
('DT01','T02',5,3000,'1 vien','Buoi sang'),
('DT02','T01',8,5500,'1 vien','Sau an'),
('DT03','T04',1,40000,'10 ml','Ngay 2 lan'),
('DT04','T03',2,25000,'1 lan','Ngoai da'),
('DT05','T04',1,40000,'10 ml','Ngay 2 lan'),
('DT06','T03',1,25000,'1 lan','Ngoai da');
