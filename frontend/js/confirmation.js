// Réccupération de l'id de commande dans le localStorage
const commandeId = JSON.parse(localStorage.getItem("orderId"));

// Réccupération du prix dans le localStorage
const prixTotalCommande = JSON.parse(localStorage.getItem("prixTotal"));

//Modification du DOM
const elementToDom_1 = document.querySelector(".confirmation");

const orderConfirmationBloc = `
                                <div class="card-header d-flex justify-content-center">
                                    <h1>Confirmation de commande</h1>
                                </div>
                                <div class="card-body">
                                    <h2 class="card-title text-success">
                                    Merci d'avoir commandé sur Orinoco
                                    </h2>
                                    <p class="card-text">Votre commande porte l'identifiant : <strong>${commandeId}</strong></p>
                                    <p class="card-text">Le montant total est de : <strong>${prixTotalCommande}€ .</strong></p>
                                </div>
                                `;

elementToDom_1.innerHTML += orderConfirmationBloc;

// Suppression des clés dans le localStorage

function deleteKeys(key) {
  localStorage.removeItem(key);
}

deleteKeys("orderId");
deleteKeys("prixTotal");
deleteKeys("listArticle");
