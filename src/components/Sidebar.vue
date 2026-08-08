<template>
  <aside class="flex w-56 flex-shrink-0 flex-col gap-1 border-r border-line-light bg-white px-3 py-5">
    <div class="mb-4 px-3 text-lg font-bold tracking-tight text-brand">DAMORA</div>

    <button
      v-for="menu in daftarMenu"
      :key="menu.key"
      @click="$emit('pindah-halaman', menu.key)"
      :class="[
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors',
        menu.key === halamanAktif ? 'bg-brand text-white shadow-sm' : 'text-slate hover:bg-hover-light',
      ]"
    >
      <component :is="menu.icon" :size="18" :stroke-width="2" />
      <span :class="menu.key === halamanAktif ? 'font-medium' : ''">{{ menu.label }}</span>
    </button>
  </aside>
</template>

<script setup>
import { LayoutGrid, PlusCircle, ListChecks, Users } from "lucide-vue-next";

defineProps({
  halamanAktif: { type: String, required: true },
});
defineEmits(["pindah-halaman"]);

const daftarMenu = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "input", label: "Input", icon: PlusCircle },
  { key: "tasklist", label: "Task List", icon: ListChecks },
  { key: "team", label: "Team", icon: Users },
];
</script>
