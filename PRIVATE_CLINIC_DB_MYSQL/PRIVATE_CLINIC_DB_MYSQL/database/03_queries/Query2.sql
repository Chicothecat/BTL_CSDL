USE private_clinic_db;
-- Thuong bac si: moi dot DA_KHOI voi end_date thuoc thang: 1,000,000.
-- Thuong y ta: moi cap (nurse_id, visit_id) co ho tro trong thang: 200,000.
SET @report_year = 2026;
SET @report_month = 10;
SET @from_date = STR_TO_DATE(CONCAT(@report_year,'-',LPAD(@report_month,2,'0'),'-01'),'%Y-%m-%d');
SET @to_date = DATE_ADD(@from_date,INTERVAL 1 MONTH);
SELECT 'BAC_SI' AS loai_nhan_vien, d.doctor_id AS ma_nhan_vien,
       d.full_name AS nhan_dien, 7000000 AS luong_co_ban,
       COUNT(ep.episode_id) AS so_luot_thuong, 1000000 AS muc_thuong,
       7000000 + COUNT(ep.episode_id)*1000000 AS tong_luong
FROM doctors d
LEFT JOIN disease_episodes ep ON ep.doctor_id=d.doctor_id AND ep.status='DA_KHOI'
  AND ep.end_date >= @from_date AND ep.end_date < @to_date
GROUP BY d.doctor_id,d.full_name
UNION ALL
SELECT 'Y_TA', n.nurse_id, n.identity_number, 5000000,
       COUNT(x.visit_id),200000,5000000+COUNT(x.visit_id)*200000
FROM nurses n
LEFT JOIN (
 SELECT DISTINCT nurse_id,visit_id
 FROM nurse_activities
 WHERE activity_time >= @from_date AND activity_time < @to_date
) x ON x.nurse_id=n.nurse_id
GROUP BY n.nurse_id,n.identity_number
ORDER BY loai_nhan_vien, ma_nhan_vien;
