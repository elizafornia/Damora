<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Team</h1>
      <p class="text-sm text-muted">Team recap</p>
    </div>

    <div class="mb-3 flex items-center justify-between">
      <h2 class="text-lg font-bold">Anggota Tim</h2>
      <button
        @click="unduhRekapTimSebagaiCSV(rekapTim)"
        class="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <Download :size="16" />
        Export
      </button>
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
import { computed } from "vue";
import { Download } from "lucide-vue-next";
import { TIM_ANGGOTA } from "../data";
import { hitungRekapTim, unduhRekapTimSebagaiCSV } from "../utils";

const props = defineProps({
  tasks: { type: Array, required: true },
});

const rekapTim = computed(() => hitungRekapTim(props.tasks, TIM_ANGGOTA));
</script>
