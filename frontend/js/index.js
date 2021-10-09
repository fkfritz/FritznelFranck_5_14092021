// fonction pour récupérer les produits et les affichés sur la page d'accueil
function getProducts(url) {
  fetch(url)
    .then((data) => data.json())
    .then((jsonListTeddies) => {
      for (let jsonTeddies of jsonListTeddies) {
        let zoneTeddies = ` <div class="col-12 col-md-6 mt-5" data-id=${jsonTeddies._id}>
                              <a class="link" href="./product.html?${jsonTeddies._id}">
                                  <div class="card article">
                                      <div class="card-header">
                                          <h5 class="card-title d-flex justify-content-between">${jsonTeddies.name}</h5>                                                                                
                                      </div>
                                      <div>
                                      <img src="${jsonTeddies.imageUrl}" class="img-fluid" >                                                                            
                                      </div>
                                      <div class="card-body">
                                          <p class="card-text">${jsonTeddies.description}</p>
                                      </div>
                                  </div>
                              </a>
                          </div>`;

        document.querySelector(".produit").innerHTML += zoneTeddies;
      }
    });
}

getProducts("http://localhost:3000/api/teddies");
