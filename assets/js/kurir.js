const 
  btnResi = document.querySelector(".track"),
  inputResi = document.querySelector("#resi"),
  optionExpedisi = document.querySelector("#expedisi");

inputResi.addEventListener("input", () => {
  if (inputResi.value.length > 5) {
    btnResi.disabled = false;
  } else {
    btnResi.disabled = true;
  }
});

fetch("assets/js/kurir.json")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((e) => {
        console.table(e);
      optionExpedisi.innerHTML += `<option value="${e.code}">${e.description}</option>`;
    });
  });