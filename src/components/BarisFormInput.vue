<template>
  <div class="rounded-xl border border-line-light bg-white p-5">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-xs font-semibold uppercase tracking-wide text-muted"> Data #{{ nomorBaris }} </span>
      <button
        v-if="bisaDihapus"
        @click="$emit('hapus')"
        class="flex items-center gap-1 text-xs font-medium text-danger hover:underline"
      >
        <Trash2 :size="13" />
        Hapus
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <!-- Tanggal — tidak diberi batas "min", jadi tanggal mundur (backdate) boleh dipilih. -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Tanggal</label>
        <input
          type="date"
          :value="baris.tanggal"
          @input="ubah('tanggal', $event.target.value)"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <!-- No Service -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">No Service</label>
        <input
          type="text"
          placeholder="Nomor service / ODP"
          :value="baris.noService"
          @input="ubah('noService', $event.target.value)"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <!-- Jenis Pekerjaan -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Jenis Pekerjaan</label>
        <select
          :value="baris.jenisPekerjaan"
          @change="ubah('jenisPekerjaan', $event.target.value)"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option v-for="opsi in JENIS_PEKERJAAN_OPTIONS" :key="opsi" :value="opsi">{{ opsi }}</option>
        </select>
      </div>

      <!-- Status -->
      <div>
        <label class="mb-1.5 block text-sm text-slate">Status</label>
        <select
          :value="baris.status"
          @change="ubah('status', $event.target.value)"
          class="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option v-for="opsi in STATUS_OPTIONS" :key="opsi" :value="opsi">{{ opsi }}</option>
        </select>
      </div>
    </div>

    <!-- Keterangan -->
    <div class="mt-4">
      <div class="mb-1.5 flex items-center justify-between">
        <label class="block text-sm text-slate">Keterangan</label>
        <span class="text-xs text-muted">{{ baris.keterangan.length }}/{{ KETERANGAN_MAX_LENGTH }}</span>
      </div>
      <textarea
        placeholder="Tambah keterangan pekerjaan..."
        :value="baris.keterangan"
        :maxlength="KETERANGAN_MAX_LENGTH"
        @input="ubah('keterangan', $event.target.value)"
        rows="3"
        class="w-full resize-none rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
      ></textarea>
      <div v-if="sisaKarakter <= 20" class="mt-1 text-xs text-danger">Sisa {{ sisaKarakter }} karakter</div>
    </div>

    <!-- PIC — otomatis diisi user yang sedang login, tidak bisa diubah -->
    <div class="mt-4">
      <label class="mb-1.5 block text-sm text-slate">PIC</label>
      <div class="flex w-fit items-center gap-2 rounded-lg bg-soft px-3 py-2 text-sm text-gray-mid">
        <UserRound :size="14" />
        {{ authState.currentUser.name }} (Otomatis)
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Trash2, UserRound } from "lucide-vue-next";
import { JENIS_PEKERJAAN_OPTIONS, STATUS_OPTIONS, KETERANGAN_MAX_LENGTH } from "../data";
import { authState } from "../store/auth";

const props = defineProps({
  baris: { type: Object, required: true },
  nomorBaris: { type: Number, required: true },
  bisaDihapus: { type: Boolean, default: false },
});
const emit = defineEmits(["ubah-field", "hapus"]);

const sisaKarakter = computed(() => KETERANGAN_MAX_LENGTH - props.baris.keterangan.length);

function ubah(namaField, nilaiBaru) {
  emit("ubah-field", namaField, nilaiBaru);
}
</script>
