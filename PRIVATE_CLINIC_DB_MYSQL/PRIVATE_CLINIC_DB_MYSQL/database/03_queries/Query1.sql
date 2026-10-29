USE private_clinic_db;
-- THAM SO: thang, nam. Dem dot benh co it nhat mot lan kham TRONG thang.
-- Cung benh, cung benh nhan, nhieu lan kham trong 1 dot -> 1; tai phat -> dot moi.
SET @report_year = 2026;
SET @report_month = 10;
SET @from_date = STR_TO_DATE(CONCAT(@report_year,'-',LPAD(@report_month,2,'0'),'-01'),'%Y-%m-%d');
SET @to_date = DATE_ADD(@from_date,INTERVAL 1 MONTH);
SELECT d.disease_id, d.disease_name,
       COUNT(DISTINCT ep.episode_id) AS so_dot_mac_benh,
       COUNT(DISTINCT ep.patient_id) AS so_benh_nhan_phan_biet
FROM diseases d
JOIN disease_episodes ep ON ep.disease_id=d.disease_id
JOIN visits v ON v.episode_id=ep.episode_id
WHERE v.admission_date >= @from_date AND v.admission_date < @to_date
GROUP BY d.disease_id,d.disease_name
ORDER BY so_dot_mac_benh DESC,d.disease_id;
