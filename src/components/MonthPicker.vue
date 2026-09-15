<template>
  <div ref="wrapperRef" class="relative inline-block">
    <button
      type="button"
      @click="terbuka = !terbuka"
      class="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink hover:bg-hover-light"
    >
      <Calendar :size="15" class="text-muted" />
      {{ labelTampilan }}
    </button>

    <div
      v-if="terbuka"
      class="absolute right-0 top-full z-20 mt-2 w-60 rounded-xl border border-line-light bg-white p-3 shadow-lg"
    >
      <!-- Navigasi tahun -->
      <div class="mb-2 flex items-center justify-between">
        <button
          type="button"
          @click="tahunDitampilkan--"
          class="rounded-md p-1 hover:bg-hover-light"
        >
          <ChevronLeft :size="16" />
        </button>
        <span class="text-sm font-bold">{{ tahunDitampilkan }}</span>
        <button
          type="button"
          @click="tahunDitampilkan++"
          class="rounded-md p-1 hover:bg-hover-light"
        >
          <ChevronRight :size="16" />
        </button>
      </div>

      <!-- Grid 12 bulan -->
      <div class="grid grid-cols-3 gap-1.5">
        <button
          v-for="(nama, index) in NAMA_BULAN"
          :key="nama"
          type="button"
          @click="pilihBulan(index)"
          :class="[
            'rounded-md px-2 py-1.5 text-xs font-medium',
            isBulanTerpilih(index)
              ? 'bg-brand text-white'
              : 'text-ink hover:bg-hover-light',
          ]"
        >
          {{ nama.slice(0, 3) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from "vue";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-vue-next";

// v-model bernilai string format "YYYY-MM", sama seperti <input type="month">
// bawaan browser — supaya gampang menggantikan pemakaian sebelumnya tanpa
// mengubah logic filter di komponen lain.
const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(["update:modelValue"]);

const NAMA_BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const [tahunAwal, bulanAwal] = props.modelValue.split("-").map(Number);

const terbuka = ref(false);
const tahunDitampilkan = ref(tahunAwal);

const labelTampilan = computed(() => {
  const [tahun, bulan] = props.modelValue.split("-").map(Number);
  return `${NAMA_BULAN[bulan - 1]} ${tahun}`;
});

function isBulanTerpilih(index) {
  const [tahun, bulan] = props.modelValue.split("-").map(Number);
  return tahunDitampilkan.value === tahun && index === bulan - 1;
}

function pilihBulan(index) {
  const bulanString = String(index + 1).padStart(2, "0");
  emit("update:modelValue", `${tahunDitampilkan.value}-${bulanString}`);
  terbuka.value = false;
}

// Tutup panel kalau user klik di luar area komponen ini.
const wrapperRef = ref(null);

function tanganiKlikDiLuar(event) {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
    terbuka.value = false;
  }
}

onMounted(() => document.addEventListener("click", tanganiKlikDiLuar));
onBeforeUnmount(() => document.removeEventListener("click", tanganiKlikDiLuar));
</script>
