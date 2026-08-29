// ---------------------------------------------------------------------------
// DAFTAR USER UNTUK LOGIN (MOCK / DUMMY)
// ----------------------------------------------------------------------------
// Ini belum terhubung ke backend/database sungguhan. Username & password
// dicek langsung dari daftar ini (lihat src/store/auth.js). Nanti kalau
// sudah ada API login sungguhan, bagian ini tinggal diganti dengan
// pemanggilan API tersebut.
// ---------------------------------------------------------------------------
export const MOCK_USERS = [
  { id: "u1", name: "Eliza Vornia", email: "eliza@damora.com", password: "eliza123", role: "admin" },
  { id: "u2", name: "Rani", email: "rani@damora.com", password: "rani123", role: "member" },
  { id: "u3", name: "Dion", email: "dion@damora.com", password: "dion123", role: "member" },
  { id: "u4", name: "Faisal", email: "faisal@damora.com", password: "faisal123", role: "member" },
  { id: "u5", name: "Arini", email: "arini@damora.com", password: "arini123", role: "member" },
];

// Pilihan untuk dropdown "Jenis Pekerjaan".
export const JENIS_PEKERJAAN_OPTIONS = ["WIFI", "Kabel Fiber", "Modem/ONT", "Lainnya"];

// Pilihan untuk dropdown "Status".
export const STATUS_OPTIONS = ["NOK", "Done"];

// Batas maksimal karakter untuk kolom Keterangan
export const KETERANGAN_MAX_LENGTH = 500;

// ---------------------------------------------------------------------------
// BEBERAPA DATA CONTOH (biar Dashboard tidak kosong saat pertama dibuka)
// ---------------------------------------------------------------------------
export const contohTugasAwal = [
  { id: "1", noService: "152502215842", jenisPekerjaan: "WIFI", status: "NOK", keterangan: "Perlu dilakukan revisi input request pelurusan.", tanggal: "2026-08-01", executorId: "u1", executorName: "Eliza", dibuatPada: "2026-08-01T09:10:00" },
  { id: "2", noService: "152520202326", jenisPekerjaan: "WIFI", status: "Done", keterangan: "", tanggal: "2026-07-31", executorId: "u1", executorName: "Eliza", dibuatPada: "2026-08-01T08:40:00" },
  { id: "3", noService: "152507223174", jenisPekerjaan: "WIFI", status: "NOK", keterangan: "", tanggal: "2026-08-01", executorId: "u1", executorName: "Eliza", dibuatPada: "2026-08-01T08:15:00" },
  { id: "4", noService: "1234566777", jenisPekerjaan: "WIFI", status: "NOK", keterangan: "", tanggal: "2026-08-01", executorId: "u2", executorName: "Rani", dibuatPada: "2026-08-01T08:05:00" },
  { id: "5", noService: "1234566777", jenisPekerjaan: "WIFI", status: "NOK", keterangan: "", tanggal: "2026-08-01", executorId: "u3", executorName: "Dion", dibuatPada: "2026-08-01T08:00:00" },
  { id: "6", noService: "1234566777", jenisPekerjaan: "WIFI", status: "Done", keterangan: "", tanggal: "2026-07-31", executorId: "u2", executorName: "Rani", dibuatPada: "2026-07-31T15:00:00" },
  { id: "7", noService: "152488001122", jenisPekerjaan: "Kabel Fiber", status: "Done", keterangan: "", tanggal: "2026-07-29", executorId: "u4", executorName: "Faisal", dibuatPada: "2026-07-29T10:00:00" },
  { id: "8", noService: "152488001123", jenisPekerjaan: "Kabel Fiber", status: "NOK", keterangan: "", tanggal: "2026-07-30", executorId: "u4", executorName: "Faisal", dibuatPada: "2026-07-30T10:00:00" },
  { id: "9", noService: "152488001124", jenisPekerjaan: "Modem/ONT", status: "Done", keterangan: "", tanggal: "2026-07-28", executorId: "u5", executorName: "Arini", dibuatPada: "2026-07-28T10:00:00" },
  { id: "10", noService: "152488001125", jenisPekerjaan: "Modem/ONT", status: "NOK", keterangan: "", tanggal: "2026-07-27", executorId: "u5", executorName: "Arini", dibuatPada: "2026-07-27T10:00:00" },
];

// ---------------------------------------------------------------------------
// DAFTAR ANGGOTA TIM
// ---------------------------------------------------------------------------
export const TIM_ANGGOTA = [
  { id: "u1", nama: "Eliza", tim: "Data Management" },
  { id: "u2", nama: "Rani", tim: "Data Management" },
  { id: "u3", nama: "Dion", tim: "Data Management" },
  { id: "u4", nama: "Faisal", tim: "Teknisi" },
  { id: "u5", nama: "Arini", tim: "Teknisi" },
];
