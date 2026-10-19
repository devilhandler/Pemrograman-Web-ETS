// Data utama: array berisi objek transaksi
let transaksi = [];
const KUNCI = "Walletplus:transaksi"

// Ambil elemen dari HTML
const form = document.getElementById("form-transaksi");
const daftar = document.getElementById("daftar-transaksi");

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
        catatan: document.getElementById("catatan").value
    };

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
}

// Pasang event listener ke form
form.addEventListener("submit", tambahTransaksi);

muatData();
renderDaftar();