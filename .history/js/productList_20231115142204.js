// document.addEventListener("DOMContentLoaded", function() {
//     const productList = document.getElementById("product-list");
//     const apiUrl = `https://web-api-5vrh.onrender.com/api/products`;
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

// document.addEventListener("DOMContentLoaded", function() {
//     let params = new URLSearchParams(document.location.search);
//     let category = params.get("category"); 
//     console.log(category);
//     const productList = document.getElementById("product-list");
//     const apiUrl = `https://web-api-5vrh.onrender.com/api/products`;
//     fetch(apiUrl, {
//         mode: 'cors',
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         }
//         })
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => data.product.filter(data.category === category))
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


const renderData = async () => {
	const response = await fetch("https://web-api-5vrh.onrender.com/api/products");
	const data = await response.json();
	const productList = document.getElementById("product-list");
	const productsModalContainer = document.getElementById("product-modal-list");
	let dataRender;
	var x = document.getElementsByName("filterprice");
	let params = new URL(document.location).searchParams;
    let category = params.get("category"); 
    console.log(category);

	if (category === null) {
		dataRender = data;
	} else {
		var filterData = data.filter(
			(item) => item.category === 'Shirt'
		);
		dataRender = filterData;
	}
	dataRender.products.forEach((item) => {
        
		var listItem = document.createElement("div");
        listItem.className = "col-lg-4 col-md-6 col-sm-6";
		listItem.innerHTML = `
        <div class="product__item">
        <div class="product__item__pic">
            <img src= "${item.image}"/>

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

            <h6>${item.name}</h6>

            <a href="#" class="add-cart">+ Add To Cart</a>

            <div class="rating">
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
                <i class="fa fa-star-o"></i>
            </div>

            <h5>$${item.price}</h5>

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
    productList.appendChild(listItem);
	});
};
renderData();

