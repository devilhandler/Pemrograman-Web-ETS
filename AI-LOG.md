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

