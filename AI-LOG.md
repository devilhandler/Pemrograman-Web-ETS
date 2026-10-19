# Riwayat prompt Claude

Disini aku simpankan riwayat prompt dan *link chat*-nya.

Link Claude Chat:

## W1–W2: Form tambah transaksi dan daftar transaksi
- Prompt: "buatkan W1 dan W2 (form tambah transaksi dan daftar transaksi dinamis berformat Rupiah) dengan vanilla JS yang ringkas dan simpel"
- Dipakai: index.html (form), style.css, fungsi tambahTransaksi(), renderDaftar(), dan formatRupiah() di app.js
- Diubah: Diganti dari nama "Personal Money Management" ke "Wallet+" karena keren namanya. Dan format rupiahnya ditambahkan tanda "-" jika memang kurang dari pemasukannya, di `formatRupiah` dalam `script.js`

## Keputusan desain (PROSES.md)
- Prompt: "untuk keputusan desainnya bagusnya seperti apa?"
- Dipakai: tidak ada kode; AI memberi beberapa opsi keputusan desain, saya pilih "nominal disimpan sebagai angka, bukan teks Rupiah"
- Diubah: penjelasan di PROSES.md saya tulis ulang dengan kata-kata sendiri

## Otomatis membuat untuk AI-LOG
- Prompt: "Oiya dari sekarang jika aku prompt sesuatu, buatkan juga untuk diisikan di AI-LOG.md."
- Dipakai: Hasil dari *generated AI-LOG Claude* aku *copy paste* dalam AI-LOG.md
- Diubah: Tidak ada yang diubah.

## W3–W4: Hapus transaksi dan data persisten
- Prompt: "lanjut ke W3-W4 (hapus transaksi dengan konfirmasi dan simpan data ke localStorage)"
- Dipakai: fungsi simpanData(), muatData(), hapusTransaksi(), dan tombol Hapus di renderDaftar() pada app.js
- Diubah: Kunci ke localStorage-nya digantikan ke "Wallet+:transaksi"

## Bug: data tidak muncul setelah refresh
- Prompt: "ini kenapa tidak ke-save ya" (melampirkan index.html, script.js, style.css)
- Dipakai: pemanggilan muatData() dan renderDaftar() di akhir script.js, serta fungsi hapusTransaksi()
- Diubah: AI menemukan muatData() tidak pernah dipanggil; saya tambahkan sendiri lalu cek data di DevTools > Application > Local Storage

## W5–W6: Ringkasan dan validasi form
- Prompt: "lanjut ke W5 dan W6" (melanjutkan script.js milik saya)
- Dipakai: fungsi hitungRingkasan() dan validasiForm() di script.js, elemen #ringkasan dan #pesan-error di index.html, serta style-nya di style.css
- Diubah: Ganti `KUNCI` dalam `script.js` ke `"Walletplus:transaksi"`

## Fitur khas jatah harian + bonus Edit, Filter, Ekspor/Impor JSON
- Prompt: "apakah fitur jatah harian sudah diimplementasi? kerjakan juga fitur tambahan Edit, Filter, Ekspor data ke JSON"
- Dipakai: hitungJatahHarian(), tambahUangBulanan(), tanggalHariIni(), mulaiEdit(), keluarModeEdit(), ambilDataTerfilter(), eksporData(), imporData() di script.js beserta elemen HTML dan CSS-nya
- Diubah: Hapus baris 93 di `index.html` karena sudah di lakukan di baris 74 (atau Fitur Bonus: Filter & Pencarian)

## Bug: transaksi duplikat saat submit/hapus
- Prompt: "ada bug dalam penyimpanan, kenapa saat submit dan hapus itu duplikat?" (melampirkan index.html, script.js, style.css)
- Dipakai: tidak ada kode baru; AI menunjukkan baris transaksi.push() ganda, id tombol-simpan yang hilang, dan kategori form/filter yang tidak sama
- Diubah: saya hapus push ganda, tambah id="tombol-simpan", dan menyamakan opsi kategori di form dan filter

## Tampilan: aksen hijau, light/dark mode, judul gradien
- Prompt: "buatkan dengan aksen hijau, bisa light mode dan dark mode, simpel, judul Wallet+ diberi gradien hitam & putih"
- Dipakai: seluruh style.css (variabel warna, body.dark, gradien h1, media query 480px), tombol #tombol-tema di index.html, fungsi terapkanTema() di script.js
- Diubah: Tidak ada perubahan.