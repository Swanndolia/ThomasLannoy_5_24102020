document.getElementById("main").innerHTML += ` <h2> Merci pour votre commande d'un montant de: ${sessionStorage.getItem(
  "orderTotalPrice"
)}€ </h2><p>Votre identifiant de commande est le n° ${sessionStorage.getItem("orderId")}</p>`;
localStorage.clear();
sessionStorage.clear();