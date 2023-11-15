document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("product-list");

    const apiUrl = "http://localhost:4001/api/products";
    fetch(apiUrl, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.products.forEach((product) => {
                const productItem = document.createElement("div");
                productItem.className = "col-lg-4 col-md-6 col-sm-6";
                productItem.innerHTML = `
                    <div class="product__item">
                       <div class="product__item__pic">
                            <img src= "${product.image}"/>

                            <ul class="product__hover">  
                                <li>
                                    <a href="#"><img src="/img/icon/heart.png" alt=""></a>
                                </li>

                                <li>
                                    <a href="#"><img src="/img/icon/compare.png" alt=""> <span>Compare</span></a>
                                </li>

                                <li>
                                    <a href="#"><img src="/img/icon/search.png" alt=""></a>
                                </li>
                            </ul>
                        </div>

                        <div class="product__item__text">

                            <h6>${product.name}</h6>

                            <a href="#" class="add-cart">+ Add To Cart</a>

                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>

                            <h5>$${product.price}</h5>

                            <div class="product__color__select">
                                <label for="pc-4">
                                    <input type="radio" id="pc-4">
                                </label>

                                <label class="active black" for="pc-5">
                                    <input type="radio" id="pc-5">
                                </label>

                                <label class="grey" for="pc-6">
                                    <input type="radio" id="pc-6">
                                </label>
                            </div>
                        </div>
                    </div>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:4001/api/products";
    const productList = document.getElementById("product-list");
    const categoryList = document.getElementById("collapseOne");

    let allProducts; // Variable to store all products

    fetch(apiUrl, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            allProducts = data.products;
            renderCategories(data.products.map(product => product.category));
            renderProducts(allProducts);
        })
        .catch((error) => {
            console.error("Error fetching product data:", error);
        });
        
        function filterProducts(selectedCategory) {
            const filteredProducts = allProducts.filter(product => product.category === selectedCategory);
            renderProducts(filteredProducts);
        }
        
    function renderCategories(categories) {
        categories.forEach((category) => {
            const categoryItem = document.createElement("div");
            categoryItem.className = "collapse show";
            categoryItem.innerHTML = `
                <div class="card-body-category">
                <div class="shop__sidebar__categories">
                <ul class="nice-scroll">
                <li onclick="filterProducts('${category}')">${category}</li>
                </ul>
                </div>
                </div>
                `;
                categoryList.appendChild(categoryItem);
            });
        }
        
        function renderProducts(products) {
        productList.innerHTML = '';

        products.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.className = "col-lg-4 col-md-6 col-sm-6";
            productItem.innerHTML = `
                    <div class="product__item">
                       <div class="product__item__pic">
                            <img src= "${product.image}"/>

                            <ul class="product__hover">  
                                <li>
                                    <a href="#"><img src="/img/icon/heart.png" alt=""></a>
                                </li>

                                <li>
                                    <a href="#"><img src="/img/icon/compare.png" alt=""> <span>Compare</span></a>
                                </li>

                                <li>
                                    <a href="#"><img src="/img/icon/search.png" alt=""></a>
                                </li>
                            </ul>
                        </div>

                        <div class="product__item__text">

                            <h6>${product.name}</h6>

                            <a href="#" class="add-cart">+ Add To Cart</a>

                            <div class="rating">
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>

                            <h5>$${product.price}</h5>

                            <div class="product__color__select">
                                <label for="pc-4">
                                    <input type="radio" id="pc-4">
                                </label>

                                <label class="active black" for="pc-5">
                                    <input type="radio" id="pc-5">
                                </label>

                                <label class="grey" for="pc-6">
                                    <input type="radio" id="pc-6">
                                </label>
                            </div>
                        </div>
                    </div>
            `;
            productList.appendChild(productItem);
        });
    }

});
