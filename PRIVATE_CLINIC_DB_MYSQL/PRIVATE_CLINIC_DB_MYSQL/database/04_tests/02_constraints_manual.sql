USE private_clinic_db;
-- CAC LENH DUOI DAY PHAI CHAY RIENG TUNG LENH; DU KIEN LOI, KHONG CHAY TRONG SCRIPT KHOI TAO.
-- 1) FK khong ton tai: loi 1452
-- INSERT INTO visits VALUES('INVALID','DB_KHONG_CO',1,NOW(),NULL,NULL,NULL,0);
-- 2) visit_number trung trong mot dot: loi 1062
-- INSERT INTO visits VALUES('INVALID','DB01',1,NOW(),NULL,NULL,NULL,0);
-- 3) quantity am: CHECK violation
-- INSERT INTO prescription_items VALUES('DT01','T03',-1,1000,NULL,NULL);
-- 4) identity_number trung: UNIQUE violation
-- INSERT INTO doctors VALUES('BS99','001000000001','Duplicate','1980-01-01',NULL,NULL,0,NULL,NULL);
