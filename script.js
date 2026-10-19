// Data utama: array berisi objek transaksi
let transaksi = [];
const KUNCI = "Walletplus:transaksi"

// Ambil elemen dari HTML
const form = document.getElementById("form-transaksi");
const daftar = document.getElementById("daftar-transaksi");
const pesanError = document.getElementById("pesan-error");

// Ubah angka jadi format Rupiah, contoh: 25000 -> Rp 25.000
function formatRupiah(angka) {
    const tanda = angka < 0 ? '-' : '';
    return tanda + "Rp " + Math.abs(angka).toLocaleString("id-ID");
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
        id: Date.now(), // id unik dari waktu sekarang
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

    transaksi.push(dataBaru);
    simpanData();
    renderDaftar();
    form.reset();
}

// W3: hapus transaksi berdasarkan id, dengan konfirmasi dulu
function hapusTransaksi(id) {
    const yakin = confirm("Yakin ingin menghapus transaksi ini?");
    if (!yakin) return; // batal, tidak jadi hapus

    // simpan semua transaksi KECUALI yang id-nya sama
    transaksi = transaksi.filter(function (t) {
        return t.id !== id;
    });

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

// W2: tampilkan daftar transaksi dari array (terbaru di atas)
function renderDaftar() {
    daftar.innerHTML = "";

    // salin array lalu urutkan: tanggal terbaru dulu, jika sama pakai id terbaru
    const urut = [...transaksi].sort(function (a, b) {
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

        // W3: tombol hapus untuk tiap transaksi
        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", function () {
            hapusTransaksi(t.id);
        });
        li.appendChild(tombolHapus);

        daftar.appendChild(li);
    });

    // W5: ringkasan ikut diperbarui setiap daftar di-render ulang
    hitungRingkasan();
}

// Pasang event listener ke form
form.addEventListener("submit", tambahTransaksi);

muatData();
renderDaftar();