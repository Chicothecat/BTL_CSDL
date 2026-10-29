import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  Boxes,
  ClipboardList,
  FlaskConical,
  HeartPulse,
  Pill,
  Receipt,
  Stethoscope,
  Table2,
  UserRound,
  Users,
} from "lucide-react";
import {
  bacSi,
  benh,
  benhNhan,
  chanDoan,
  doanhThu,
  dotDieuTri,
  donThuocCuaBenhNhan,
  hoTro,
  lanKham,
  lichSuBenhNhan,
  tableCounts,
  thanhPhanDonThuoc,
  thuoc,
  vnd,
  xacNhanBiBenh,
  yTa,
  type BenhNhan,
} from "@/data/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Phòng khám Thanh Bình — Web demo tra cứu" },
      {
        name: "description",
        content:
          "Web demo CSDL phòng khám: bác sĩ xem bệnh nhân & y tá, y tá xem lịch sử khám, bệnh nhân xem thuốc đã mua và lịch sử khám.",
      },
      { property: "og:title", content: "Phòng khám Thanh Bình — Web demo tra cứu" },
      {
        property: "og:description",
        content:
          "Demo 3 vai trò Bác sĩ / Y tá / Bệnh nhân trên dữ liệu mẫu phòng khám tháng 10/2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type Role = "bacsi" | "yta" | "benhnhan";

const ROLES: { id: Role; title: string; desc: string; icon: typeof Stethoscope }[] = [
  { id: "bacsi", title: "Bác sĩ", desc: "Thông tin bệnh nhân, y tá, đợt điều trị", icon: Stethoscope },
  { id: "yta", title: "Y tá", desc: "Thông tin bệnh nhân, lịch sử khám", icon: HeartPulse },
  { id: "benhnhan", title: "Bệnh nhân", desc: "Thuốc đã mua, lịch sử khám của mình", icon: UserRound },
];

function Badge({ children, tone = "teal" }: { children: string; tone?: "teal" | "amber" | "green" }) {
  const tones = {
    teal: "bg-primary/10 text-primary",
    amber: "bg-destructive/10 text-destructive",
    green: "bg-success/15 text-success",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}>{children}</div>
  );
}

function SectionTitle({ icon: Icon, title, desc }: { icon: typeof Stethoscope; title: string; desc?: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {desc ? <p className="text-xs text-muted-foreground">{desc}</p> : null}
      </div>
    </div>
  );
}

