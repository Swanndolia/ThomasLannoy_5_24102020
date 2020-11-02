const docHtml = document.getElementById("main");
fetch("http://localhost:3000/api/cameras")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject(response.status);
    }
  })
  .then((data) => {
    data.forEach((objet) => {
      let priceInEuro = objet.price / 100;
      docHtml.innerHTML += `
        <a href="produit.html?id=${objet._id}">
          <figure class="product-container">
            <img src="${objet.imageUrl}" alt="${objet.name}" class="product-preview">
            <figcaption>
              <h2>${objet.name}</h2>
              <h3>${priceInEuro.toFixed(2)} €</h3>
            </figcaption>
          </figure>
        </a>
      `;
    });
  })
  .catch(function(error) {
    console.log(error);
});