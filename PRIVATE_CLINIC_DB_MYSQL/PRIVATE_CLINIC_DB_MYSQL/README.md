# PRIVATE_CLINIC_DB — MySQL 8.0+ — Project 1 phong kham

Project **bam sat 10 thuc the cua anh ERD**, cac bang va truy van co code thuc thi. Muc tieu la quan ly phong kham tu nhan (khong mo hinh benh vien nhieu khoa/phong).

## Chay voi MySQL Workbench
1. Cai MySQL Server 8.0+ va MySQL Workbench, tao ket noi toi local server.
2. Mo va bam tia set (Execute All) **tung file theo dung thu tu**: `database/00_setup/01_create_database.sql`, `database/01_schema/01_create_tables.sql`, `database/02_seed/01_master_data.sql`, `database/02_seed/02_clinical_data.sql`.
3. Mo `database/03_queries/Query1.sql` va bam Execute All; Query2..Query5 tuong tu. Query3 tra ra **3 result grids**.
4. Chay `database/04_tests/01_assert_sample.sql` de so sanh PASS/FAIL.
5. Neu muon reset: chay `database/05_reset/01_reset_tables.sql` **(xoa du lieu)**, sau do lap lai 4 buoc khoi tao.

## Chay voi mysql CLI
Tu terminal tai thu muc goc (khong dung cho ket noi dung database khac):

```bash
mysql -u root -p < database/00_setup/01_create_database.sql
mysql -u root -p < database/01_schema/01_create_tables.sql
mysql -u root -p < database/02_seed/01_master_data.sql
mysql -u root -p < database/02_seed/02_clinical_data.sql
mysql -u root -p < database/03_queries/Query1.sql
mysql -u root -p < database/04_tests/01_assert_sample.sql
```

Trong CLI se yeu cau mat khau moi lan. Tren Windows PowerShell cu phap `<` co the khong hoat dong: su dung CMD hoac vao mysql shell roi `SOURCE C:/duong-dan/database/.../file.sql;`.

## Tham so
- Query1, Query2: doi `@report_year`, `@report_month` dau file.
- Query3: doi `@patient_id` (vd BN01, BN02).
- Query4: doi `@from_date`, `@to_date` (khoang [from_date, to_date), khong bao gom ngay ket thuc).
- Query5: khong can tham so.

## Han che va quy uoc
- Chi bao gom phan MySQL, khong co ung dung Java/Spring, Redis hay ban thiet ke PDF.
- Chua thuc thi tren MySQL Server trong moi truong tao ZIP (khong co MySQL). Ket qua tai lieu la **ket qua du kien tinh tu seed**, can chay test de xac nhan.
- Viec de nghi nop file `.pdf`, `.sql` va link ung dung Java/Spring duoc nêu trong de bai nhom 02; ma nguon nay phuc vu phan SQL.
- Script seed khong idempotent: dung chay 2 lan INSERT neu chua reset.
- Doi voi quy tac 'benh nhan khoi roi tai phat', tao `episode_id` moi; khong gop nhieu dot.
- Ket qua `so_benh_nhan_phan_biet` trong Query1 la metric bo sung; so dot mac benh la chi so sap xep.

Xem `docs/ERD_MAPPING.md` va `docs/THUC_NGHIEM_QA.md` de giai thich ERD va ket qua.
