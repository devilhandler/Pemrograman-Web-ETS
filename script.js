// Data utama: array berisi objek transaksi
let transaksi = [];

// Ambil elemen dari HTML
const form = document.getElementById("form-transaksi");
const daftar = document.getElementById("daftar-transaksi");

// Ubah angka jadi format Rupiah, contoh: 25000 -> Rp 25.000
function formatRupiah(angka) {
    const tanda = angka < 0 ? '-' : '';
    return tanda + "Rp " + Math.abs(angka).toLocaleString("id-ID");
}

// W1: ambil isi form lalu tambahkan ke array
function tambahTransaksi(event) {
  event.preventDefault(); // supaya halaman tidak reload saat submit

  const dataBaru = {
    id: Date.now(), // id unik dari waktu sekarang
    tanggal: document.getElementById("tanggal").value,
    jenis: document.getElementById("jenis").value,
    kategori: document.getElementById("kategori").value,
    nominal: Number(document.getElementById("nominal").value), // simpan sebagai angka
    catatan: document.getElementById("catatan").value
  };

  transaksi.push(dataBaru);
  renderDaftar();
  form.reset();
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
    daftar.appendChild(li);
  });
}

// Pasang event listener ke form
form.addEventListener("submit", tambahTransaksi);