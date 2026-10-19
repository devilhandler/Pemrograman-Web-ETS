// Data utama: array berisi objek transaksi
let transaksi = [];
const KUNCI = "Walletplus:transaksi"

// id transaksi yang sedang diedit (null = mode tambah biasa)
let idEdit = null;

// Ambil elemen dari HTML
const form = document.getElementById("form-transaksi");
const daftar = document.getElementById("daftar-transaksi");
const pesanError = document.getElementById("pesan-error");
const tombolSimpan = document.getElementById("tombol-simpan");
const tombolBatal = document.getElementById("tombol-batal");

// Ubah angka jadi format Rupiah, contoh: 25000 -> Rp 25.000
function formatRupiah(angka) {
    const tanda = angka < 0 ? '-' : '';
    return tanda + "Rp " + Math.abs(angka).toLocaleString("id-ID");
}

// Tanggal hari ini dalam format "YYYY-MM-DD" (pakai waktu lokal, bukan UTC)
function tanggalHariIni() {
    const d = new Date();
    const bulan = String(d.getMonth() + 1).padStart(2, "0");
    const hari = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + bulan + "-" + hari;
}

// W4: simpan array ke localStorage (harus diubah jadi teks dulu)
function simpanData() {
    localStorage.setItem(KUNCI, JSON.stringify(transaksi));
}
 
// W4: baca data dari localStorage saat halaman dibuka
function muatData() {
    const dataTersimpan = localStorage.getItem(KUNCI);
    if (dataTersimpan) {
        transaksi = JSON.parse(dataTersimpan); // teks -> array lagi
    }
}

// W6: cek isi form, kembalikan pesan error (atau "" jika valid)
function validasiForm(data) {
    if (data.tanggal === "") return "Tanggal wajib diisi.";
    if (data.jenis === "") return "Jenis wajib dipilih.";
    if (data.kategori === "") return "Kategori wajib dipilih.";
    if (isNaN(data.nominal) || data.nominal <= 0) return "Nominal harus lebih dari 0.";
    return "";
}

// W1: ambil isi form lalu tambahkan ke array
function tambahTransaksi(event) {
    event.preventDefault(); // supaya halaman tidak reload saat submit

    // KERANGKA DATANYA
    const dataBaru = {
        id: idEdit !== null ? idEdit : Date.now(), // saat edit, id lama dipakai
        tanggal: document.getElementById("tanggal").value,
        jenis: document.getElementById("jenis").value,
        kategori: document.getElementById("kategori").value,
        nominal: Number(document.getElementById("nominal").value), // simpan sebagai angka

        catatan: document.getElementById("catatan").value // opsional
    };

    // W6: jika tidak valid, tampilkan error dan berhenti
    const error = validasiForm(dataBaru);
    if (error !== "") {
        pesanError.textContent = error;
        return;
    }
    pesanError.textContent = ""; // hapus error lama

    // Fitur bonusnya
    if (idEdit !== null) {
        // ganti transaksi lama dengan data baru (id sama)
        transaksi = transaksi.map(function (t) {
            return t.id === idEdit ? dataBaru : t;
        });
    } else {
        transaksi.push(dataBaru);
    }

    simpanData();
    renderDaftar();
    keluarModeEdit();
}

// BONUS Edit: isi form dengan data transaksi yang dipilih
function mulaiEdit(id) {
    const t = transaksi.find(function (item) {
        return item.id === id;
    });
 
    document.getElementById("tanggal").value = t.tanggal;
    document.getElementById("jenis").value = t.jenis;
    document.getElementById("kategori").value = t.kategori;
    document.getElementById("nominal").value = t.nominal;
    document.getElementById("catatan").value = t.catatan;
 
    idEdit = id;
    tombolSimpan.textContent = "Update";
    tombolBatal.hidden = false;
}

// BONUS Edit: kembalikan form ke mode tambah biasa
function keluarModeEdit() {
    idEdit = null;
    form.reset();
    pesanError.textContent = "";
    tombolSimpan.textContent = "Simpan";
    tombolBatal.hidden = true;
}

