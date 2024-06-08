let saldo = 0;
let riwayat = [];

// Memeriksa apakah ada data tersimpan di localStorage saat halaman dimuat
window.onload = function () {
  if (localStorage.getItem("saldo")) {
    saldo = parseFloat(localStorage.getItem("saldo"));
  }
  if (localStorage.getItem("riwayat")) {
    riwayat = JSON.parse(localStorage.getItem("riwayat"));
  }
};

function updateOutput(message) {
  document.getElementById("output").innerText = message;
}

function saveToLocalStorage() {
  localStorage.setItem("saldo", saldo.toString());
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
}

function checkSaldo() {
  updateOutput(`Saldo sekarang: ${saldo}`);
}

function riwayatSaldo() {
  let historyOutput = "Riwayat Transaksi:\n";
  riwayat.forEach((transaction, index) => {
    historyOutput += `${index + 1}. ${transaction.date}/${transaction.month}: ${
      transaction.description
    } (${transaction.amount})\n`;
  });
  updateOutput(historyOutput);
}

function kurangiSaldo() {
  let kurang = parseFloat(document.getElementById("jumlahSaldo").value);
  if (isNaN(kurang) || kurang <= 0) {
    updateOutput("Masukkan jumlah saldo yang valid.");
  } else if (kurang > saldo) {
    updateOutput("Saldo tidak mencukupi.");
  } else {
    let date = document.getElementById("tanggal").value;
    let month = document.getElementById("bulan").value;
    saldo -= kurang;
    riwayat.push({
      date: date,
      month: month,
      description: `Pengurangan saldo sebesar ${kurang}`,
      amount: -kurang,
    });
    saveToLocalStorage();
    updateOutput(`Saldo berhasil dikurangi sebesar ${kurang}.`);
  }
}

function tambahSaldo() {
  let tambah = parseFloat(document.getElementById("jumlahSaldo").value);
  if (isNaN(tambah) || tambah <= 0) {
    updateOutput("Masukkan jumlah saldo yang valid.");
  } else {
    let date = document.getElementById("tanggal").value;
    let month = document.getElementById("bulan").value;
    saldo += tambah;
    riwayat.push({
      date: date,
      month: month,
      description: `Penambahan saldo sebesar ${tambah}`,
      amount: tambah,
    });
    saveToLocalStorage();
    updateOutput(`Saldo berhasil ditambahkan sebesar ${tambah}.`);
  }
}


function hapusRiwayat() {
  let index =
    parseInt(prompt("Masukkan indeks transaksi yang ingin dihapus:")) - 1;
  if (isNaN(index) || index < 0 || index >= riwayat.length) {
    updateOutput("Indeks transaksi tidak valid.");
  } else {
    riwayat.splice(index, 1);
    saveToLocalStorage();
    updateOutput(`Transaksi ke-${index + 1} berhasil dihapus.`);
    // Clear input field after deleting
    document.getElementById("inputIndex").value = "";
  }
}
// Buat pilihan tanggal dari 1 hingga 31
function populateTanggal() {
    let select = document.getElementById("tanggal");
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement("option");
        option.text = i;
        option.value = i;
        select.appendChild(option);
    }
}

// Buat pilihan bulan dari Januari hingga Desember
function populateBulan() {
    let select = document.getElementById("bulan");
    let bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    for (let i = 0; i < bulan.length; i++) {
        let option = document.createElement("option");
        option.text = bulan[i];
        option.value = i + 1;
        select.appendChild(option);
    }
}

// Panggil fungsi populateTanggal dan populateBulan saat halaman dimuat
window.onload = function() {
    populateTanggal();
    populateBulan();
};


function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

function updateOutput(message) {
  document.getElementById("output").innerText = message;
}

function checkSaldo() {
  updateOutput(`Saldo sekarang: ${formatIDR(saldo)}`);
}

function riwayatSaldo() {
  let historyOutput = "Riwayat Transaksi:\n";
  riwayat.forEach((transaction, index) => {
    historyOutput += `${index + 1}. ${transaction.date}/${transaction.month}: ${
      transaction.description
    } (${formatIDR(transaction.amount)})\n`;
  });
  updateOutput(historyOutput);
}

function resetSaldo() {
  saldo = 0;
  riwayat = [];
  saveToLocalStorage();
  updateOutput("Saldo berhasil direset.");
}
window.onload = function () {
  populateTanggal();
  populateBulan();
  riwayatSaldo(); // Menampilkan riwayat saldo saat halaman dimuat
};
function saveToLocalStorage() {
  localStorage.setItem("saldo", saldo.toString());
  localStorage.setItem("riwayat", JSON.stringify(riwayat));
}
window.onload = function () {
  populateTanggal();
  populateBulan();
  if (localStorage.getItem("saldo")) {
    saldo = parseFloat(localStorage.getItem("saldo"));
  }
  if (localStorage.getItem("riwayat")) {
    riwayat = JSON.parse(localStorage.getItem("riwayat"));
  }
  riwayatSaldo(); // Menampilkan riwayat saldo saat halaman dimuat
};
