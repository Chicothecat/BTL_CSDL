# Cau hoi thuc nghiem va dap an du kien

**Trang thai:** Cac con so duoi day duoc tinh tu bo INSERT mau, **chua xac nhan bang MySQL Server**. Khi bao cao, chay Query1..Query5 va luu screenshot/output thuc te.

## Q1 — Thang 10/2026 benh nao nhieu dot?
- Cam cum (B01): **2 dot** (DB01, DB02) cua **1 benh nhan** BN01; co 4 lan kham nhung khong phai 4 dot.
- Viem hong (B02): **2 dot** (DB03, DB05), **2 benh nhan**; DB05 bat dau trong thang 9 nhung co tai kham thang 10.
- Viem da (B03): **1 dot** (DB06), **1 benh nhan**.
- Sap xep theo so dot giam dan, dong hang theo ma benh.

## Q2 — Luong thang 10/2026?
- BS01: 7tr + 2 dot (DB01,DB02) = **9.000.000**.
- BS02: 7tr + 1 dot (DB05) = **8.000.000**.
- BS03: 7tr + 0 = **7.000.000** (DB04 khoi thang 9, DB06 chua khoi).
- YT01: co LK01,LK02,LK09 = 3 cap => **5.600.000**; HT01+HT02 cung LK01 chi tinh 1.
- YT02: LK03,LK04,LK05,LK10 = 4 cap => **5.800.000**.
- YT03: LK10 = 1 cap => **5.200.000**; LK06,LK07 thuoc thang 9.
- Vi ERD thieu HoTen y ta, Query2 hien CMT cho y ta (khong tu them truong).

## Q3 — Benh nhan BN01?
- BN01 co **2 dot benh B01** DB01,DB02 va **4 luot kham** LK01..LK04.
- Ca hai dot DA_KHOI; result grid `dang dieu tri` **rong**.
- Thay @patient_id = 'BN02' thi co DB03 DANG_DIEU_TRI, 1 luot, lan tiep theo so 2.

## Q4 — Doanh thu thang 10/2026?
- Tien kham: LK01,02,03,04,05,09,10 = 100k+80k+120k+70k+110k+90k+140k = **710.000**.
- Tien thuoc: DT01 65k + DT02 44k + DT03 40k + DT06 25k = **174.000**.
- Tong: **884.000 VND**.
- DT04,DT05 ke thang 9 khong tinh; don gia 5500 cua T01 tren DT02 khac gia hien tai 5000 (gia luu thoi diem).

## Q5 — So ban ghi trong seed?
- doctors=3; nurses=3; patients=5; diseases=3; medicines=4.
- disease_episodes=6; visits=10; nurse_activities=12; prescriptions=6; prescription_items=7.

## Cau hoi van dap
1. **Tai sao can DOT_DIEU_TRI?** De tach dot mac benh voi luot tai kham. Tai phat tao dot moi.
2. **Tai sao moi dot chi co mot bac si?** `doctor_id` la FK bat buoc trong disease_episodes, giup thong nhat bac si trong moi dot.
3. **Tai sao Query1 dung COUNT(DISTINCT episode_id)?** JOIN voi visits tao nhieu dong cho mot dot, DISTINCT chan dem trung.
4. **Tai sao Query1 co ca so benh nhan phan biet?** De phan biet chi so 'so dot' (co tai phat) voi 'so nguoi' (khong trung).
5. **Khi nao bac si duoc thuong?** Thang co `end_date` va status DA_KHOI.
6. **Tai sao y ta khong duoc thuong 2 lan tren LK01?** Quy uoc 200k cho 1 cap y ta-luot kham, dung DISTINCT.
7. **Tai sao khong tinh SUM tren JOIN visits/prescriptions/items truc tiep?** Join 1:N nhan dong, de lam doi tien kham; tinh rieng roi cong.
8. **Gia thuoc lay tu dau?** `prescription_items.unit_price`, khong phai `medicines.current_price`.
9. **UNIQUE(episode_id,visit_number) co tac dung gi?** Ngan trung so thu tu lan kham trong mot dot.
10. **Khoa ngoai bao ve gi?** Ngan lan kham tham chieu dot khong ton tai; ho tro va don thuoc tham chieu lan kham khong ton tai.
11. **Neu benh nhan bat dau dot cuoi thang 9, tai kham thang 10?** Query1 hien tai dem dot benh theo ngay *co luot kham*, nen DB05 duoc dem trong thang 10; neu giang vien muon dem theo ngay bat dau, can doi quy tac loc ngay.
12. **Dau la ket qua thuc nghiem that?** Chua co; phai chay tren MySQL va chup ket qua. File `01_assert_sample.sql` la kiem thu tu dong de doi chieu.

## Goi y bao cao thuc nghiem
Voi moi Query: muc tieu → dau vao → SQL → bang ket qua thuc thi → giai thich truong hop bien → PASS/FAIL. Ghi ro MySQL version, thoi diem chay, kich thuoc bo du lieu. Khong ghi du kien la so lieu do thuc thi.
