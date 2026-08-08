<template>
  <div>
    <div class="mb-6 border-b border-line pb-4">
      <button @click="$emit('kembali')" class="mb-2 flex items-center gap-1 text-sm text-muted hover:text-slate">
        <ArrowLeft :size="14" />
        Kembali ke Task List
      </button>
      <h1 class="text-2xl font-bold">Task List</h1>
      <p class="text-sm text-muted">Progress Monitoring</p>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <!-- Tanggal — boleh diubah mundur (backdate) juga, sama seperti di Input -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Tanggal</label>
        <input
          type="date"
          v-model="tanggal"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <!-- No Service -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">No Service</label>
        <input
          type="text"
          v-model="noService"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <!-- Jenis Pekerjaan -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Jenis Pekerjaan</label>
        <select
          v-model="jenisPekerjaan"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option v-for="opsi in JENIS_PEKERJAAN_OPTIONS" :key="opsi" :value="opsi">{{ opsi }}</option>
        </select>
      </div>

      <!-- Status — dropdown, ditampilkan sebagai badge berwarna seperti di Dashboard -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Status</label>
        <select
          v-model="status"
          :class="[
            'w-full rounded-lg border-none px-3 py-2 text-sm font-semibold text-white outline-none',
            status === 'Done' ? 'bg-success' : 'bg-danger',
          ]"
        >
          <option v-for="opsi in STATUS_OPTIONS" :key="opsi" :value="opsi" class="bg-white text-black">
            {{ opsi }}
          </option>
        </select>
      </div>
    </div>

    <!-- Keterangan — dibatasi maksimal 500 karakter, sama seperti di Input -->
    <div class="mt-4">
      <div class="mb-1.5 flex items-center justify-between">
        <label class="block text-sm text-slate">Keterangan</label>
        <span class="text-xs text-muted">{{ keterangan.length }}/{{ KETERANGAN_MAX_LENGTH }}</span>
      </div>
      <textarea
        v-model="keterangan"
        :maxlength="KETERANGAN_MAX_LENGTH"
        rows="4"
        class="w-full resize-none rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
      ></textarea>
      <div v-if="sisaKarakter <= 20" class="mt-1 text-xs text-danger">Sisa {{ sisaKarakter }} karakter</div>
    </div>

    <!-- Tombol Save -->
    <div class="mt-6">
      <button
        @click="handleSimpan"
        class="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <Save :size="16" />
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ArrowLeft, Save } from "lucide-vue-next";
import { JENIS_PEKERJAAN_OPTIONS, STATUS_OPTIONS, KETERANGAN_MAX_LENGTH } from "../data";

const props = defineProps({
  tugas: { type: Object, required: true },
});
const emit = defineEmits(["kembali", "simpan"]);

// Form diisi dari data tugas yang sedang dibuka. Ini "salinan" terpisah,
// jadi perubahan di sini belum langsung mengubah data asli sampai
// tombol Save diklik.
const tanggal = ref(props.tugas.tanggal);
const noService = ref(props.tugas.noService);
const jenisPekerjaan = ref(props.tugas.jenisPekerjaan);
const status = ref(props.tugas.status);
const keterangan = ref(props.tugas.keterangan);

const sisaKarakter = computed(() => KETERANGAN_MAX_LENGTH - keterangan.value.length);

function handleSimpan() {
  if (noService.value.trim() === "") {
    alert("No Service tidak boleh kosong ya.");
    return;
  }

  emit("simpan", {
    tanggal: tanggal.value,
    noService: noService.value.trim(),
    jenisPekerjaan: jenisPekerjaan.value,
    status: status.value,
    keterangan: keterangan.value,
  });
}
</script>
