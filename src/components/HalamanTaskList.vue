<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Task List</h1>
      <p class="text-sm text-muted">Progress Monitoring</p>
    </div>

    <!-- Kotak pencarian -->
    <div class="relative mb-6">
      <Search :size="16" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="text"
        v-model="kataPencarian"
        placeholder="Cari nomor sercive atau PIC"
        class="w-full rounded-lg border border-line py-3 pl-11 pr-4 text-sm outline-none focus:border-accent"
      />
    </div>

    <!-- Jumlah hasil -->
    <div class="mb-4 text-sm text-slate">
      <span class="font-bold">{{ hasilPencarian.length }}</span>
      <span class="text-muted"> Total Request Order</span>
    </div>

    <!-- Daftar kartu tugas -->
    <div v-if="hasilPencarian.length === 0" class="flex flex-col items-center gap-2 rounded-xl bg-soft py-10 text-muted">
      <Search :size="28" />
      <span class="text-sm">Tidak ada data yang cocok dengan pencarian.</span>
    </div>
    <div v-else class="flex flex-col gap-3">
      <button
        v-for="tugas in hasilPencarian"
        :key="tugas.id"
        @click="$emit('pilih-tugas', tugas.id)"
        class="flex w-full items-center justify-between rounded-xl bg-soft px-5 py-4 text-left transition-colors hover:bg-soft-dark"
      >
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
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search, UserRound } from "lucide-vue-next";
import { cariTugas, formatTanggal } from "../utils";

const props = defineProps({
  tasks: { type: Array, required: true },
});
defineEmits(["pilih-tugas"]);

const kataPencarian = ref("");
const hasilPencarian = computed(() => cariTugas(props.tasks, kataPencarian.value));
</script>