// W3: hapus transaksi berdasarkan id, dengan konfirmasi dulu
function hapusTransaksi(id) {
    const yakin = confirm("Yakin ingin menghapus transaksi ini?");
    if (!yakin) return; // batal, tidak jadi hapus

    // simpan semua transaksi KECUALI yang id-nya sama
    transaksi = transaksi.filter(function (t) {
        return t.id !== id;
    });

    if (idEdit === id) keluarModeEdit();

    simpanData();
    renderDaftar();
}

// W5: hitung total pemasukan, pengeluaran, dan saldo
function hitungRingkasan() {
    const totalPemasukan = transaksi
        .filter(function (t) { return t.jenis === "pemasukan"; })
        .reduce(function (total, t) { return total + t.nominal; }, 0);
 
    const totalPengeluaran = transaksi
        .filter(function (t) { return t.jenis === "pengeluaran"; })
        .reduce(function (total, t) { return total + t.nominal; }, 0);
 
    const saldo = totalPemasukan - totalPengeluaran;
 
    document.getElementById("total-pemasukan").textContent = formatRupiah(totalPemasukan);
    document.getElementById("total-pengeluaran").textContent = formatRupiah(totalPengeluaran);
    document.getElementById("saldo").textContent = formatRupiah(saldo);
}

// FITUR KHAS: tambah uang bulanan sebagai transaksi pemasukan biasa
function tambahUangBulanan(event) {
    event.preventDefault();
    const nominal = Number(document.getElementById("uang-bulanan").value);
    if (isNaN(nominal) || nominal <= 0) {
        document.getElementById("peringatan").textContent = "Uang bulanan harus lebih dari 0.";
        return;
    }
 
    transaksi.push({
        id: Date.now(),
        tanggal: tanggalHariIni(),
        jenis: "pemasukan",
        kategori: "Uang Bulanan",
        nominal: nominal,
        catatan: "Uang bulanan dari orang tua"
    });
 
    simpanData();
    renderDaftar();
    document.getElementById("uang-bulanan").value = "";
}

// FITUR KHAS: jatah harian = sisa uang ÷ sisa hari di bulan ini
function hitungJatahHarian() {
    const hariIni = tanggalHariIni();          // contoh "2026-10-19"
    const bulanIni = hariIni.slice(0, 7);      // contoh "2026-10"
 
    const now = new Date();
    const hariTerakhir = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const sisaHari = hariTerakhir - now.getDate() + 1; // hari ini ikut dihitung
 
    // transaksi bulan ini saja
    const bulanIniSaja = transaksi.filter(function (t) {
        return t.tanggal.startsWith(bulanIni);
    });
 
    const pemasukanBulanIni = bulanIniSaja
        .filter(function (t) { return t.jenis === "pemasukan"; })
        .reduce(function (total, t) { return total + t.nominal; }, 0);
 
    // pengeluaran SEBELUM hari ini (supaya jatah hari ini tidak berubah saat belanja)
    const pengeluaranSebelumHariIni = bulanIniSaja
        .filter(function (t) { return t.jenis === "pengeluaran" && t.tanggal < hariIni; })
        .reduce(function (total, t) { return total + t.nominal; }, 0);
 
    const pengeluaranHariIni = bulanIniSaja
        .filter(function (t) { return t.jenis === "pengeluaran" && t.tanggal === hariIni; })
        .reduce(function (total, t) { return total + t.nominal; }, 0);
 
    const sisaUang = pemasukanBulanIni - pengeluaranSebelumHariIni;
    const jatah = Math.floor(sisaUang / sisaHari);
 
    document.getElementById("sisa-uang").textContent = formatRupiah(sisaUang);
    document.getElementById("sisa-hari").textContent = sisaHari;
    document.getElementById("jatah-harian").textContent = formatRupiah(jatah);
    document.getElementById("pengeluaran-hari-ini").textContent = formatRupiah(pengeluaranHariIni);
 
    // peringatan jika pengeluaran hari ini melebihi jatah
    const peringatan = document.getElementById("peringatan");
    if (pengeluaranHariIni > jatah) {
        peringatan.textContent = "Peringatan: pengeluaran hari ini melebihi jatah harian!";
    } else {
        peringatan.textContent = "";
    }
}
 
