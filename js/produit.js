const docHtml = document.getElementById("main");
fetch(`http://localhost:3000/api/cameras/${new URLSearchParams(window.location.search).get("id")}`)
  .then((response) => {
    if (response.ok)
      return response.json();
    else
      Promise.reject(response.status);
  })
  .then((data) => {
    document.getElementById("title").innerHTML = `Orinoco - ${data.name}`;
    let lens;
    let priceInEuro = (data.price / 100).toFixed(2);
    function addToLocalStorage() {
      let productQuantity = document.getElementById("quantity");
      let productDetails = {
        id: data._id,
        preview: data.imageUrl,
        name: data.name,
        lensType: document.getElementById("customOptions").value,
        quantity: productQuantity.value,
        priceForAll: (priceInEuro * productQuantity.value).toFixed(2),
        pricePerUnit: priceInEuro,
      };
      localStorage[productDetails.lensType] = JSON.stringify(productDetails);
      window.location.href = "panier.html";
    }
    data.lenses.forEach((lentille) => {
      lens += `<option value="${lentille}">${lentille}</option>`;
    });
    docHtml.innerHTML += `
    <figure>
      <img alt="${data.name}" src="${data.imageUrl}">
      <figcaption>
        <h2>${data.name}</h2>
        <h3>${data.description}</h3>
        <form>
          <label for="Exemplaire(s)">Exemplaire(s):</label>
          <input id="quantity" type="number" min="0" value="1"/>
          <label for="customOptions">Objectifs</label>
          <select id="customOptions">
            ${lens}   
          </select>        
          <h4>Prix total : <span id="priceForAll">${priceInEuro}</span> €</h4>
          <button id="btnAddToCart" type="button">Ajouter au panier</button>
        </form>   
      </figcaption>
    </figure>
    `;
    document.getElementById("quantity").addEventListener("change", (event) => {
      document.getElementById("priceForAll").textContent = `${(priceInEuro * event.target.value).toFixed(2)}`;
    });
    document.getElementById("btnAddToCart").addEventListener("click", function () {
      addToLocalStorage();
    });
  });