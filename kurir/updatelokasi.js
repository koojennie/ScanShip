BASE_URL = `http://localhost/scanship-api`;

async function getPaketDetail(noResi) {
  // ambil no resi
  try {
    const response = await fetch(
      `${BASE_URL}/paket/read.php?no_resi=${noResi}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();

    const data = result.data;

    if (!data || data.length === 0) {
      console.log(`No data found for no_resi : ${noResi}`);
      return null;
    }

    return data;

  } catch (error) {
    console.error("terdapat error ketika mengambil data detail", error);
  }
}

async function updateStatusLokasi(statusData) {
  try{
    const response = await fetch(
      `${BASE_URL}/status/createStatusForScan.php`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(statusData)
      }

    );

    if(!response.ok){
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Status Paket berhasil ditambahkan:', data);

      // Tampilkan pesan sukses atau redirect ke halaman lain
      // window.location.href = "paket.html"
  } catch(error){
    console.error('terdapat error ketika updateStatusLokasi', error);
  }
}

