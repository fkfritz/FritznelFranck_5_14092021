class Article {
  constructor(jsonArticle) {
    jsonArticle && Object.assign(this, jsonArticle);
  }
}

class ArticleManager {
  constructor(listArticle) {
    this.listArticle = listArticle;
  }
}


function getProducts() {
  fetch("http://localhost:3000/api/teddies")
    .then((data) => data.json())
    .then((jsonListArticle) => {
      for (let jsonArticle of jsonListArticle) {
      let article = new Article(jsonArticle);
      
      

      const zoneArticle = ` <div class="col-12 col-md-6 mt-5" data-id=${article._id}>
                              <a class="link" href="./product.html?${article._id}">
                                  <div class="card article">
                                      <div class="card-header">
                                          <h5 class="card-title d-flex justify-content-between">${article.name}</h5>                                                                                
                                      </div>
                                      <div>
                                      <img src="${article.imageUrl}" class="img-fluid" >                                                                            
                                      </div>
                                      <div class="card-body">
                                          <p class="card-text">${article.description}</p>
                                      </div>
                                  </div>
                              </a>
                          </div>`;

      document.querySelector(".produit").innerHTML += zoneArticle;
      }
    });
}

getProducts();
