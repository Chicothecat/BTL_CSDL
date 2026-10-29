USE private_clinic_db;
SELECT 'doctors' AS ten_bang,COUNT(*) AS so_ban_ghi FROM doctors
UNION ALL SELECT 'nurses',COUNT(*) FROM nurses
UNION ALL SELECT 'patients',COUNT(*) FROM patients
UNION ALL SELECT 'diseases',COUNT(*) FROM diseases
UNION ALL SELECT 'medicines',COUNT(*) FROM medicines
UNION ALL SELECT 'disease_episodes',COUNT(*) FROM disease_episodes
UNION ALL SELECT 'visits',COUNT(*) FROM visits
UNION ALL SELECT 'nurse_activities',COUNT(*) FROM nurse_activities
UNION ALL SELECT 'prescriptions',COUNT(*) FROM prescriptions
UNION ALL SELECT 'prescription_items',COUNT(*) FROM prescription_items;
