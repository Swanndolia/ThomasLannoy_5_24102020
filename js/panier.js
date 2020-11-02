const mainHtml = document.getElementById("main");
let totalPrice = 0;
const products = [];
function removeProduct(lensType) {
  localStorage.removeItem(lensType);
  document.location.href = "panier.html";
}
for (let i = 0; i < localStorage.length; i++) {
  let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
  products.push(data.id);
  totalPrice += parseInt(data.priceForAll);
  sessionStorage.setItem("orderTotalPrice", totalPrice);
  mainHtml.innerHTML += `
  <div>   
    <button class="remove" onclick="removeProduct('${data.lensType}')">Retirer</button> 
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
document.getElementById("order");
if (!localStorage.length) {
  mainHtml.innerHTML = `<h2>Votre panier est vide :'( </h2>`;
  document.getElementById("form").remove();
}
if (document.getElementById("btn-order")) {
  document.getElementById("btn-order").addEventListener("click", function () {
    let formIsInvalid = "";
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let mail = document.getElementById("mail").value;
    if (/[0-9]/.test(firstName) || /[§!@#$%^&*().?":{}|<>]/.test(firstName) || !firstName) {
      formIsInvalid += "Votre prénom est invalide \n";
    }
    if (/[0-9]/.test(lastName) || /[§!@#$%^&*().?":{}|<>]/.test(lastName) || !lastName) {
      formIsInvalid += "Votre nom de famille est invalide \n";
    }
    if (!address) {
      formIsInvalid += "Votre adresse est invalide \n";
    }
    if (/[0-9]/.test(city) || !city) {
      formIsInvalid += "Votre ville est invalide \n";
    }
    if (!/@/.test(mail) || !mail) {
      formIsInvalid += "Votre mail est invalide \n";
    }
    if (formIsInvalid) {
      alert("Erreur : \n" + formIsInvalid);
    } else {
      let contact = {
        lastName: lastName,
        firstName: firstName,
        address: address,
        city: city,
        mail: mail,
      };
      const toSend = { contact, products }
      console.log(toSend);
      fetch("http://localhost:3000/api/cameras/order", { method: "post", body: toSend })
        .then(function (response) {
          if (response.ok) {
            window.location.href("confirm.html");
            return response.json();
          } else {
            Promise.reject(response.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
}
