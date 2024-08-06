BASE_URL = `http://localhost:8080/scanship-api`;

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
        showNotification('Username atau password salah');
        console.log("Login Gagal: ", data.message);
    }

  } catch (error) {
      showNotification('Username atau password salah');
      console.log("Terdapat error ketika login : ", error);
  }
}

function showNotification(message) {
  var notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'right',
      y: 'top',
    },
    dismissible: true,
    types: [
      {
        type: 'custom',
        background: 'linear-gradient(69.8deg, rgb(25, 49, 108) 2.8%, rgb(1, 179, 201) 97.8%)',
        icon: {
          tagName: 'i',
          className: 'fa-solid fa-exclamation-circle',
        }
      }
    ]
  });

  notyf.open({
    type: 'custom',
    message: message,
  });
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
      // Simpan status logout di localStorage
      localStorage.setItem('logoutStatus', 'success');
      // Redirect ke halaman login
      window.location.href = "../login.html";
    } else {
      console.error('Logout gagal:', data.message);
    }
  } catch (error) {
    console.error('Error selama logout:', error);
  }
}