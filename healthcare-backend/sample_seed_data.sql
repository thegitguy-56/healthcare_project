-- Sample data to populate charts and admin lists
-- Database: healthcare_temporal

-- Doctors
INSERT INTO Doctor (name, specialization) VALUES
('Dr. Emily Carter', 'General Medicine'),
('Dr. Rajesh Kumar', 'Pulmonology'),
('Dr. Sarah Ahmed', 'Cardiology'),
('Dr. David Lee', 'Endocrinology');

-- Users for login/admin
INSERT INTO Users (username, password, role) VALUES
('admin', 'admin123', 'Admin'),
('doctor1', 'doctor123', 'Doctor'),
('nurse1', 'nurse123', 'Nurse');

-- Patients (schema uses dob/phone)
INSERT INTO Patient (name, dob, gender, phone) VALUES
('Aarav Singh', '2001-06-12', 'Male', '9876500011'),
('Maya Sharma', '1987-03-22', 'Female', '9876500012'),
('Liam Joseph', '1975-09-05', 'Male', '9876500013'),
('Noah Thomas', '2010-11-14', 'Male', '9876500014'),
('Aisha Khan', '1993-01-30', 'Female', '9876500015'),
('Rohan Mehta', '1968-07-19', 'Male', '9876500016'),
('Sophia Patel', '1981-12-02', 'Female', '9876500017'),
('Ishaan Verma', '1959-04-09', 'Male', '9876500018');

-- Diagnosis history (drives disease distribution chart)
INSERT INTO Diagnosis_History (patient_id, doctor_id, disease, valid_from, valid_to) VALUES
(1, 1, 'Flu', '2025-01-04', '2025-01-18'),
(2, 2, 'Asthma', '2025-02-01', '2025-03-10'),
(3, 3, 'Hypertension', '2025-01-15', '2025-04-30'),
(4, 1, 'Flu', '2025-03-03', '2025-03-12'),
(5, 4, 'Diabetes', '2025-02-12', '2025-06-12'),
(6, 2, 'Pneumonia', '2025-01-27', '2025-03-02'),
(7, 3, 'Hypertension', '2025-04-01', '2025-08-01'),
(8, 4, 'Diabetes', '2025-05-10', '2025-09-30'),
(1, 1, 'Flu', '2025-08-10', '2025-08-19'),
(2, 2, 'Asthma', '2025-07-08', '2025-09-01'),
(5, 4, 'Diabetes', '2025-09-03', '2025-12-15'),
(6, 2, 'Pneumonia', '2025-10-01', '2025-10-28');

-- Treatment history (drives duration/trends/status charts)
INSERT INTO Treatment_History (patient_id, treatment_type, medication, valid_from, valid_to) VALUES
(1, 'Antiviral Therapy', 'Oseltamivir', '2025-01-05', '2025-01-10'),
(2, 'Inhalation Therapy', 'Budesonide', '2025-02-02', '2025-02-20'),
(3, 'Blood Pressure Management', 'Amlodipine', '2025-01-16', '2025-03-31'),
(4, 'Supportive Care', 'Paracetamol', '2025-03-03', '2025-03-08'),
(5, 'Glycemic Control', 'Metformin', '2025-02-13', '2025-04-25'),
(6, 'Antibiotic Course', 'Azithromycin', '2025-01-28', '2025-02-05'),
(7, 'Cardiac Monitoring', 'Losartan', '2025-04-01', '2025-06-20'),
(8, 'Insulin Management', 'Insulin Glargine', '2025-05-11', '2025-09-20'),
(1, 'Follow-up Care', 'Vitamin C', '2025-08-10', '2025-08-14'),
(2, 'Pulmonary Rehab', 'Montelukast', '2025-07-10', '2025-08-30'),
(5, 'Diet & Medication Review', 'Metformin', '2025-09-05', '2025-11-02'),
(6, 'Respiratory Follow-up', 'Levofloxacin', '2025-10-02', '2025-10-25'),
(3, 'Long-term Management', 'Telmisartan', '2026-01-01', '2026-04-15'),
(7, 'Advanced Follow-up', 'Atenolol', '2026-02-12', '2026-05-30');

-- Access logs for admin table
INSERT INTO Access_Log (user_role, table_accessed, access_time) VALUES
('Admin', 'Users', '2026-03-20 09:10:00'),
('Doctor', 'Patient', '2026-03-20 10:22:00'),
('Nurse', 'Treatment_History', '2026-03-20 11:40:00'),
('Admin', 'Diagnosis_History', '2026-03-21 08:30:00'),
('Doctor', 'Patient', '2026-03-21 12:05:00'),
('Admin', 'Access_Log', '2026-03-22 14:45:00');
