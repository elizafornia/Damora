<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-sm text-muted">Progress Monitoring</p>
    </div>

    <!-- Kartu ringkasan -->
    <div class="mb-8 grid grid-cols-2 gap-5">
      <div class="rounded-xl bg-brand p-5 text-white">
        <div class="text-sm text-white-85">Total Pekerjaan</div>
        <div class="mt-1 text-4xl font-bold">{{ totalBulanIni }}</div>
        <div class="mt-1 text-sm text-white-75">Bulan ini</div>
      </div>
      <div class="rounded-xl bg-accent p-5 text-white">
        <div class="text-sm text-white-85">To-Do</div>
        <div class="mt-1 text-4xl font-bold">{{ jumlahTodo }}</div>
        <div class="mt-1 text-sm text-white-75">Belum selesai</div>
      </div>
    </div>

    <!-- Grafik mingguan -->
    <div class="mb-8">
      <h2 class="mb-3 text-lg font-bold">Ringkasan Pekerjaan</h2>
      <WeeklyBarChart :data="dataMingguan" />
    </div>

    <!-- Daftar pekerjaan terbaru -->
    <div>
      <h2 class="mb-3 text-lg font-bold">Pekerjaan Terbaru</h2>

      <div v-if="tugasTerbaru.length === 0" class="flex flex-col items-center gap-2 rounded-xl bg-soft py-10 text-muted">
        <ListChecks :size="28" />
        <span class="text-sm">Belum ada data</span>
      </div>
      <div v-else class="flex flex-col gap-3">
        <div v-for="tugas in tugasTerbaru" :key="tugas.id" class="flex items-center justify-between rounded-xl bg-soft px-5 py-4">
          <div>
            <div class="font-medium">{{ tugas.noService }}</div>
            <div class="text-sm text-muted">{{ tugas.jenisPekerjaan }}</div>
            <div class="mt-1 flex items-center gap-1 text-sm text-slate">
              <UserRound :size="14" />
              {{ tugas.executorName }}
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <span
              :class="[
                'rounded-full px-3 py-1 text-xs font-semibold text-white',
                tugas.status === 'Done' ? 'bg-success' : 'bg-danger',
              ]"
            >
              {{ tugas.status }}
            </span>
            <span class="text-sm text-muted">{{ formatTanggal(tugas.tanggal) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { ListChecks, UserRound } from "lucide-vue-next";
import WeeklyBarChart from "./WeeklyBarChart.vue";
import { authState } from "../store/auth";
import {
  hitungTotalBulanIni,
  hitungTodo,
  hitungDataMingguan,
  ambilTugasTerbaru,
  formatTanggal,
} from "../utils";

const props = defineProps({
  tasks: { type: Array, required: true },
});

const totalBulanIni = computed(() => hitungTotalBulanIni(props.tasks));
const jumlahTodo = computed(() => hitungTodo(props.tasks));
const dataMingguan = computed(() => hitungDataMingguan(props.tasks, authState.currentUser));
const tugasTerbaru = computed(() => ambilTugasTerbaru(props.tasks, authState.currentUser, 3));
</script>
