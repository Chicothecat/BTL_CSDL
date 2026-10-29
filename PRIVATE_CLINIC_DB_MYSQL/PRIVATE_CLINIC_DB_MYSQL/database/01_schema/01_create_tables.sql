USE private_clinic_db;
-- ERD: BAC_SY
CREATE TABLE IF NOT EXISTS doctors (
 doctor_id VARCHAR(20) PRIMARY KEY,
 identity_number VARCHAR(12) NOT NULL UNIQUE,
 full_name VARCHAR(100) NOT NULL,
 date_of_birth DATE NOT NULL,
 address VARCHAR(255),
 professional_rank VARCHAR(50),
 years_experience INT NOT NULL DEFAULT 0 CHECK (years_experience >= 0),
 education_level VARCHAR(100),
 specialty VARCHAR(100)
) ENGINE=InnoDB;
-- ERD: Y_TA (ERD KHONG co HoTen)
CREATE TABLE IF NOT EXISTS nurses (
 nurse_id VARCHAR(20) PRIMARY KEY,
 identity_number VARCHAR(12) NOT NULL UNIQUE,
 education_level VARCHAR(100),
 years_experience INT NOT NULL DEFAULT 0 CHECK (years_experience >= 0),
 date_of_birth DATE NOT NULL,
 address VARCHAR(255),
 phone VARCHAR(15)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS patients (
 patient_id VARCHAR(20) PRIMARY KEY,
 identity_number VARCHAR(12) NOT NULL UNIQUE,
 full_name VARCHAR(100) NOT NULL,
 date_of_birth DATE NOT NULL,
 address VARCHAR(255),
 phone VARCHAR(15)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS diseases (
 disease_id VARCHAR(20) PRIMARY KEY,
 disease_name VARCHAR(150) NOT NULL,
 description TEXT
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS medicines (
 medicine_id VARCHAR(20) PRIMARY KEY,
 medicine_name VARCHAR(150) NOT NULL,
 unit VARCHAR(30),
 current_price DECIMAL(12,2) NOT NULL CHECK (current_price >= 0)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS disease_episodes (
 episode_id VARCHAR(20) PRIMARY KEY,
 patient_id VARCHAR(20) NOT NULL,
 doctor_id VARCHAR(20) NOT NULL,
 disease_id VARCHAR(20) NOT NULL,
 start_date DATE NOT NULL,
 end_date DATE NULL,
 status VARCHAR(20) NOT NULL,
 CONSTRAINT fk_ep_patient FOREIGN KEY(patient_id) REFERENCES patients(patient_id),
 CONSTRAINT fk_ep_doctor FOREIGN KEY(doctor_id) REFERENCES doctors(doctor_id),
 CONSTRAINT fk_ep_disease FOREIGN KEY(disease_id) REFERENCES diseases(disease_id),
 CONSTRAINT ck_ep_status CHECK(status IN ('DANG_DIEU_TRI','DA_KHOI')),
 CONSTRAINT ck_ep_dates CHECK(end_date IS NULL OR end_date >= start_date),
 CONSTRAINT ck_ep_cured CHECK((status='DA_KHOI' AND end_date IS NOT NULL) OR (status='DANG_DIEU_TRI' AND end_date IS NULL))
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS visits (
 visit_id VARCHAR(20) PRIMARY KEY,
 episode_id VARCHAR(20) NOT NULL,
 visit_number INT NOT NULL CHECK(visit_number > 0),
 admission_date DATETIME NOT NULL,
 discharge_date DATETIME NULL,
 examination_result TEXT,
 notes TEXT,
 treatment_fee DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK(treatment_fee >= 0),
 CONSTRAINT fk_visit_episode FOREIGN KEY(episode_id) REFERENCES disease_episodes(episode_id),
 CONSTRAINT uq_visit_number UNIQUE (episode_id,visit_number),
 CONSTRAINT ck_visit_dates CHECK(discharge_date IS NULL OR discharge_date >= admission_date)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS nurse_activities (
 activity_id VARCHAR(20) PRIMARY KEY,
 visit_id VARCHAR(20) NOT NULL,
 nurse_id VARCHAR(20) NOT NULL,
 activity_type VARCHAR(50) NOT NULL,
 activity_time DATETIME NOT NULL,
 notes TEXT,
 CONSTRAINT fk_activity_visit FOREIGN KEY(visit_id) REFERENCES visits(visit_id),
 CONSTRAINT fk_activity_nurse FOREIGN KEY(nurse_id) REFERENCES nurses(nurse_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS prescriptions (
 prescription_id VARCHAR(20) PRIMARY KEY,
 visit_id VARCHAR(20) NOT NULL,
 prescription_date DATE NOT NULL,
 notes TEXT,
 CONSTRAINT fk_pres_visit FOREIGN KEY(visit_id) REFERENCES visits(visit_id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS prescription_items (
 prescription_id VARCHAR(20) NOT NULL,
 medicine_id VARCHAR(20) NOT NULL,
 quantity INT NOT NULL CHECK(quantity > 0),
 unit_price DECIMAL(12,2) NOT NULL CHECK(unit_price >= 0),
 dosage VARCHAR(100),
 instructions VARCHAR(255),
 PRIMARY KEY (prescription_id,medicine_id),
 CONSTRAINT fk_item_pres FOREIGN KEY(prescription_id) REFERENCES prescriptions(prescription_id),
 CONSTRAINT fk_item_med FOREIGN KEY(medicine_id) REFERENCES medicines(medicine_id)
) ENGINE=InnoDB;
