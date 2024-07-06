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

if (pageURL[1]) {
  let token = "Yourtoken", // paste api key here
    courier = pageURL[0].split(/[=]+/)[1],
    awb = pageURL[1].split(/[=]+/)[1],
    urlApi = `https://api.binderbyte.com/v1/track?api_key=${token}&courier=${courier}&awb=${awb}`;

  console.log(urlApi);
  // Logika URL
  if (awb) {
    inputResi.value = awb.replace(/[^\w]/gi, "").substring(0, 17);
    if (courier) {
      optianExpedisi.value = 1;
      bodyCard.classList.remove("flex");
      history.classList.remove("display-false");
      summary.classList.remove("display-false");
      infoCard.classList.add("display-false");
      getJSON(urlApi);
    }
  }
}

// WARNING: For GET requests, body is set to null by browsers.
function getJSON(url) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      let respon = JSON.parse(this.responseText).data;
      // Section detail
      summary.innerHTML = `<table>
            <tr><td>No Resi</td><td>:</td><td>${respon.summary.awb}</td></tr>
            <tr><td>Courier</td><td>:</td><td>${respon.summary.courier}</td></tr>
            <tr><td>Service</td><td>:</td><td>${respon.summary.service}</td></tr>
            <tr><td>Shipper</td><td>:</td><td>${respon.detail.shipper} <br />${respon.detail.origin}</td></tr>
            <tr><td>Receiver</td><td>:</td><td>${respon.detail.receiver} <br />${respon.detail.destination}</td></tr>
            <tr><td>Status</td><td>:</td><td>${respon.summary.status}</td></tr>
        </table>`;
      // Perjalanan Paket
      respon.history.forEach((e) => {
        let date = e.date.split(/[ ]+/);
        progressHistory.innerHTML += `<div class="progress-section flex">
            <div style="text-align: right"><p>${date[0]}</p><p>${date[1]}</p><p>${respon.summary.courier}</p></div>
            <div class="radio"></div>
            <div style="text-align: left"><p>${e.desc}</p></div>
        </div>`;
      });
    }
  });
  xhr.open("GET", url);
  xhr.send();
}
