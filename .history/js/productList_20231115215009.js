const filterProducts = (category) => {
    window.location.assign(`/Customer/Product/productList.html?category=${category}`);
}

const searchProducts = (name) => {
    window.location.assign(`/Customer/Product/productList.html?name=${name}`);
}

const renderData = async () => {
	const response = await fetch("https://web-api-5vrh.onrender.com/api/products");
	const data = await response.json();
	const productList = document.getElementById("product-list");
	let dataRender;
	let params = new URL(document.location).searchParams;
    let category = params.get("category");

	if (category === null || category === 'All') {
		dataRender = data.products;
	} else {
		var filterData = await data.products.filter(
			(item) => item.category === category
		);
        dataRender = filterData;
	}

    if (dataRender.length === 0) {
        var listItem = document.createElement("div");
        listItem.className = "col-lg-4 col-md-6 col-sm-6";
        listItem.innerHTML = `<p>There is no corresponding product</p>`;
        productList.appendChild(listItem);
    } else {
        dataRender.forEach((item) => {
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
    }

    // Add search functionality
    const searchProducts = async () => {
        const response = await fetch("https://web-api-5vrh.onrender.com/api/products");
        const data = await response.json();
        const productList = document.getElementById("product-list");
        let dataRender;
        let params = new URL(document.location).searchParams;
        let name = params.get("name");

        if (name === null) {
            dataRender = data.products;
        } else {
            var filterData = await data.products.filter(
                (item) => item.category === category
            );
            dataRender = filterData;
        }

        const searchInput = document.getElementById("searchInput");
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = dataRender.filter(
            (item) => item.name.toLowerCase().includes(searchTerm)
        );

        if (filteredData.length === 0) {
            // Display a message for no matching products
            var listItem = document.createElement("div");
            listItem.className = "col-lg-4 col-md-6 col-sm-6";
            listItem.innerHTML = `<p>No matching products found</p>`;
            productList.innerHTML = ''; // Clear existing content
            productList.appendChild(listItem);
        } else {
            // Render the filtered products
            productList.innerHTML = ''; // Clear existing content
            filteredData.forEach((item) => {
                // Create and append product items as before
                // ...
            });
        }
    };
};

renderData();

