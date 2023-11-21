const filterProducts = (category) => {
    const newUrl = `/Customer/Product/productList.html?category=${category}`;
    history.pushState({ category }, null, newUrl);
    renderData(); // Update the content based on the new category
}


const renderData = async () => {
	const response = await fetch("https://web-api-5vrh.onrender.com/api/products");
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
        
                    <a class="add-cart" onclick="addToCart('${item._id}')">+ Add To Cart</a>
        
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
    document.querySelectorAll('.shop__sidebar__price input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Check the clicked checkbox
    document.getElementById(checkboxId).checked = true;

    
}

// Add to cart
const addToCart = (productId) => {
    console.log(`${productId}`);
    const user = JSON.parse(localStorage.getItem("user"));
    //Make a POST request to your cart API endpoint
    fetch("https://web-api-5vrh.onrender.com/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: productId,
        userId: user._id,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Product added to cart:", data);
        // You can add any additional logic here, such as updating the UI to reflect the added item.
        showSuccessToast();
    })
    .catch((error) => {
        console.error("Error adding product to cart:", error);
    });

};

// Toaster
function showSuccessToast() {
    toast({
        title: "Succces!",
        message: "Added product to cart successfully",
        type: "success",
        duration: 10000
    });
}

function toast({ title = "", message = "", type = "info", duration}) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        error: "fas fa-exclamation-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .5s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                        <div class="toast__icon">
                            <i class="${icon}"></i>
                        </div>
                        <div class="toast__body">
                            <h3 class="toast__title">${title}</h3>
                            <p class="toast__msg">${message}</p>
                        </div>
                        <div class="toast__close">
                            <i class="fas fa-times"></i>
                        </div>
                    `;
      main.appendChild(toast);
    }
  }
