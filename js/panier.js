const mainHtml = document.getElementById("main");
function removeProduct(_id) {
  localStorage.removeItem(_id);
  document.location.href = "panier.html";
}
for (let i = 0; i < localStorage.length; i++) {
  let productsOfCart = localStorage.key(i);
  let data = JSON.parse(localStorage.getItem(productsOfCart));
  mainHtml.innerHTML += `
  <div>   
    <button class="remove" onclick="removeProduct('${data.id}')">Retirer</button> 
    <a href="produit.html?id=${data._id}">     
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
if (!localStorage.length) {
  mainHtml.innerHTML = `<h2>Votre panier est vide :'( </h2>`;
  document.getElementById("form").remove();
}
