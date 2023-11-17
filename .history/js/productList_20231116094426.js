const filterProducts = (category) => {
    const newUrl = `/Customer/Product/productList.html?category=${category}`;
    history.pushState({ category }, null, newUrl);
    renderData(); // Update the content based on the new category
}


const renderData = async () => {
	const response = await fetch("http://localhost:4001/api/products");
	const data = await response.json();
	const productList = document.getElementById("product-list");
	let dataRender;
	let params = new URL(document.location).searchParams;
    let category = params.get("category");
    let searchQuery = params.get("search");

    // Set the search input value based on the query parameter
    const searchInput = document.getElementById("search-input");
    searchInput.value = searchQuery || ''; // Use empty string if searchQuery is null

	if (category === null || category === 'All') {
		dataRender = data.products;
	} else {
		var filterData = await data.products.filter(
			(item) => item.category === category
		);
        dataRender = filterData;
	}

    if (searchQuery) {
        dataRender = dataRender.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    productList.innerHTML = ''; // Clear the existing product list before rendering

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
};

// Search by name
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchInput = document.getElementById("search-input").value;
        const newUrl = `/Customer/Product/productList.html?search=${searchInput}`;
        
        // Use the History API to update the URL without reloading the page
        history.pushState({ searchInput }, null, newUrl);
        
        // Update the content based on the new search input
        await renderData();
    });

    // Listen to the popstate event to handle back/forward button clicks
    window.addEventListener("popstate", async (event) => {
        // Check if state exists and has searchInput
        if (event.state && event.state.searchInput) {
            const searchInput = event.state.searchInput;
            document.getElementById("search-input").value = searchInput;
            await renderData(); // Update the content based on the new search input
        }
    });

    // Initial rendering
    renderData();
});

function handleCheckboxClickCategory(checkboxId, category) {
    // Uncheck all checkboxes
    document.querySelectorAll('.category-list input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Check the clicked checkbox
    document.getElementById(checkboxId).checked = true;

    filterProducts(category);
}

function handleCheckboxClickPrice(checkboxId) {
    // Uncheck all checkboxes
    document.querySelectorAll('.category-list input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Check the clicked checkbox
    document.getElementById(checkboxId).checked = true;

    
}
