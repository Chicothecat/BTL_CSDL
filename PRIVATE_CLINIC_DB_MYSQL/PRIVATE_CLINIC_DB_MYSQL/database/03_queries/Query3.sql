USE private_clinic_db;
-- Thong tin benh nhan va toan bo lich su; 3 result sets.
SET @patient_id = 'BN01';
SELECT * FROM patients WHERE patient_id=@patient_id;
SELECT ep.episode_id, d.disease_name, bs.doctor_id, bs.full_name AS ten_bac_si,
       ep.start_date,ep.end_date,ep.status,v.visit_id,v.visit_number,
       v.admission_date,v.discharge_date,v.examination_result,v.notes,v.treatment_fee
FROM disease_episodes ep
JOIN diseases d ON d.disease_id=ep.disease_id
JOIN doctors bs ON bs.doctor_id=ep.doctor_id
LEFT JOIN visits v ON v.episode_id=ep.episode_id
WHERE ep.patient_id=@patient_id
ORDER BY ep.start_date, ep.episode_id, v.visit_number;
SELECT ep.episode_id,d.disease_name,ep.start_date,ep.status,
       COUNT(v.visit_id) AS so_lan_da_kham,
       COALESCE(MAX(v.visit_number),0)+1 AS so_thu_tu_lan_kham_tiep_theo
FROM disease_episodes ep
JOIN diseases d ON d.disease_id=ep.disease_id
LEFT JOIN visits v ON v.episode_id=ep.episode_id
WHERE ep.patient_id=@patient_id AND ep.status='DANG_DIEU_TRI'
GROUP BY ep.episode_id,d.disease_name,ep.start_date,ep.status
ORDER BY ep.start_date;
