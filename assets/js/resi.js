document.addEventListener("DOMContentLoaded", function () {
  const bodyCard = document.querySelector(".body-card"),
    summary = document.querySelector("#summary"),
    infoCard = document.querySelector(".info-card"),
    history = document.querySelector("#container-fill"),
    progressHistory = document.querySelector(".progress-history");

  let link = window.location.href,
    pageURL = link
      .substring(link.indexOf("?") + 1)
      .split(/[&]+/)
      .sort();

  if (pageURL[0]) {
      let no_resi = pageURL[0].split(/[=]+/)[1],
      urlApi = `http://localhost/scanship-api/paket/read.php?no_resi=${no_resi}`;

    console.log(urlApi);
    // Logika URL
    if (no_resi) {
      document.querySelector("#resi").value = no_resi.replace(/[^\w]/gi, "").substring(0, 17);
      bodyCard.classList.remove("flex");
      history.classList.remove("display-false");
      summary.classList.remove("display-false");
      infoCard.classList.add("display-false");
      getJSON(urlApi);
    }
  }

  // WARNING: For GET requests, body is set to null by browsers.
  function getJSON(url) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        let respon = JSON.parse(this.responseText).data;
        // Section detail
        summary.innerHTML = `<table>
              <tr><td>No Resi</td><td>:</td><td>${respon.package.no_resi}</td></tr>
              <tr><td>Tanggal Pengiriman</td><td>:</td><td>${respon.package.tanggal_pengiriman}</td></tr>
              <tr><td>Nama Pengirim</td><td>:</td><td>${respon.package.nama_pengirim}</td></tr>
              <tr><td>Asal Pengirim</td><td>:</td><td>${respon.package.asal_pengirim}</td></tr>
              <tr><td>Nama Penerima</td><td>:</td><td>${respon.package.nama_penerima}</td></tr>
              <tr><td>No Telp Penerima</td><td>:</td><td>${respon.package.notelp_penerima}</td></tr>
              <tr><td>Alamat Tujuan</td><td>:</td><td>${respon.package.alamat_tujuan}</td></tr>
              <tr><td>Tanggal Penerimaan</td><td>:</td><td>${respon.package.tanggal_penerimaan}</td></tr>
          </table>`;
        // Perjalanan Paket
        respon.status.forEach((e) => {
          let status_tanggal = e.status_tanggal.split(/[ ]+/);
          progressHistory.innerHTML += `<div class="progress-section flex">
              <div style="text-align: right"><p>${status_tanggal[0]}</p><p>${status_tanggal[1]}</p><p>ScanShip</p></div>
              <div class="radio"></div>
              <div style="text-align: left"><p>${e.status_lokasi}</p></div>
          </div>`;
        });
      }
    });
    xhr.open("GET", url);
    xhr.send();
  }

});
