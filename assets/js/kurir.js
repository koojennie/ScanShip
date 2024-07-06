const mobileMenu = document.querySelector(".mobile-menu"),
  listMenu = document.querySelector(".list-menu"),
  footer = document.querySelectorAll("#content-footer div"),
  btnResi = document.querySelector(".track"),
  inputResi = document.querySelector("#resi"),
  optianExpedisi = document.querySelector("#expedisi");

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  listMenu.classList.toggle("active");
});

footer.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.toggle("active");
  });
});

inputResi.addEventListener("input", () => {
  if (inputResi.value.length > 5) {
    btnResi.disabled = false;
  } else {
    btnResi.disabled = true;
  }
});

fetch("kurir.json")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((e) => {
      //   console.table(e);
      optianExpedisi.innerHTML += `<option value="${e.code}">${e.description}</option>`;
    });
  });