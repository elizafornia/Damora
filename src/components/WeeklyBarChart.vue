<!--
  Versi React sebelumnya pakai library "recharts". Di Vue, supaya setup-nya
  tetap ringan (tidak perlu install library chart tambahan), grafik batang
  ini dibuat manual pakai <div> biasa yang tingginya diatur proporsional
  terhadap nilai tertinggi (maxVal). Tampilannya tetap sama: batang hijau
  dengan label hari di bawahnya.
-->
<template>
  <div class="h-chart rounded-xl bg-white px-4 py-4">
    <div class="flex h-full items-end justify-between gap-3">
      <div v-for="item in data" :key="item.label" class="flex h-full flex-1 flex-col items-center justify-end">
        <span v-if="item.count > 0" class="mb-1 text-[10px] font-medium" style="color: #3a3a3c">
          {{ item.count }}
        </span>
        <div
          class="w-full max-w-[32px] rounded-t transition-all"
          :style="{
            height: barHeight(item.count) + 'px',
            backgroundColor: item.count > 0 ? '#c3e64f' : 'rgba(195, 230, 79, 0.25)',
          }"
        ></div>
        <span class="mt-2 text-[11px] text-muted">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: { type: Array, required: true }, // [{ label: 'Sen', count: 2 }, ...]
});

const maxVal = computed(() => Math.max(...props.data.map((d) => d.count), 1));

function barHeight(count) {
  const min = count > 0 ? 6 : 2;
  return Math.max((count / maxVal.value) * 140, min);
}
</script>
