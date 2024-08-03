BASE_URL = `http://localhost/scanship-api`;

async function login(dataLogin) {
  try {
    const response = await fetch(`${BASE_URL}/login.php`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    });


    // cek apakah permintaan berhasil
    if (!response.ok) {
      throw new Error(`Error woy: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("login berhasil", data);


  } catch (error) {
    console.log("Terdapat error ketika login : ", error);
  }
}
