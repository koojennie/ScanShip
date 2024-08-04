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

    if(data.status === 200) {
      // simpan data pengguna ke localstorage
      localStorage.setItem("userData", JSON.stringify(data.data));

      // redirect atau tampilkan halaman berdasarkan role
      if(data.data.role == 'admin' ){
        window.location.href = "admin/home.html";
      } else if (data.data.role == 'kurir') {
        window.location.href = "kurir/scanqr.html";
      }
    } else {
      console.log("Login Gagal: ", data.message);
    }

  } catch (error) {
    console.log("Terdapat error ketika login : ", error);
  }
}

async function logout() {
  try {
    // Kirim permintaan ke backend untuk menghapus sesi
    const response = await fetch(`${BASE_URL}/logout.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // credentials: 'include' // Sertakan cookies jika diperlukan
    });

    if (!response.ok) {
      throw new Error('Logout gagal');
    }

    const data = await response.json();
    if (data.status === 200) {
      // Hapus data pengguna dari local storage
      localStorage.removeItem("userData");
      // Redirect ke halaman login
      window.location.href = "../login.html";
    } else {
      console.error('Logout gagal:', data.message);
    }
  } catch (error) {
    console.error('Error selama logout:', error);
  }
}

