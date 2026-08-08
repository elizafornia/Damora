<template>
  <header class="flex items-center justify-end gap-4 border-b border-line-light bg-white px-8 py-3">
    <Bell :size="18" class="text-muted" />
    <div class="flex items-center gap-3 px-2 py-1">
      <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
        {{ currentUser.name.charAt(0) }}
      </div>
      <div class="text-left leading-tight">
        <div class="text-sm font-semibold">{{ currentUser.name.split(" ")[0] }}</div>
        <div class="text-xs text-muted">
          {{ currentUser.role === "admin" ? "Super Admin" : "Member" }}
        </div>
      </div>
      <ChevronDown :size="14" class="text-muted" />
    </div>
  </header>
</template>

<script setup>
import { Bell, ChevronDown } from "lucide-vue-next";
import { currentUser } from "../data";
</script>
