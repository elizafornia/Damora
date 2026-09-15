<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Team</h1>
      <p class="text-sm text-muted">Team recap</p>
    </div>

    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-lg font-bold">Anggota Tim</h2>
      <div class="flex items-center gap-3">
        <MonthPicker v-model="bulanTerpilih" />
        <button
          @click="unduhRekapTimSebagaiCSV(rekapTim)"
          class="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Download :size="16" />
          Export
        </button>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-line">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-header-gray text-left">
            <th class="px-5 py-3 font-bold">PIC</th>
            <th class="px-5 py-3 font-bold">Team</th>
            <th class="px-5 py-3 text-center font-bold">Total Done</th>
            <th class="px-5 py-3 text-center font-bold">Total NOK</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(anggota, index) in rekapTim"
            :key="anggota.id"
            :class="index !== rekapTim.length - 1 ? 'border-b border-line-light' : ''"
          >
            <td class="px-5 py-3.5">{{ anggota.nama }}</td>
            <td class="px-5 py-3.5 text-slate">{{ anggota.tim }}</td>
            <td class="px-5 py-3.5 text-center">{{ anggota.totalDone }}</td>
            <td class="px-5 py-3.5 text-center">{{ anggota.totalNok }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Download } from "lucide-vue-next";
import { TIM_ANGGOTA } from "../data";
import { hitungRekapTim, unduhRekapTimSebagaiCSV } from "../utils";
import MonthPicker from "./MonthPicker.vue";

const props = defineProps({
  tasks: { type: Array, required: true },
});

// Default: bulan berjalan (format input type="month" adalah "YYYY-MM").
function bulanIniSebagaiString() {
  const sekarang = new Date();
  const tahun = sekarang.getFullYear();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  return `${tahun}-${bulan}`;
}

const bulanTerpilih = ref(bulanIniSebagaiString());

// Hanya tampilkan tugas yang tanggalnya berada di bulan+tahun yang dipilih
// pada month picker. Format `tugas.tanggal` adalah "YYYY-MM-DD", jadi
// cukup dibandingkan 7 karakter pertamanya ("YYYY-MM").
const tasksBulanTerpilih = computed(() =>
  props.tasks.filter((tugas) => tugas.tanggal.slice(0, 7) === bulanTerpilih.value)
);

const rekapTim = computed(() => hitungRekapTim(tasksBulanTerpilih.value, TIM_ANGGOTA));
</script>