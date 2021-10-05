//récupération de l'Id dans l'url
let queryString_url_id = window.location.search;

//suppression du "?" dans l'Id avec slice
let articleId = queryString_url_id.slice(1);

// Fonction qui permet de selectionner un élément du DOM
function selectNode(element) {
  return document.querySelector(element);
}

fetch(`http://localhost:3000/api/teddies/${articleId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    selectNode(".listarticle").innerHTML += `<div class="col-12 col-md-6 mt-5">
        <div class="card article data-id=${value._id}">
            <div class="card-header ">
                <h5 class="card-title d-flex justify-content-between">${
                  value.name
                }</h5>
                <span>Prix : ${
                  value.price / 100
                } €</span>                                                                                
            </div>
            <img src="${value.imageUrl}" class="card-img-top">            
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="choixCouleur">Sélectionnez une couleur:</label>
                        <select class="form-control" id="choixCouleur">                        
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" data-id=${
                      value._id
                    } id="btn_submit">
                    Ajouter au panier
                    </button>
                </form>                
                <span>Description du produit: </span>
                <p class="card-text">${value.description}</p>                
            </div>            
        </div>
    </div>`;

    // -----------------------intégration de l'option de personnalisation------------------------
    function customizationOption() {
      //récupération de la liste des couleurs dans la variable colorList
      let colorList = value.colors;
      //on définit chaque couleur comme une option et les affecter au formulaire
      for (let color of colorList) {
        let colorOption = ` <option >${color}</option> `;
        selectNode("#choixCouleur").innerHTML += colorOption;
      }
    }
    customizationOption();

    // -------------------Gestion de l'envoi au panier---------------------------------------

    // fonction qui permet d'ajouter le produit au local storage
    function addToLocalStorage() {
      // Stockage de l'option choisie dans une variable
      let choixForm = selectNode("#choixCouleur").value;

      // Réccupération des valeurs du produit selectionné
      let productSelected = {
        id: value._id,
        nom: value.name,
        prix: value.price / 100,
        couleur: choixForm,
      };

      // vérification de la presense de produit déjà ajouté dans le localStorage
      //   s'il n'y a pas de produits, créer un tableau "listProduct []" et ajouter les produits
      let listProduct = JSON.parse(localStorage.getItem("listArticle"));
      let pushElement = (element) => {
        element.push(productSelected);
        localStorage.setItem("listArticle", JSON.stringify(element));
      };

      if (listProduct) {
        pushElement(listProduct);
      } else {
        listProduct = [];
        pushElement(listProduct);
      }
    }

    function btnAddToBasket(event) {
      addToLocalStorage();
      event.preventDefault();
    }
    // Ecoute du "click" sur le bouton "ajouter au panier" avec prise en compte de l'option qui a été choisie.
    selectNode("#btn_submit").addEventListener("click", btnAddToBasket);
  })
  .catch(function (err) {
    alert("Oops! Une erreur est survenue:" + err);
  });