// BONUS Filter: kembalikan transaksi yang lolos filter
function ambilDataTerfilter() {
    const jenis = document.getElementById("filter-jenis").value;
    const kategori = document.getElementById("filter-kategori").value;
    const cari = document.getElementById("filter-cari").value.toLowerCase();
 
    return transaksi.filter(function (t) {
        const cocokJenis = jenis === "" || t.jenis === jenis;
        const cocokKategori = kategori === "" || t.kategori === kategori;
        const cocokCari = t.catatan.toLowerCase().includes(cari);
        return cocokJenis && cocokKategori && cocokCari;
    });
}

// W2: tampilkan daftar transaksi dari array (terbaru di atas)
function renderDaftar() {
    daftar.innerHTML = "";

    // salin data terfilter lalu urutkan: tanggal terbaru dulu, jika sama pakai id terbaru
    const urut = ambilDataTerfilter().sort(function (a, b) {
        if (a.tanggal === b.tanggal) return b.id - a.id;
        return b.tanggal.localeCompare(a.tanggal);
    });

    urut.forEach(function (t) {

        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${t.tanggal}</strong> - ${t.kategori}<br>
            <span class="${t.jenis}">${t.jenis}: ${formatRupiah(t.nominal)}</span><br>
            <small>${t.catatan}</small>
        `;

        // BONUS Edit: tombol edit untuk tiap transaksi
        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", function () {
            mulaiEdit(t.id);
        });
        li.appendChild(tombolEdit);

        // W3: tombol hapus untuk tiap transaksi
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function () {
            hapusTransaksi(t.id);
        });
        li.appendChild(tombolHapus);

        daftar.appendChild(li);
    });

    // W5 + FITUR KHAS: ikut diperbarui setiap daftar di-render ulang
    hitungRingkasan();
    hitungJatahHarian();
}

// BONUS Ekspor: unduh array transaksi sebagai file JSON
function eksporData() {
    const isi = JSON.stringify(transaksi, null, 2);
    const blob = new Blob([isi], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wallet-backup.json";
    link.click();
    URL.revokeObjectURL(link.href);
}

// BONUS Impor: baca file JSON lalu ganti data transaksi
function imporData(event) {
    const file = event.target.files[0];
    if (!file) return;
 
    const reader = new FileReader();
    reader.onload = function () {
        try {
            const data = JSON.parse(reader.result);
            if (!Array.isArray(data)) throw new Error("bukan array");
            transaksi = data;
            simpanData();
            renderDaftar();
        } catch (e) {
            pesanError.textContent = "File JSON tidak valid.";
        }
        event.target.value = ""; // supaya file yang sama bisa diimpor lagi
    };
    reader.readAsText(file);
}

// Pasang event listener ke form
form.addEventListener("submit", tambahTransaksi);
tombolBatal.addEventListener("click", keluarModeEdit);
document.getElementById("form-uang-bulanan").addEventListener("submit", tambahUangBulanan);
document.getElementById("filter-jenis").addEventListener("change", renderDaftar);
document.getElementById("filter-kategori").addEventListener("change", renderDaftar);
document.getElementById("filter-cari").addEventListener("input", renderDaftar);
document.getElementById("tombol-ekspor").addEventListener("click", eksporData);
document.getElementById("input-impor").addEventListener("change", imporData);

// TEMA: ganti light/dark mode, pilihan disimpan di localStorage
const tombolTema = document.getElementById("tombol-tema");
 
function terapkanTema(tema) {
    document.body.classList.toggle("dark", tema === "dark");
    tombolTema.textContent = tema === "dark" ? "☀️ Light" : "🌙 Dark";
}
 
tombolTema.addEventListener("click", function () {
    const temaBaru = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("Walletplus:tema", temaBaru);
    terapkanTema(temaBaru);
});
 
terapkanTema(localStorage.getItem("Walletplus:tema") || "light");

muatData();
renderDaftar();