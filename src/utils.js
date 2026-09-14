// Total pekerjaan bulan ini. Kartu ini SELALU menghitung SEMUA user
// (tidak difilter per orang).
//
// ATURAN DEDUP (business rule):
// "Total Pekerjaan" dihitung dari jumlah No Service YANG UNIK dalam bulan
// berjalan — bukan jumlah baris data. Kalau ada No Service yang sama
// diinput lebih dari sekali di bulan yang sama (PIC sama atau beda, jenis
// pekerjaan apapun, status apapun), tetap dihitung SATU pekerjaan saja.
// Siapapun yang input duluan, No Service itu dianggap "sudah tercatat"
// untuk bulan tersebut.
//
// Catatan: dedup dilakukan PER BULAN. Kalau No Service yang sama muncul
// lagi di bulan berikutnya, dihitung sebagai pekerjaan baru lagi.
export function hitungTotalBulanIni(daftarTugas) {
  const sekarang = new Date();

  const tugasBulanIni = daftarTugas.filter((tugas) => {
    const tanggalTugas = new Date(tugas.tanggal);
    return (
      tanggalTugas.getMonth() === sekarang.getMonth() &&
      tanggalTugas.getFullYear() === sekarang.getFullYear()
    );
  });

  const noServiceUnik = new Set(tugasBulanIni.map((tugas) => tugas.noService));
  return noServiceUnik.size;
}

// Jumlah pekerjaan yang belum "Done" (To-Do).
//
// ATURAN: To-Do TIDAK di-dedup sama sekali — setiap baris data yang
// statusnya bukan "Done" dihitung apa adanya, walaupun No Service-nya
// duplikat dengan baris lain. Sama seperti sebelumnya, dihitung dari
// SEMUA user, bukan cuma yang sedang login.
export function hitungTodo(daftarTugas) {
  return daftarTugas.filter((tugas) => tugas.status !== "Done").length;
}

// Data untuk grafik mingguan (Senin - Minggu).
// Admin -> hitung semua orang. Member -> hitung punya dia sendiri saja.
export function hitungDataMingguan(daftarTugas, user) {
  const namaHari = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hariIni = new Date();

  const jarakDariSenin = (hariIni.getDay() + 6) % 7;
  const tanggalSenin = new Date(hariIni);
  tanggalSenin.setDate(hariIni.getDate() - jarakDariSenin);

  return namaHari.map((label, index) => {
    const tanggalHariIni = new Date(tanggalSenin);
    tanggalHariIni.setDate(tanggalSenin.getDate() + index);

    const jumlah = daftarTugas.filter((tugas) => {
      const sama = new Date(tugas.tanggal).toDateString() === tanggalHariIni.toDateString();
      if (user.role === "admin") return sama;
      return sama && tugas.executorId === user.id;
    }).length;

    return { label, count: jumlah };
  });
}

// 3 pekerjaan terbaru (diurutkan dari yang paling baru dibuat).
// Admin lihat semua, member cuma lihat pekerjaan miliknya sendiri.
export function ambilTugasTerbaru(daftarTugas, user, jumlah = 3) {
  const tugasUntukUser =
    user.role === "admin"
      ? daftarTugas
      : daftarTugas.filter((tugas) => tugas.executorId === user.id);

  const hasilUrut = [...tugasUntukUser].sort(
    (a, b) => new Date(b.dibuatPada) - new Date(a.dibuatPada)
  );

  return hasilUrut.slice(0, jumlah);
}

// Cari tugas berdasarkan No Service atau nama PIC (executor).
// Kalau query kosong, semua tugas ditampilkan (diurutkan dari yang terbaru).
export function cariTugas(daftarTugas, query) {
  const hasilUrut = [...daftarTugas].sort(
    (a, b) => new Date(b.dibuatPada) - new Date(a.dibuatPada)
  );

  const kataKunci = query.trim().toLowerCase();
  if (kataKunci === "") return hasilUrut;

  return hasilUrut.filter((tugas) => {
    const cocokNoService = tugas.noService.toLowerCase().includes(kataKunci);
    const cocokPic = tugas.executorName.toLowerCase().includes(kataKunci);
    return cocokNoService || cocokPic;
  });
}

export function formatTanggal(tanggalIso) {
  return new Date(tanggalIso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Rekap jumlah "Done" dan "NOK" untuk tiap anggota tim, dihitung dari
// data `tasks` yang sama dipakai Dashboard & Task List (cocokkan lewat executorId).
export function hitungRekapTim(daftarTugas, daftarAnggota) {
  return daftarAnggota.map((anggota) => {
    const tugasMilikDia = daftarTugas.filter((tugas) => tugas.executorId === anggota.id);
    const totalDone = tugasMilikDia.filter((tugas) => tugas.status === "Done").length;
    const totalNok = tugasMilikDia.filter((tugas) => tugas.status === "NOK").length;

    return {
      id: anggota.id,
      nama: anggota.nama,
      tim: anggota.tim,
      totalDone,
      totalNok,
    };
  });
}

// Ubah rekap tim menjadi file CSV lalu langsung diunduh oleh browser.
export function unduhRekapTimSebagaiCSV(rekapTim) {
  const judulKolom = ["PIC", "Team", "Total Done", "Total NOK"];

  const baris = rekapTim.map((anggota) => [
    anggota.nama,
    anggota.tim,
    anggota.totalDone,
    anggota.totalNok,
  ]);

  const semuaBaris = [judulKolom, ...baris];
  const isiCsv = semuaBaris
    .map((baris) => baris.map((nilai) => `"${String(nilai).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([isiCsv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "rekap-team.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
