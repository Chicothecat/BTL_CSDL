USE private_clinic_db;
-- Tinh doanh thu theo ngay kham (phi) va ngay ke don (thuoc); tranh join fan-out.
SET @from_date = '2026-10-01';
SET @to_date = '2026-11-01'; -- doc quyen: khoang [from, to)
SELECT f.tien_kham_chua_benh, m.tien_ban_thuoc,
       f.tien_kham_chua_benh + m.tien_ban_thuoc AS tong_doanh_thu
FROM (
 SELECT COALESCE(SUM(treatment_fee),0) AS tien_kham_chua_benh
 FROM visits WHERE admission_date>=@from_date AND admission_date<@to_date
) f
CROSS JOIN (
 SELECT COALESCE(SUM(i.quantity*i.unit_price),0) AS tien_ban_thuoc
 FROM prescriptions p JOIN prescription_items i ON i.prescription_id=p.prescription_id
 WHERE p.prescription_date>=@from_date AND p.prescription_date<@to_date
) m;
