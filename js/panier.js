const mainHtml = document.getElementById("main");
let totalPrice = 0;
function removeProduct(_id) {
  localStorage.removeItem(_id);
  document.location.href = "panier.html";
}
for (let i = 0; i < localStorage.length; i++) {
  let productsOfCart = localStorage.key(i);
  let data = JSON.parse(localStorage.getItem(productsOfCart));
  totalPrice += parseInt(data.priceForAll);
  sessionStorage.setItem("orderTotalPrice", totalPrice);
  mainHtml.innerHTML += `
  <div>   
    <button class="remove" onclick="removeProduct('${data.id}')">Retirer</button> 
    <a href="produit.html?id=${data.id}">     
      <figure>
        <img alt="${data.name}" src="${data.preview}">
        <figcaption>
          <h2>${data.name}</h2>
          <p>Quantité : ${data.quantity}</p>
          <p>Lentilles : ${data.lensType}</p>
          <p>Prix : ${data.priceForAll} €</p>
        </figcaption>
      </figure>
    </a>
  </div>
  `;
}
document.getElementById("order")
if (!localStorage.length) {
  mainHtml.innerHTML = `<h2>Votre panier est vide :'( </h2>`;
  document.getElementById("form").remove();
}
document.getElementById("btn-order").addEventListener("click", function () {
  let formIsInvalid = "";
  let firstName = document.getElementById("first-name").value;
  let lastName = document.getElementById("last-name").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  if (/[0-9]/.test(firstName) || /[§!@#$%^&*().?":{}|<>]/.test(firstName) || !firstName) {
    formIsInvalid += "Votre prénom est invalide \n";
  }
  if (/[0-9]/.test(lastName) || /[§!@#$%^&*().?":{}|<>]/.test(lastName) || !lastName) {
    formIsInvalid += "Votre nom de famille est invalide \n";
  }
  /*
  if (/[§!@#$%^&*().?":{}|<>]/.test(address) || !address) {
    formIsInvalid += "Votre adresse est invalide \n";
  }
  if ("regex pour ville".test(city) || !city) {
    formIsInvalid += "Votre ville est invalide \n";
  }
  */
  if (formIsInvalid) {
    alert("Erreur : \n" + formIsInvalid);
  } else {
    contact = {
      lastName: this.lastName,
      firstName: this.firstName,
      address: this.address,
      city: this.city,
      email: this.email,
    };
    window.location.href = "confirm.html";
    return contact;
  }
});