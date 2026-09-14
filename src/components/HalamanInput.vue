<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <h1 class="text-2xl font-bold">Input</h1>
      <p class="text-sm text-muted">Input Request Order</p>
    </div>

    <!-- Notifikasi sukses -->
    <div v-if="pesanSukses" class="mb-6 flex items-center justify-between rounded-xl bg-success-light px-5 py-4">
      <div class="flex items-center gap-2 text-success-dark">
        <CheckCircle2 :size="18" />
        <span class="text-sm font-medium">{{ pesanSukses }}</span>
      </div>
      <button @click="$emit('lihat-dashboard')" class="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
        Lihat Dashboard
      </button>
    </div>

    <!-- Semua baris form input, ditumpuk ke bawah -->
    <div class="flex flex-col gap-6">
      <BarisFormInput
        v-for="(baris, index) in barisForm"
        :key="baris.idBaris"
        :baris="baris"
        :nomor-baris="index + 1"
        :bisa-dihapus="barisForm.length > 1"
        @ubah-field="(nama, nilai) => ubahField(baris.idBaris, nama, nilai)"
        @hapus="hapusBaris(baris.idBaris)"
      />
    </div>

    <!-- Tombol Add Row (kiri) dan Save (kanan), sejajar -->
    <div class="mt-6 flex items-center justify-between">
      <button
        @click="tambahBaris"
        class="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <PlusCircle :size="18" />
        Add Row
      </button>

      <button
        @click="handleSimpan"
        class="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PlusCircle, CheckCircle2 } from "lucide-vue-next";
import BarisFormInput from "./BarisFormInput.vue";
import { JENIS_PEKERJAAN_OPTIONS, STATUS_OPTIONS } from "../data";
import { authState } from "../store/auth";

const emit = defineEmits(["simpan", "lihat-dashboard"]);

// Bikin 1 baris form kosong. Dipakai saat halaman pertama dibuka
// dan setiap kali tombol "Add Row" diklik.
function buatBarisKosong() {
  return {
    idBaris: Date.now() + Math.random(),
    tanggal: new Date().toISOString().slice(0, 10),
    noService: "",
    jenisPekerjaan: JENIS_PEKERJAAN_OPTIONS[0],
    status: STATUS_OPTIONS[0],
    keterangan: "",
  };
}

const barisForm = ref([buatBarisKosong()]);
const pesanSukses = ref(null);

function ubahField(idBaris, namaField, nilaiBaru) {
  barisForm.value = barisForm.value.map((baris) =>
    baris.idBaris === idBaris ? { ...baris, [namaField]: nilaiBaru } : baris
  );
  pesanSukses.value = null;
}

function tambahBaris() {
  barisForm.value = [...barisForm.value, buatBarisKosong()];
}

function hapusBaris(idBaris) {
  if (barisForm.value.length === 1) {
    barisForm.value = [buatBarisKosong()];
    return;
  }
  barisForm.value = barisForm.value.filter((baris) => baris.idBaris !== idBaris);
}

function handleSimpan() {
  const barisValid = barisForm.value.filter((baris) => baris.noService.trim() !== "");

  if (barisValid.length === 0) {
    alert("Isi minimal 1 baris dengan No Service yang tidak kosong ya.");
    return;
  }

  const sekarang = new Date().toISOString();

  const tugasBaruArray = barisValid.map((baris) => ({
    id: String(baris.idBaris),
    noService: baris.noService.trim(),
    jenisPekerjaan: baris.jenisPekerjaan,
    status: baris.status,
    keterangan: baris.keterangan,
    tanggal: baris.tanggal,
    executorId: authState.currentUser.id,
    executorName: authState.currentUser.name,
    dibuatPada: sekarang,
  }));

  emit("simpan", tugasBaruArray);

  pesanSukses.value = `Berhasil menyimpan ${tugasBaruArray.length} data pekerjaan.`;
  barisForm.value = [buatBarisKosong()];
}
</script>
