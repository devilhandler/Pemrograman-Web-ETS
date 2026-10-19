# Proses Pembuatan Website
Persona yang didapatkan adalah Mahasiswa Kos (atau nomor 1).

Situasinya adalah Mahasiswa Kos yang mendapatkan uang bulanan dari orang tua, tetapi dia sering kehabisan sebelum akhir bulan.

Nah, salah satu cara untuk memecahkan masalah tersebut dengan membuatkan website sederhana untuk *tracking* keuangan selama bulan. Sistem yang dimintakan seperti ini: 

    Input uang bulanan;
    tampilkan jatah harian = sisa uang ÷ sisa hari di bulan berjalan;
    munculkan peringatan jika pengeluaran hari ini melebihi jatah

Dan struktur datanya adalah:
    id: Menggunakan waktu saat menyimpan atau edit.
    tanggal: Tanggal yang dipilihkan
    jenis: Jenis nominal yang dimasukkan apa
    kategori: Kategorinya apa
    nominal: Total uangnya yang ingin diinput berapa

    catatan: Jika mau ada catatan, opsional ini.

Jadi salah satu *design* yang aku inginkan adalah aksen warna hijau untuk website Wallet+ ini, karena aksen hijau merupakan dari warna uang mata juga, jadi mengikut warna uang mata.

Tadi juga aku menemukan dua *bug* saat mengerjakan untuk Commit kedua (W3-W4), yaitu nama *script* dalam html adalah `app.js` yang seharusnya `script.js`, dan aku sendiri lupa untuk memasukkan `muatData()` dan `renderDaftar()` diujung `script.js`.

Dan ada *bug* ketiga yang aku ketemu, yaitu datanya duplikat dan ada fungsi yang dijalankan dua kali secara tidak sengaja, yaitu `transaksi.push(dataBaru)` di baris 84 (sebelumnya) dalam `script.js`. Itu di-fix dengan bantuan Claude.