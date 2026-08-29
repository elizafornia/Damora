<template>
  <div class="relative min-h-app w-full overflow-hidden bg-white font-sans text-ink">
    <!-- Logo, pojok kiri atas halaman -->
    <div class="absolute left-10 top-8 text-2xl font-bold tracking-tight text-brand">DAMORA</div>

    <div class="flex min-h-app flex-col items-center justify-center gap-10 px-6 py-20 md:flex-row md:gap-16 md:px-16">
      <!-- Ilustrasi -->
      <img
        src="../assets/login-illustration.svg"
        alt="Ilustrasi dashboard analitik"
        class="hidden w-full max-w-md md:block"
      />

      <!-- Kartu form login -->
      <div class="w-full max-w-sm rounded-2xl border border-line-light bg-white p-8 shadow-lg">
        <h1 class="mb-6 text-2xl font-bold">Selamat Datang!</h1>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
          <div>
            <label class="mb-1.5 block text-sm font-semibold">Email</label>
            <div class="flex items-center gap-2 rounded-lg border border-transparent bg-soft px-3 py-3 focus-within:border-accent">
              <Mail :size="18" class="text-gray-mid" />
              <input
                type="email"
                v-model="email"
                placeholder="Masukkan email"
                autocomplete="username"
                class="w-full bg-transparent text-sm outline-none placeholder:text-gray-mid"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-semibold">Password</label>
            <div class="flex items-center gap-2 rounded-lg border border-transparent bg-soft px-3 py-3 focus-within:border-accent">
              <Lock :size="18" class="text-gray-mid" />
              <input
                :type="tampilkanPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Masukkan password"
                autocomplete="current-password"
                class="w-full bg-transparent text-sm outline-none placeholder:text-gray-mid"
              />
              <button type="button" @click="tampilkanPassword = !tampilkanPassword" class="text-gray-mid">
                <component :is="tampilkanPassword ? EyeOff : Eye" :size="17" />
              </button>
            </div>
          </div>

          <div v-if="pesanError" class="flex items-center gap-2 rounded-lg bg-danger-light px-3 py-2 text-sm text-danger">
            <CircleAlert :size="15" />
            {{ pesanError }}
          </div>

          <button
            type="submit"
            class="mt-1 rounded-lg bg-brand px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Mail, Lock, Eye, EyeOff, CircleAlert } from "lucide-vue-next";
import { login } from "../store/auth";

const email = ref("");
const password = ref("");
const tampilkanPassword = ref(false);
const pesanError = ref("");

function handleLogin() {
  if (email.value.trim() === "" || password.value.trim() === "") {
    pesanError.value = "Email dan password wajib diisi.";
    return;
  }

  const hasil = login(email.value, password.value);

  if (!hasil.success) {
    pesanError.value = hasil.message;
    return;
  }

  pesanError.value = "";
}
</script>
