<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Profile</h1>
      <p class="text-sm text-muted">Manage User Profile</p>
    </div>

    <!-- Kartu identitas: avatar, nama, telepon, email, tombol Edit & Change Password -->
    <div class="mb-6 rounded-xl border border-line px-5 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-base font-semibold text-white">
            {{ user.name.charAt(0) }}
          </div>

          <div v-if="!sedangEdit">
            <div class="text-base font-bold">{{ user.name.split(" ")[0] }}</div>
            <div class="mt-0.5 flex items-center gap-4 text-sm text-slate">
              <span class="flex items-center gap-1.5">
                <Phone :size="14" class="text-muted" />
                {{ user.telepon }}
              </span>
              <span class="flex items-center gap-1.5">
                <Mail :size="14" class="text-muted" />
                {{ user.email }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <template v-if="!sedangEdit">
            <button
              @click="mulaiEdit"
              class="flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-hover-light"
            >
              <Pencil :size="14" />
              Edit
            </button>
            <button
              class="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <Lock :size="14" />
              Change Password
            </button>
          </template>

          <template v-else>
            <button
              @click="batalEdit"
              class="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink hover:bg-hover-light"
            >
              Batal
            </button>
            <button
              @click="simpanEdit"
              class="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              <Check :size="14" />
              Simpan
            </button>
          </template>
        </div>
      </div>

      <!-- Form edit, muncul cuma kalau sedang mode edit -->
      <div v-if="sedangEdit" class="mt-4 grid grid-cols-3 gap-4 border-t border-line-light pt-4">
        <div>
          <label class="mb-1 block text-xs text-muted">Nama</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs text-muted">Telepon</label>
          <input
            v-model="form.telepon"
            type="text"
            class="w-full rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs text-muted">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full rounded-lg border border-line px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <p v-if="pesanError" class="col-span-3 text-sm text-danger">{{ pesanError }}</p>
      </div>
    </div>

    <h2 class="mb-3 text-lg font-bold">Personal Information</h2>

    <div class="grid grid-cols-3 gap-6 rounded-xl border border-line px-5 py-4">
      <div>
        <div class="text-xs text-muted">Role</div>
        <div class="mt-1 text-sm font-medium">{{ user.role === "admin" ? "Super Admin" : "Member" }}</div>
      </div>
      <div>
        <div class="text-xs text-muted">Resource Type</div>
        <div class="mt-1 text-sm font-medium">{{ user.resourceType }}</div>
      </div>
      <div>
        <div class="text-xs text-muted">Division</div>
        <div class="mt-1 text-sm font-medium">{{ divisi }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { Phone, Mail, Pencil, Lock, Check } from "lucide-vue-next";
import { authState } from "../store/auth";
import { TIM_ANGGOTA, MOCK_USERS } from "../data";

const user = authState.currentUser;

// Divisi diambil dari daftar TIM_ANGGOTA (dicocokkan lewat id), karena data
// itu belum ada di MOCK_USERS.
const divisi = computed(() => {
  const anggota = TIM_ANGGOTA.find((a) => a.id === user.id);
  return anggota ? anggota.tim : "-";
});

// -----------------------------------------------------------------------
// EDIT PROFILE (bagian "Update" dari CRUD)
// -----------------------------------------------------------------------
const sedangEdit = ref(false);
const pesanError = ref("");

const form = reactive({
  name: "",
  telepon: "",
  email: "",
});

function mulaiEdit() {
  form.name = user.name;
  form.telepon = user.telepon;
  form.email = user.email;
  pesanError.value = "";
  sedangEdit.value = true;
}

function batalEdit() {
  sedangEdit.value = false;
  pesanError.value = "";
}

function simpanEdit() {
  const namaBaru = form.name.trim();
  const teleponBaru = form.telepon.trim();
  const emailBaru = form.email.trim();

  if (!namaBaru || !teleponBaru || !emailBaru) {
    pesanError.value = "Nama, telepon, dan email tidak boleh kosong.";
    return;
  }

  const formatEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailBaru);
  if (!formatEmailValid) {
    pesanError.value = "Format email tidak valid.";
    return;
  }

  // Update langsung ke objek user yang sedang login, supaya nama di Topbar
  // dan tempat lain ikut berubah otomatis.
  user.name = namaBaru;
  user.telepon = teleponBaru;
  user.email = emailBaru;

  // Update juga ke MOCK_USERS supaya konsisten kalau user logout lalu
  // login lagi (dicocokkan lewat id).
  const dataDiMockUsers = MOCK_USERS.find((u) => u.id === user.id);
  if (dataDiMockUsers) {
    dataDiMockUsers.name = namaBaru;
    dataDiMockUsers.telepon = teleponBaru;
    dataDiMockUsers.email = emailBaru;
  }

  sedangEdit.value = false;
  pesanError.value = "";
}
</script>