var listProduct = JSON.parse(localStorage.getItem("listArticle"));

// console.log(listProduct);

// vérifier si panier vide
if (listProduct === null) {
  const panierVide = `<div class="col">
    Votre panier est vide
    </div>    
    `;
  document.querySelector(".container").innerHTML = panierVide;
} else {
  for (let elt of listProduct) {
    // console.log(product);
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

// Calcul du prix total des produits dans le panier
let prixTotal = [];
for (let t = 0; t < listProduct.length; t++) {
  let priceProductToBasket = listProduct[t].prix;

  prixTotal.push(priceProductToBasket);
}
// console.log(prixTotal);

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

// fonction pour valider les entrées du formulaire
function formValidity() {
  var valid = true;
  for (let input of document.querySelectorAll("form input")) {
    valid &= input.checkValidity();
    if (!valid) {
      break;
    }
  }
  if (valid) {
    alert("message envoyé");
  }
}

function sendToBackend() {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

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
      // console.log(value);
      //création des clés orderId et prixTotal dans le localStorage
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

function btnOrder() {
  formValidity();
  sendToBackend();
}
document.querySelector("form .btn").addEventListener("click", btnOrder);
