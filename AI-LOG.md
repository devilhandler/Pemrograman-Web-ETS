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