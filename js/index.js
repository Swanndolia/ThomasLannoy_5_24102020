const docHtml = document.getElementById("main");
fetch("http://localhost:3000/api/cameras")
  .then((response) => {
    /* Vérification connection serveur */
    if (response.ok)
      return response.json();
    else
      Promise.reject(response.status);
  })
  /* Si connection ok pour chaque produit l'afficher */
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
  /* Sinon log les erreurs dans la console */
  .catch(function(error) {
    console.log(error);
});