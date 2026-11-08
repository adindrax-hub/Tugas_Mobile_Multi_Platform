# 📓 Diary App - Modul 6 (State & React Hooks)

**Identitas Pengembang**

* **Nama:** Adindra Hakim Mulyawan
* **NIM:** 2430511048
* **Kelas:** [Isi Kelas Anda di sini]
* **Program Studi:** Teknik Informatika
* **Universitas:** Universitas Muhammadiyah Sukabumi

## 📖 Deskripsi Proyek

Diary App versi Modul 6 adalah pengembangan lanjutan yang dibangun dari awal menggunakan **Expo Router (File-based Routing)** dan arsitektur komponen modern di **React Native**. Aplikasi ini dirancang untuk mendemonstrasikan pemahaman mendalam mengenai manajemen *state* (lokal, *shared*, dan *derived*), penanganan *side effects* menggunakan *hooks*, serta optimasi performa aplikasi seluler.

Setiap catatan dikelola secara terpusat dan disajikan dengan antarmuka yang bersih (mendukung efek bayangan *soft shadow*, filter berbasis emoji, dan navigasi multi-screen berbasis *Tabs* serta *Stack*).

---

## ✨ Fitur & Tugas Praktikum yang Diselesaikan

Aplikasi ini telah memenuhi seluruh indikator tugas praktikum pada Modul 6:

* **Expo Router & File-based Navigation:** Menggunakan struktur routing berbasis direktori (`app/` untuk tatanan *Stack* dan `app/(tabs)/` untuk navigasi bawah).
* **Shared State (Context API):** Mengelola daftar entri (`entries`) dan status suka (`likedIds`) secara global melalui `DiaryContext` agar tersinkronisasi lintas halaman.
* **Custom Hook `useDiarySearch`:** Menggabungkan logika pencarian *real-time* (dilengkapi *debounce* 350ms menggunakan `useEffect` dan *cleanup*) serta penyaringan data berdasarkan **Mood** menggunakan `useMemo`.
* **Custom Hook `useLikedEntries`:** Mengekstrak dan menyaring khusus entri yang ditandai sebagai favorit untuk ditampilkan pada tab khusus.
* **Tab Favorites:** Menu khusus untuk melihat daftar catatan yang disukai dengan status interaktif yang selalu sinkron.
* **UI/UX Enhancement:** Mengganti ikon berbasis teks dengan `@expo/vector-icons` (Ionicons) untuk menghindari masalah *render* pada Android serta merapikan *styling* kartu dan filter.

---

## ⚙️ Penjelasan 5 React Hooks yang Digunakan

| Nama Hook | Dependency Array | Alasan Pemilihan & Fungsi di Aplikasi |
| :--- | :--- | :--- |
| **useState** | *(Tidak ada)* | Menyimpan data lokal yang berubah secara dinamis (seperti input teks form, status mood terpilih, dan mode pengaturan) serta memicu pembaruan UI secara langsung. |
| **useEffect** | `[query, selectedMood]` | Mengelola *side effect* berupa *timer debounce* pada form pencarian. Memberikan jeda 350ms sebelum memfilter data dan membersihkan (*cleanup*) *timer* lama untuk mencegah render berlebih. |
| **useMemo** | `[entries, debouncedQuery, selectedMood]` | Melakukan *memoization* (penyimpanan sementara) hasil kalkulasi berat saat memfilter daftar catatan. Mencegah React melakukan komputasi ulang jika data utama tidak berubah. |
| **useContext** | *(Tidak ada)* | Mengakses data global (*shared state* seperti *entries* dan *toggleLike*) ke seluruh komponen tanpa harus melewati proses *prop-drilling* yang panjang. |
| **useRef** | *(Tidak ada)* | Menyimpan referensi langsung ke elemen *TextInput* pada layar pencarian untuk mengembalikan fokus secara imperatif saat tombol *Reset* ditekan. |

---

## 🚀 Cara Menjalankan Aplikasi

**Prasyarat:**
Pastikan Node.js, npx, dan aplikasi **Expo Go** di ponsel Anda sudah terinstal.

**Langkah-langkah:**

1. Buka Terminal atau Command Prompt pada folder proyek `diary-app6`:
   ```bash
   cd diary-app6
   ```

2. Jalankan server pengembangan Expo dengan membersihkan *cache* sebelumnya:
   ```bash
   npx expo start -c
   ```

3. Pilih cara pengujian:
   * **Ponsel Fisik:** Buka aplikasi *Expo Go* di HP Anda, lalu *scan QR Code* yang muncul di terminal (pastikan HP dan laptop berada di jaringan Wi-Fi yang sama).
   * **Android Emulator:** Tekan tombol `a` pada *keyboard* di terminal Anda jika Android Studio sedang berjalan.

---
*Dikembangkan sebagai bagian dari Praktikum Mobile Programming - Universitas Muhammadiyah Sukabumi*