import { reactive } from "vue";
import { MOCK_USERS } from "../data";

// ----------------------------------------------------------------------------
// AUTH STORE (SEDERHANA)
// ----------------------------------------------------------------------------
// Ini bukan library auth sungguhan — cuma object reactive biasa yang dipakai
// bersama oleh semua komponen (LoginView, Topbar, HalamanInput, dst) supaya
// mereka semua tahu "siapa yang lagi login" tanpa perlu oper prop berlapis-lapis.
//
// Kalau nanti mau upgrade ke Pinia atau auth beneran (API + token), yang perlu
// diganti cuma isi function login() & logout() di bawah ini — pemakaian di
// komponen lain (authState.currentUser) tidak perlu berubah.
// ----------------------------------------------------------------------------

export const authState = reactive({
  currentUser: null, // null artinya belum login. Kalau sudah login: { id, name, role }
});

export function login(email, password) {
  const emailBersih = email.trim().toLowerCase();

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === emailBersih && u.password === password
  );

  if (!user) {
    return { success: false, message: "Email atau password salah." };
  }

  authState.currentUser = { id: user.id, name: user.name, role: user.role };
  return { success: true };
}

export function logout() {
  authState.currentUser = null;
}
