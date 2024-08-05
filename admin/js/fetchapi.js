  // BASE API URL, kalau punya kamu port localhost beda ganti disini ya cantik 💙
  // di liat juga akhiran gak pake slash / 
  BASE_URL = `http://localhost/scanship-api`


  // paket
  // function for getALlpaket semua paket untuk di halaman paket
  async function getAllPaket() {
    try {
      const response = await fetch(
        `${BASE_URL}/paket/read.php`
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
      result.data.forEach((item) => {
        const row = document.createElement("tr");

        console.log(item);

        row.innerHTML = `
            <td>${item.no_resi}</td>
            <td>${item.tanggal_pengiriman}</td>
            <td>${item.nama_penerima}</td>
            <td>${item.notelp_penerima}</td>
            <td>${item.alamat_tujuan}</td>
            <td>${item.nama_kurir}</td>
            <td>
              <a href="editpaket.html?no_resi=${item.no_resi}" class="btn btn-sm btn-warning btn-round"><i class="fas fa-edit" aria-hidden="true"></i></a>
              <button class="btn btn-sm btn-danger btn-round delete-button-paket" data-id="${item.no_resi}" data-type="paket">
                <i class="fa fa-trash"></i>
              </button> 
            </td>
          `;

          tableBody.appendChild(row);
          addDeleteEventListeners();
      });
    } catch (error) {
      console.log("Terdapat error saat fetch API:", error);
    }
  }

  // buat cari data detail
  async function getPaketDetailForEdit(noResi) {
    try {
      const response = await fetch(
        `${BASE_URL}/paket/read.php?no_resi=${noResi}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();

      const data = result.data;

      // Isi form dengan data yang diambil
      document.getElementById("no-resi-edit").value = data.package.no_resi;
      document.getElementById("tanggal-pengiriman-edit").value = data.package.tanggal_pengiriman;
      document.getElementById("nama-pengirim-edit").value = data.package.nama_pengirim;
      document.getElementById("asal-pengirim-edit").value = data.package.asal_pengirim;
      document.getElementById("nama-penerima-edit").value = data.package.nama_penerima;
      document.getElementById("notelp-penerima-edit").value = data.package.notelp_penerima;
      document.getElementById("tujuan-edit").value = data.package.alamat_tujuan;
      // document.getElementById("edit-kurir").value = data.package.id_kurir;
    } catch (error) {
      console.error("Error fetching paket details:", error);
    }
  }

  async function getPaketDetail(noResi) {
    try {
      const response = await fetch(
        `${BASE_URL}/paket/read.php?no_resi=${noResi}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();

      const data = result.data;

      if(!data || data.length === 0){
        console.log(`No data found for no_resi${noResi}`)
        return null;
      }

      return data;

    } catch{
      console.error("Error fetching paket details:", error);
      return null;
    }
  }

  // handle post paket
  async function handlePostPaket(paketData){
    try{
      // cek apakah resi ada
      // const tersediaPaket = await getPaketDetail(no_resi);
      // if(tersediaPaket){
      //   alert("No resi sudah ada, Harap gunakan no resi yang berbeda");
      //   return;
      // }

      // post data paket
      const response = await fetch(`${BASE_URL}/paket/create.php`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(paketData),
      })

      // Cek apakah permintaan berhasil
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Paket berhasil ditambahkan:', data);

      // Tampilkan pesan sukses atau redirect ke halaman lain
      window.location.href = "paket.html"

    } catch(error){
      console.error("Error insert paket: ", error);
      alert("terjadi kesalahan");
    }
  } 

  // handle update
  async function handleUpdatePaket(updatePaket, no_resi) {
    try {
      const response = await fetch(
        `${BASE_URL}/paket/update.php?no_resi=${no_resi}`,
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


  // Event listener for delete buttons
  // Function to add event listeners to delete buttons
    function addDeleteEventListeners() {
      document.querySelectorAll('.delete-button-paket').forEach(button => {
        button.addEventListener('click', async function() {
          const noResi = this.getAttribute('data-id');
          const confirmed = confirm('Apakah Anda yakin ingin menghapus paket ini?');

          if (confirmed) {
            await handleDeletePaket(noResi);
            // Setelah penghapusan berhasil, refresh data
            getAllPaket();
          }
        });
      });
    }

  // delete 
  async function handleDeletePaket(no_resi){
    try{
      const response = await fetch(`${BASE_URL}/paket/delete.php?no_resi=${no_resi}`, {
        method: "DELETE"
      });

      if(!response.ok){
        throw new Error(`Error: ${response.statusText}`);
      }

      // get the result from the response

      const result = await response.json();
      console.log("data anda berhasil di hapus: ", result);
      
    } catch (error) {
      console.error("Error deleting paket: ", error);
    }

  }
  // paket


  // kurir
  // function for getALlpaket semua paket untuk di halaman paket
  async function getAllKurir() {
    try {
      const response = await fetch(
        `${BASE_URL}/kurir/read.php`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Mengambil elemen tbody
      const tableBody = document.getElementById("tableKurir");

      // Membersihkan tbody sebelum menambahkan data baru
      tableBody.innerHTML = "";

      // Mengiterasi data dan membuat baris tabel
      result.data.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id_kurir}</td>
            <td>${item.usn_kurir}</td>
            <td>${item.nama_kurir}</td>
            <td>${item.email_kurir}</td>
            <td>${item.notelp_kurir}</td>
            <td>
              <a href="editkurir.html?id_kurir=${item.id_kurir}" class="btn btn-sm btn-warning btn-round"><i class="fas fa-edit" aria-hidden="true"></i></a>
              <button class="btn btn-sm btn-danger btn-round delete-button-kurir" data-id="${item.id_kurir}" data-type="kurir">
                <i class="fa fa-trash"></i>
              </button> 
            </td>
          `;

          tableBody.appendChild(row);
          addDeleteEventListeners();
      });
    } catch (error) {
      console.log("Terdapat error saat fetch API:", error);
    }
  }


  async function getKurir() {
    try {
      const response = await fetch(
        `${BASE_URL}/kurir/read.php`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      // Mengambil elemen tbody
      return result;
    
    } catch (error) {
      console.log("Terdapat error saat fetch API:", error);
    }
  }

  // buat cari data detail
  async function getKurirDetailForEdit(idKurir) {
    try {
      const response = await fetch(
        `${BASE_URL}/kurir/read.php?id_kurir=${idKurir}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();

      const data = result.data;

      // Isi form dengan data yang diambil
      document.getElementById("id-kurir-edit").value = data.id_kurir;
      document.getElementById("username-kurir-edit").value = data.usn_kurir;
      document.getElementById("nama-kurir-edit").value = data.nama_kurir;
      document.getElementById("email-kurir-edit").value = data.email_kurir;
      document.getElementById("notelp-kurir-edit").value = data.notelp_kurir;
      // document.getElementById("new-pw-kurir").value = data.new_pw_kurir;
      // document.getElementById("change-pw-kurir").value = data.change_pw_kurir;
    } catch (error) {
      console.error("Error fetching paket details:", error);
    }
  }

  async function getKurirDetail(idKurir) {
    try {
      const response = await fetch(
        `${BASE_URL}/kurir/read.php?id_kurir=${idKurir}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();

      const data = result.data;

      if(data || data.length === 0){
        console.log(`No data found for id_kurir${idKurir}`)
        return null;
      }

      return data;

    } catch{
      console.error("Error fetching courier details:", error);
      return null;
    }
  }

  // handle post paket
  async function handlePostKurir(kurirData){
    try{
      // cek apakah resi ada
      // const tersediaPaket = await getPaketDetail(no_resi);
      // if(tersediaPaket){
      //   alert("No resi sudah ada, Harap gunakan no resi yang berbeda");
      //   return;
      // }

      // post data paket
      const response = await fetch(`${BASE_URL}/kurir/create.php`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(kurirData),
      })

      // Cek apakah permintaan berhasil
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      console.log('Kurir berhasil ditambahkan:', data);

      // Tampilkan pesan sukses atau redirect ke halaman lain
      window.location.href = "kurir.html"

    } catch(error){
      console.error("Error insert paket: ", error);
      alert("terjadi kesalahan");
    }
  } 

  // handle update
  async function handleUpdateKurir(updateKurir, id_kurir) {
    try {
      const response = await fetch(
        `${BASE_URL}/kurir/update.php?id_kurir=${id_kurir}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updateKurir),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Courier updated: ", data);

      // redirect ke halaman pesan.html
      window.location.href = "kurir.html";
    } catch (error) {
      console.error("Error updating courier: ", error);
    }
  }


  // Event listener for delete buttons
  // Function to add event listeners to delete buttons
    function addDeleteEventListeners() {
      document.querySelectorAll('.delete-button-kurir').forEach(button => {
        button.addEventListener('click', async function() {
          const idKurir = this.getAttribute('data-id');
          const confirmed = confirm('Apakah Anda yakin ingin menghapus kurir ini?');

          if (confirmed) {
            await handleDeleteKurir(idKurir);
            // Setelah penghapusan berhasil, refresh data
            getAllKurir();
          }
        });
      });
    }

  // delete 
  async function handleDeleteKurir(id_kurir){
    try{
      const response = await fetch(`${BASE_URL}/kurir/delete.php?id_kurir=${id_kurir}`, {
        method: "DELETE"
      });

      if(!response.ok){
        throw new Error(`Error: ${response.statusText}`);
      }

      // get the result from the response

      const result = await response.json();
      console.log("data kurir berhasil di hapus: ", result);
      
    } catch (error) {
      console.error("Error deleting courier: ", error);
    }

  }