function DataTable({ head, rows, empty }: { head: string[]; rows: (string | number | React.ReactNode)[][]; empty?: string }) {
  if (rows.length === 0) {
    return <p className="rounded-lg bg-muted px-3 py-4 text-center text-sm text-muted-foreground">{empty ?? "Chưa có dữ liệu"}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60 text-left">
            {head.map((h) => (
              <th key={h} className="whitespace-nowrap px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-3 py-2 text-foreground/90">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function fmtDate(s: string) {
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
}

// ===== Q3: lịch sử bệnh nhân =====
function LichSuBenhNhan({ bn, chiThuocMua = false }: { bn: BenhNhan; chiThuocMua?: boolean }) {
  const lichSu = lichSuBenhNhan(bn.maBN);
  const dons = donThuocCuaBenhNhan(bn.maBN);

  return (
    <div className="space-y-4">
      <SectionTitle
        icon={ClipboardList}
        title={`Lịch sử khám của ${bn.hoTen}`}
        desc={`Mã bệnh nhân ${bn.maBN} — tổng ${lichSu.reduce((s, d) => s + d.lanKhams.length, 0)} lần khám`}
      />
      {lichSu.map((dot) => (
        <Card key={dot.maDot}>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-bold text-foreground">{dot.tenBenh}</span>
            <Badge tone={dot.trangThai === "Đang điều trị" ? "amber" : "green"}>{dot.trangThai}</Badge>
            <span className="text-xs text-muted-foreground">
              Mã đợt {dot.maDot} · {fmtDate(dot.ngayBatDau)}
              {dot.ngayKetThuc ? ` → ${fmtDate(dot.ngayKetThuc)}` : " → đang điều trị"}
            </span>
          </div>
          <DataTable
            head={["Lần khám", "Mã", "Ngày vào", "Ngày ra", "Kết quả khám"]}
            rows={dot.lanKhams.map((lk) => [
              `Lần ${lk.stt}`,
              lk.maLanKham,
              fmtDate(lk.ngayVao),
              lk.ngayRa ? fmtDate(lk.ngayRa) : "—",
              lk.ketQuaKham,
            ])}
          />
        </Card>
      ))}

      <SectionTitle icon={Pill} title="Thuốc đã mua" desc="Chỉ từ các đơn thuốc đã kê cho bạn" />
      {dons.length === 0 ? (
        <p className="rounded-lg bg-muted px-3 py-4 text-center text-sm text-muted-foreground">Chưa có đơn thuốc nào</p>
      ) : (
        dons.map((don) => (
          <Card key={don.maDon}>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-foreground">Đơn {don.maDon}</span>
              <span className="text-xs text-muted-foreground">Kê ngày {fmtDate(don.ngayKeDon)} · {don.ghiChu}</span>
            </div>
            <DataTable
              head={["Thuốc", "Số lượng", "Liều dùng", "Cách sử dụng", "Thành tiền"]}
              rows={don.items.map((it) => [
                it.tenThuoc,
                `${it.soLuong} ${it.donViTinh}`,
                it.lieuDung,
                it.cachSuDung,
                vnd(it.thanhTien),
              ])}
            />
            <p className="mt-2 text-right text-sm font-semibold text-primary">Tổng tiền thuốc: {vnd(don.tongTien)}</p>
          </Card>
        ))
      )}
      {!chiThuocMua && lichSu.some((d) => d.trangThai === "Đang điều trị") ? (
        <p className="rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          ⚠️ Bệnh nhân còn đợt điều trị đang mở ({lichSu.filter((d) => d.trangThai === "Đang điều trị").map((d) => d.tenBenh).join(", ")}).
        </p>
      ) : null}
    </div>
  );
}

// ===== Q5: thống kê bản ghi từng bảng =====
function ThongKeCSDL() {
  const tong = tableCounts.reduce((s, t) => s + t.n, 0);
  return (
    <Card>
      <SectionTitle icon={Table2} title="Q5 — Thống kê số lượng bản ghi từng bảng" desc="CSDL phòng khám · dữ liệu mẫu tháng 10/2026" />
      <DataTable
        head={["Bảng", "Ý nghĩa", "Số bản ghi"]}
        rows={[
          ...tableCounts.map((t) => [
            <span className="font-mono text-xs font-semibold text-primary">{t.bang}</span>,
            t.moTa,
            <span className="font-bold">{t.n}</span>,
          ]),
          [
            "",
            <span className="font-bold">Tổng cộng (15 bảng)</span>,
            <span className="font-bold text-primary">{tong}</span>,
          ],
        ]}
      />
    </Card>
  );
}

// ===== Góc nhìn Bác sĩ =====
function DoctorView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Bệnh nhân", value: benhNhan.length },
          { icon: Activity, label: "Đợt đang điều trị", value: dotDieuTri.filter((d) => d.trangThai === "Đang điều trị").length },
          { icon: Receipt, label: "Tiền khám (T10)", value: vnd(doanhThu.kham) },
          { icon: Pill, label: "Tiền thuốc (T10)", value: vnd(doanhThu.thuoc) },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg font-bold text-foreground">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <SectionTitle icon={Users} title="Thông tin bệnh nhân" desc="Xem toàn bộ hồ sơ bệnh nhân" />
        <DataTable
          head={["Mã", "Họ tên", "Ngày sinh", "Địa chỉ", "SĐT", "Số đợt điều trị", "Tình trạng"]}
          rows={benhNhan.map((bn) => {
            const lichSu = lichSuBenhNhan(bn.maBN);
            const con = lichSu.some((d) => d.trangThai === "Đang điều trị");
            return [
              bn.maBN,
              bn.hoTen,
              fmtDate(bn.ngaySinh),
              bn.diaChi,
              bn.sdt,
              lichSu.length,
              con ? <Badge tone="amber">Còn điều trị</Badge> : <Badge tone="green">Đã khỏi</Badge>,
            ];
          })}
        />
      </div>

      <div>
        <SectionTitle icon={HeartPulse} title="Thông tin y tá" desc="Danh sách và trình độ điều dưỡng" />
        <DataTable
          head={["Mã", "Họ tên", "Ngày sinh", "Địa chỉ", "SĐT", "Trình độ", "Thâm niên", "Số lần hỗ trợ"]}
          rows={yTa.map((yt) => [
            yt.maYT,
            yt.hoTen,
            fmtDate(yt.ngaySinh),
            yt.diaChi,
            yt.sdt,
            yt.trinhDo,
            `${yt.thamNien} năm`,
            hoTro.filter((h) => h.maYT === yt.maYT).length,
          ])}
        />
      </div>

      <div>
        <SectionTitle icon={FlaskConical} title="Q3 — Lịch sử bệnh nhân & bệnh còn điều trị" desc="Đợt điều trị, số lần khám, trạng thái" />
        <DataTable
          head={["Bệnh nhân", "Bệnh", "Mã đợt", "Bắt đầu", "Kết thúc", "Số lần khám", "Trạng thái"]}
          rows={benhNhan.flatMap((bn) =>
            lichSuBenhNhan(bn.maBN).map((d) => [
              bn.hoTen,
              d.tenBenh,
              d.maDot,
              fmtDate(d.ngayBatDau),
              d.ngayKetThuc ? fmtDate(d.ngayKetThuc) : "—",
              `${d.lanKhams.length} lần`,
              <Badge tone={d.trangThai === "Đang điều trị" ? "amber" : "green"}>{d.trangThai}</Badge>,
            ]),
          )}
        />
      </div>

      <ThongKeCSDL />
    </div>
  );
}

// ===== Góc nhìn Y tá =====
function NurseView() {
  return (
    <div className="space-y-6">
      <div>
        <SectionTitle icon={Users} title="Thông tin bệnh nhân" desc="Hồ sơ và tình trạng điều trị" />
        <DataTable
          head={["Mã", "Họ tên", "Ngày sinh", "Địa chỉ", "SĐT", "Tình trạng"]}
          rows={benhNhan.map((bn) => {
            const con = lichSuBenhNhan(bn.maBN).some((d) => d.trangThai === "Đang điều trị");
            return [
              bn.maBN,
              bn.hoTen,
              fmtDate(bn.ngaySinh),
              bn.diaChi,
              bn.sdt,
              con ? <Badge tone="amber">Còn điều trị</Badge> : <Badge tone="green">Đã khỏi</Badge>,
            ];
          })}
        />
      </div>

      <div>
        <SectionTitle icon={ClipboardList} title="Q3 — Lịch sử khám" desc="Tất cả lần khám, theo thứ tự trong đợt điều trị" />
        <DataTable
          head={["Lần khám", "Bệnh nhân", "Bệnh", "Ngày vào", "Kết quả khám", "Ghi chú", "Y tá hỗ trợ", "Phí khám"]}
          rows={lanKham
            .slice()
            .sort((a, b) => a.ngayVao.localeCompare(b.ngayVao))
            .map((lk) => {
              const dot = dotDieuTri.find((d) => d.maDot === lk.maDot)!;
              const bn = benhNhan.find((b) => b.maBN === xacNhanBiBenhOf(dot.maDot))!;
              const tenBenh = benh.find((b) => b.maBenh === chanDoanOf(dot.maDot))?.tenBenh ?? "?";
              const stt = lanKham
                .filter((l) => l.maDot === lk.maDot)
                .sort((x, y) => x.ngayVao.localeCompare(y.ngayVao))
                .findIndex((l) => l.maLanKham === lk.maLanKham) + 1;
              const yt = hoTro.find((h) => h.maLanKham === lk.maLanKham)?.maYT ?? "—";
              return [
                `Lần ${stt} (${lk.maLanKham})`,
                bn?.hoTen ?? "?",
                tenBenh,
                fmtDate(lk.ngayVao),
                lk.ketQuaKham,
                lk.ghiChu,
                yt,
                vnd(lk.phiKham),
              ];
            })}
        />
      </div>

      <ThongKeCSDL />
    </div>
  );
}

function xacNhanBiBenhOf(maDot: string) {
  return xacNhanBiBenh.find((x) => x.maDot === maDot)?.maBN ?? "";
}
function chanDoanOf(maDot: string) {
  return chanDoan.find((c) => c.maDot === maDot)?.maBenh ?? "";
}

// ===== Góc nhìn Bệnh nhân =====
function PatientView() {
  const [maBN, setMaBN] = useState("BN01");
  const bn = benhNhan.find((b) => b.maBN === maBN)!;
  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-foreground" htmlFor="chon-bn">
          Bạn là bệnh nhân:
        </label>
        <select
          id="chon-bn"
          value={maBN}
          onChange={(e) => setMaBN(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        >
          {benhNhan.map((b) => (
            <option key={b.maBN} value={b.maBN}>
              {b.maBN} — {b.hoTen}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">
          Bệnh nhân chỉ thấy thuốc đã mua và lịch sử khám của mình.
        </p>
      </Card>
      <LichSuBenhNhan bn={bn} />
    </div>
  );
}

// ===== Trang chính =====
function Index() {
  const [role, setRole] = useState<Role | null>(null);

  if (!role) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <Stethoscope className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Phòng khám Thanh Bình</h1>
        <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
          Web demo tra cứu trên CSDL phòng khám (dữ liệu mẫu tháng 10/2026). Chọn vai trò để đăng nhập:
        </p>
        <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRole(r.id)}
              className="group rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <r.icon className="h-5.5 w-5.5" />
              </span>
              <p className="mt-4 font-bold text-foreground">{r.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.desc}</p>
            </button>
          ))}
        </div>
        <p className="mt-8 max-w-lg text-center text-xs text-muted-foreground">
          Dữ liệu mẫu: {bacSi.length} bác sĩ · {yTa.length} y tá · {benhNhan.length} bệnh nhân · {lanKham.length} lần khám ·{" "}
          {thanhPhanDonThuoc.length} thành phần thuốc · tổng doanh thu {vnd(doanhThu.tong)}
        </p>
      </div>
    );
  }

  const current = ROLES.find((r) => r.id === role)!;
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <current.icon className="h-4.5 w-4.5" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Phòng khám Thanh Bình</p>
              <p className="text-xs text-muted-foreground">Vai trò: {current.title}</p>
            </div>
          </div>
          <button
            onClick={() => setRole(null)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Đổi vai trò
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {role === "bacsi" ? <DoctorView /> : role === "yta" ? <NurseView /> : <PatientView />}
      </main>
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Boxes className="h-3.5 w-3.5" />
          Web demo CSDL phòng khám — Q3 & Q5 · dữ liệu mẫu tháng 10/2026
        </span>
      </footer>
    </div>
  );
}
