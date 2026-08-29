<template>
  <header class="relative flex items-center justify-end gap-4 border-b border-line-light bg-white px-8 py-3">
    <Bell :size="18" class="text-muted" />

    <div class="relative">
      <button @click="menuTerbuka = !menuTerbuka" class="flex items-center gap-3 rounded-lg px-2 py-1 hover:bg-hover-light">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {{ authState.currentUser.name.charAt(0) }}
        </div>
        <div class="text-left leading-tight">
          <div class="text-sm font-semibold">{{ authState.currentUser.name.split(" ")[0] }}</div>
          <div class="text-xs text-muted">
            {{ authState.currentUser.role === "admin" ? "Super Admin" : "Member" }}
          </div>
        </div>
        <ChevronDown :size="14" class="text-muted" />
      </button>

      <!-- Dropdown kecil, cuma berisi tombol Logout -->
      <div
        v-if="menuTerbuka"
        class="absolute right-0 top-full z-10 mt-2 w-40 rounded-lg border border-line-light bg-white py-1.5 shadow-md"
      >
        <button
          @click="handleLogout"
          class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-danger hover:bg-hover-light"
        >
          <LogOut :size="14" />
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Bell, ChevronDown, LogOut } from "lucide-vue-next";
import { authState, logout } from "../store/auth";

const menuTerbuka = ref(false);

function handleLogout() {
  menuTerbuka.value = false;
  logout();
}
</script>
