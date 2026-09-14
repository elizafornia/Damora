<!--
  CATATAN UNTUK PEMULA
  ----------------------------------------------------------------------------
  App.vue ini adalah "pintu masuk" aplikasi, isinya beberapa halaman:
    1. Dashboard      -> lihat ringkasan pekerjaan
    2. Input          -> tambah data pekerjaan baru (bisa banyak sekaligus)
    3. Task List      -> cari & lihat semua data pekerjaan yang sudah diinput
    4. Status Update  -> halaman "nested" di dalam Task List

  Karena ini masih "dummy" (belum tersambung ke server sungguhan), semua data
  disimpan sementara di memori memakai ref(). Begitu halaman di-refresh, data
  akan hilang. Nanti tinggal ganti bagian "simpan ke state" dengan
  "kirim ke API / database" punya kamu.
-->

<template>
  <LoginView v-if="!authState.currentUser" />

  <div v-else class="flex h-full min-h-app w-full bg-app font-sans text-ink">
    <Sidebar :halaman-aktif="halamanAktif" @pindah-halaman="pindahHalaman" />

    <div class="flex min-w-0 flex-1 flex-col">
      <Topbar @pindah-halaman="pindahHalaman" />

      <main class="flex-1 overflow-y-auto px-4 py-4">
        <div class="w-full rounded-2xl bg-white p-8 shadow-sm">
          <HalamanDashboard v-if="halamanAktif === 'dashboard'" :tasks="tasks" />

          <HalamanInput
            v-else-if="halamanAktif === 'input'"
            @simpan="tambahTugasBaru"
            @lihat-dashboard="pindahHalaman('dashboard')"
          />

          <template v-else-if="halamanAktif === 'tasklist'">
            <HalamanTaskList
              v-if="!tugasYangDiedit"
              :tasks="tasks"
              @pilih-tugas="(id) => (taskIdDiedit = id)"
            />
            <HalamanStatusUpdate
              v-else
              :tugas="tugasYangDiedit"
              @kembali="taskIdDiedit = null"
              @simpan="handleSimpanStatusUpdate"
            />
          </template>

          <HalamanTeam v-else-if="halamanAktif === 'team'" :tasks="tasks" />

          <HalamanProfile v-else-if="halamanAktif === 'profile'" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";
import LoginView from "./components/LoginView.vue";
import HalamanDashboard from "./components/HalamanDashboard.vue";
import HalamanInput from "./components/HalamanInput.vue";
import HalamanTaskList from "./components/HalamanTaskList.vue";
import HalamanStatusUpdate from "./components/HalamanStatusUpdate.vue";
import HalamanTeam from "./components/HalamanTeam.vue";
import HalamanProfile from "./components/HalamanProfile.vue";
import { contohTugasAwal } from "./data";
import { authState } from "./store/auth";

// Halaman mana yang lagi aktif: "dashboard", "input", "tasklist", atau "team"
const halamanAktif = ref("dashboard");

// Semua data pekerjaan, dipakai bersama oleh Dashboard, Input, dan Task List
const tasks = ref([...contohTugasAwal]);

// id tugas yang lagi dibuka di halaman "Status Update" (nested di Task List).
// Kalau null, artinya kita lagi di halaman daftar Task List.
const taskIdDiedit = ref(null);

// Pindah halaman lewat sidebar. Setiap kali pindah halaman, keluar dulu
// dari halaman Status Update (kalau lagi kebuka) supaya tidak nyangkut.
function pindahHalaman(halamanBaru) {
  halamanAktif.value = halamanBaru;
  taskIdDiedit.value = null;
}

// Dipanggil oleh HalamanInput setelah user klik "Simpan"
function tambahTugasBaru(tugasBaruArray) {
  tasks.value = [...tugasBaruArray, ...tasks.value];
}

// Dipanggil oleh HalamanStatusUpdate setelah user mengedit lalu klik "Save"
function perbaruiTugas(id, dataBaru) {
  tasks.value = tasks.value.map((tugas) =>
    tugas.id === id ? { ...tugas, ...dataBaru } : tugas
  );
}

// Tugas yang lagi dibuka di halaman Status Update (bisa undefined kalau tidak ada)
const tugasYangDiedit = computed(() =>
  tasks.value.find((tugas) => tugas.id === taskIdDiedit.value)
);

function handleSimpanStatusUpdate(dataBaru) {
  perbaruiTugas(tugasYangDiedit.value.id, dataBaru);
  taskIdDiedit.value = null;
}
</script>