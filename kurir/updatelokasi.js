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

