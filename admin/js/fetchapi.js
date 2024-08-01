// function for getALlpaket semua paket untuk di halaman paket
async function getAllPaket() {
  try {
    const response = await fetch(
      "http://localhost/scanship-api/paket/read.php"
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    // Mengambil elemen tbody
    const tableBody = document.getElementById("tablePaket");

    // Membersihkan tbody sebelum menambahkan data baru
    tableBody.innerHTML = "";

    // Mengiterasi data dan membuat baris tabel
    result.data.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${item.no_resi}</td>
          <td>${item.tanggal_pengiriman}</td>
          <td>${item.nama_penerima}</td>
          <td>${item.notelp_penerima}</td>
          <td>${item.alamat_tujuan}</td>
          <td>
            <a href="editpaket.html?no_resi=${item.no_resi}" class="btn btn-sm btn-warning btn-round"><i class="fas fa-edit" aria-hidden="true"></i></a>
            <button class="btn btn-sm btn-danger btn-round delete-button" data-id="${item.no_resi}" data-type="paket">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log("Terdapat error saat fetch API:", error);
  }
}

// buat cari data detail
async function getPaketDetailForEdit(noResi) {
  try {
    const response = await fetch(
      `http://localhost/scanship-api/paket/read.php?no_resi=${noResi}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json();

    const data = result.data;

    // Isi form dengan data yang diambil
    document.getElementById("no_resi").value = data.no_resi;
    document.getElementById("tanggal_pengiriman").value = data.tanggal_pengiriman;
    document.getElementById("nama-pengirim").value = data.nama_pengirim;
    document.getElementById("asal-pengirim").value = data.asal_pengirim;
    document.getElementById("nama-penerima").value = data.nama_penerima;
    document.getElementById("notelp_penerima").value = data.notelp_penerima;
    document.getElementById("tujuan").value = data.alamat_tujuan;
  } catch (error) {
    console.error("Error fetching paket details:", error);
  }
}

// handle update
async function handleUpdatePaket(updatePaket, no_resi) {
  try {
    const response = await fetch(
      `http://localhost/scanship-api/paket/update.php?no_resi=${no_resi}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatePaket),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Paket updated: ", data);

    // redirect ke halaman pesan.html
    window.location.href = "paket.html";
  } catch (error) {
    console.error("Error updating paket: ", error);
  }
}
