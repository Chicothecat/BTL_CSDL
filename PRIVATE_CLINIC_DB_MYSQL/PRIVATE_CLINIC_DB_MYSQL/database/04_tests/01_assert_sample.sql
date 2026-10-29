USE private_clinic_db;
-- Moi dong 'PASS' la du kien cho bo seed di kem.
SELECT 'Q1: Cam cum 2 dot trong thang 10' AS kiem_thu,
 IF((SELECT COUNT(DISTINCT ep.episode_id) FROM disease_episodes ep JOIN visits v ON v.episode_id=ep.episode_id WHERE ep.disease_id='B01' AND v.admission_date>='2026-10-01' AND v.admission_date<'2026-11-01')=2,'PASS','FAIL') AS ket_qua
UNION ALL
SELECT 'Q2: BS01 khoi 2 dot',IF((SELECT COUNT(*) FROM disease_episodes WHERE doctor_id='BS01' AND status='DA_KHOI' AND end_date>='2026-10-01' AND end_date<'2026-11-01')=2,'PASS','FAIL')
UNION ALL
SELECT 'Q2: YT01 co 3 cap (YT, LK) thang 10',IF((SELECT COUNT(DISTINCT visit_id) FROM nurse_activities WHERE nurse_id='YT01' AND activity_time>='2026-10-01' AND activity_time<'2026-11-01')=3,'PASS','FAIL')
UNION ALL
SELECT 'Q3: BN01 co 2 dot benh',IF((SELECT COUNT(*) FROM disease_episodes WHERE patient_id='BN01')=2,'PASS','FAIL')
UNION ALL
SELECT 'Q5: 10 visits',IF((SELECT COUNT(*) FROM visits)=10,'PASS','FAIL')
UNION ALL
SELECT 'Q5: 12 activities',IF((SELECT COUNT(*) FROM nurse_activities)=12,'PASS','FAIL')
UNION ALL
SELECT 'Q4: doanh thu thang 10 = 884000',IF(
 (SELECT COALESCE(SUM(treatment_fee),0) FROM visits WHERE admission_date>='2026-10-01' AND admission_date<'2026-11-01')+
 (SELECT COALESCE(SUM(i.quantity*i.unit_price),0) FROM prescriptions p JOIN prescription_items i ON i.prescription_id=p.prescription_id WHERE p.prescription_date>='2026-10-01' AND p.prescription_date<'2026-11-01')=884000,'PASS','FAIL');
