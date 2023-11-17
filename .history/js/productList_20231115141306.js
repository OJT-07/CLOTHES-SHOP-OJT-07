// document.addEventListener("DOMContentLoaded", function() {
//     const productList = document.getElementById("product-list");
//     const apiUrl = `http://localhost:4001/api/products`;
//     fetch(apiUrl, {
//             mode: 'cors',
//             headers: {
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             data.products.forEach((product) => {
//                 const productItem = document.createElement("div");
//                 productItem.className = "col-lg-4 col-md-6 col-sm-6";
//                 productItem.innerHTML = `
//                     <div class="product__item">
//                         <div class="product__item__pic">
//                             <img src= "${product.image}"/>

//                             <ul class="product__hover">  
//                                 <li>
//                                     <a href="#"><img src="/img/icon/heart.png" alt=""></a>
//                                 </li>

//                                 <li>
//                                     <a href="#"><img src="/img/icon/compare.png" alt=""> <span>Compare</span></a>
//                                 </li>

//                                 <li>
//                                     <a href="#"><img src="/img/icon/search.png" alt=""></a>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div class="product__item__text">

//                             <h6>${product.name}</h6>

//                             <a href="#" class="add-cart">+ Add To Cart</a>

//                             <div class="rating">
//                                 <i class="fa fa-star-o"></i>
//                                 <i class="fa fa-star-o"></i>
//                                 <i class="fa fa-star-o"></i>
//                                 <i class="fa fa-star-o"></i>
//                                 <i class="fa fa-star-o"></i>
//                             </div>

//                             <h5>$${product.price}</h5>

//                             <div class="product__color__select">
//                                 <label for="pc-4">
//                                     <input type="radio" id="pc-4">
//                                 </label>

//                                 <label class="active black" for="pc-5">
//                                     <input type="radio" id="pc-5">
//                                 </label>

//                                 <label class="grey" for="pc-6">
//                                     <input type="radio" id="pc-6">
//                                 </label>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 productList.appendChild(productItem);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching product data:", error);
//         });
// });
const filterProducts = (category) => {
    window.location.assign(`/Customer/Product/productList.html?category=${category}`);

}

document.addEventListener("DOMContentLoaded", function() {
    let params = new URLSearchParams(document.location.search);
    let category = params.get("category"); 
    console.log(category);
    const productList = document.getElementById("product-list");
    const apiUrl = `http://localhost:4001/api/products`;
    fetch(apiUrl, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => data.product.filter(data.category === category))
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


const renderData = async () => {
	const response = await fetch("http://localhost:4001/api/products");
	const data = await response.json();
	const productList = document.getElementById("product-list");
	const productsModalContainer = document.getElementById("product-modal-list");
	let dataRender;
	var x = document.getElementsByName("filterprice");
	let params = new URL(document.location).searchParams;
	var price1 = params.get("price1");
	var price2 = params.get("price2");

	if (price1 === null && price2 === null) {
		dataRender = data;
	} else {
		var filterData = data.filter(
			(item) =>
				parseInt(item.productPrice, 10) <= parseInt(price2, 10) &&
				parseInt(item.productPrice, 10) >= parseInt(price1, 10)
		);
		console.log(filterData);
		if (parseInt(price1, 10) === 0) {
			x[0].checked = true;
		} else if (parseInt(price1, 10) === 150) {
			x[1].checked = true;
		} else if (parseInt(price1, 10) === 350) {
			x[2].checked = true;
		} else if (parseInt(price1, 10) === 450) {
			x[3].checked = true;
		}
		dataRender = filterData;
	}
	dataRender.forEach((item) => {
		var listItem = document.createElement("div");
		listItem.innerHTML = `
    `;
		productsContainer.appendChild(listItem);
	});
};
renderData();

const navigateDetailItem = (productId) => {
	window.location.href = "product-detail.html" + "?id=" + productId;
};
