// Stockage des données du localStorage dans une variable
var listProduct = JSON.parse(localStorage.getItem("listArticle"));

// vérifier si le localStorage est vide
if (listProduct === null) {
  const panierVide = `<div class="col">
    Votre panier est vide
    </div>    
    `;
  document.querySelector(".container").innerHTML = panierVide;
} else {
  // si localStorage n'est pas vide, afficher la liste des produits du panier
  for (let elt of listProduct) {
    const addToBasket = `<tr>          
        <td>${elt.nom}</td>
        <td>${elt.couleur}</td>
        <td>${elt.prix} €</td>
        <!--<td><button type="button" class="btn btn-outline-warning btn-delete">Supprimer</button></td>-->       
     </tr>       
    `;
    document.querySelector(".basket_resume").innerHTML += addToBasket;
  }
}
// --------------------------------------------------------------
// -------------------------Prix Total----------------------------
// ---------------------------------------------------------------
// Calcul du prix total des produits dans le panier
function sumOfPrices() {
  let prixTotal = [];
  for (let t = 0; t < listProduct.length; t++) {
    let priceProductToBasket = listProduct[t].prix;

    prixTotal.push(priceProductToBasket);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixTotalCalcul = prixTotal.reduce(reducer);

  const totalPrice = `
                      <tr> 
                        <td>Prix Total:</td>
                        <td></td>
                        <td>${prixTotalCalcul} €</td>
                      </tr>
                    `;
  document.querySelector(".basket_resume").innerHTML += totalPrice;
}
sumOfPrices();

// ----------------------------- END -------------------------------------

// -------------------------------------------------------------------------
// ---------Validation Formulaire----Envoi Backend-------Valider Commande-----

// fonction pour valider les entrées du formulaire
function formValidity() {
  var valid = true;
  for (let input of document.querySelectorAll(".form-control")) {
    valid &= input.checkValidity();
    if (!valid) {
      break;
    }
  }
  if (valid) {
    alert("message envoyé");
  }
}

// fonction pour envoyer l'objet contact et le tableau product au backend
function sendToBackend() {
  // Objet contact
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  // création du tableau products
  let products = [];
  for (let p of listProduct) {
    products.push(p.id);
  }

  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      /*Création des clés orderId et prixTotal dans le localStorage, 
      ces données seront affichées sur la page de confirmation*/
      let orderResume = () => {
        localStorage.setItem("orderId", JSON.stringify(value.orderId));
        localStorage.setItem("prixTotal", JSON.stringify(prixTotalCalcul));
      };
      orderResume();
      // rédirection vers la page de confirmation de commande
      window.location = "./confirmation.html";
    })
    .catch(function (err) {
      alert("Oops! Une erreur est survenue:" + err);
    });
}

// fonction qui permet de valider la commande
function btnOrder() {
  formValidity();
  sendToBackend();
}
document.querySelector("form").addEventListener("submit", btnOrder);

// ---------------------------- END -------------------------------------
